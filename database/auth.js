// Firebase Authentication Services
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// ===== AUTHENTICATION SERVICES =====
export const authService = {
  // Registrar usuario con email y contraseña
  async registerWithEmail(email, password, userData) {
    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Actualizar perfil del usuario
      await updateProfile(user, {
        displayName: userData.nombre,
        photoURL: userData.foto || null
      });

      // Crear documento de usuario en Firestore
      const userDoc = {
        id: user.uid,
        nombre: userData.nombre,
        email: user.email,
        foto: userData.foto || null,
        nivel: userData.nivel || 'Principiante',
        fechaRegistro: new Date().toISOString(),
        configuracion: {
          moneda: 'MXN',
          zonaHoraria: 'America/Mexico_City',
          notificaciones: true
        }
      };

      await setDoc(doc(db, 'usuarios', user.uid), userDoc);

      return {
        user: user,
        userData: userDoc
      };
    } catch (error) {
      console.error('Error registering user:', error);
      throw this.handleAuthError(error);
    }
  },

  // Iniciar sesión con email y contraseña
  async loginWithEmail(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtener datos adicionales del usuario desde Firestore
      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      return {
        user: user,
        userData: userData
      };
    } catch (error) {
      console.error('Error logging in:', error);
      throw this.handleAuthError(error);
    }
  },

  // Iniciar sesión con Google
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Verificar si el usuario ya existe en Firestore
      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      
      if (!userDoc.exists()) {
        // Crear nuevo usuario en Firestore
        const newUserDoc = {
          id: user.uid,
          nombre: user.displayName || 'Usuario',
          email: user.email,
          foto: user.photoURL,
          nivel: 'Principiante',
          fechaRegistro: new Date().toISOString(),
          configuracion: {
            moneda: 'MXN',
            zonaHoraria: 'America/Mexico_City',
            notificaciones: true
          }
        };

        await setDoc(doc(db, 'usuarios', user.uid), newUserDoc);
        return {
          user: user,
          userData: newUserDoc
        };
      } else {
        // Usuario existente
        return {
          user: user,
          userData: userDoc.data()
        };
      }
    } catch (error) {
      console.error('Error logging in with Google:', error);
      throw this.handleAuthError(error);
    }
  },

  // Cerrar sesión
  async logout() {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  // Restablecer contraseña
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw this.handleAuthError(error);
    }
  },

  // Obtener usuario actual
  getCurrentUser() {
    return auth.currentUser;
  },

  // Escuchar cambios en el estado de autenticación
  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Obtener datos adicionales del usuario
        try {
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          const userData = userDoc.exists() ? userDoc.data() : null;
          callback({ user, userData });
        } catch (error) {
          console.error('Error getting user data:', error);
          callback({ user, userData: null });
        }
      } else {
        callback(null);
      }
    });
  },

  // Actualizar perfil del usuario
  async updateUserProfile(userId, updates) {
    try {
      const userRef = doc(db, 'usuarios', userId);
      await setDoc(userRef, {
        ...updates,
        fechaActualizacion: new Date().toISOString()
      }, { merge: true });

      // Si hay cambios en el perfil de Auth, actualizarlos también
      if (auth.currentUser && (updates.nombre || updates.foto)) {
        await updateProfile(auth.currentUser, {
          displayName: updates.nombre || auth.currentUser.displayName,
          photoURL: updates.foto || auth.currentUser.photoURL
        });
      }

      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Manejar errores de autenticación
  handleAuthError(error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return {
          code: 'EMAIL_EXISTS',
          message: 'El correo electrónico ya está registrado'
        };
      case 'auth/invalid-email':
        return {
          code: 'INVALID_EMAIL',
          message: 'El correo electrónico no es válido'
        };
      case 'auth/weak-password':
        return {
          code: 'WEAK_PASSWORD',
          message: 'La contraseña debe tener al menos 6 caracteres'
        };
      case 'auth/user-not-found':
        return {
          code: 'USER_NOT_FOUND',
          message: 'No existe una cuenta con este correo electrónico'
        };
      case 'auth/wrong-password':
        return {
          code: 'WRONG_PASSWORD',
          message: 'Contraseña incorrecta'
        };
      case 'auth/too-many-requests':
        return {
          code: 'TOO_MANY_REQUESTS',
          message: 'Demasiados intentos fallidos. Intenta más tarde'
        };
      case 'auth/popup-closed-by-user':
        return {
          code: 'POPUP_CLOSED',
          message: 'Inicio de sesión cancelado'
        };
      default:
        return {
          code: 'UNKNOWN_ERROR',
          message: 'Error desconocido. Intenta de nuevo'
        };
    }
  }
};

// ===== HOOK PERSONALIZADO PARA AUTH =====
export const useAuth = () => {
  const [user, setUser] = React.useState(null);
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((authResult) => {
      if (authResult) {
        setUser(authResult.user);
        setUserData(authResult.userData);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    user,
    userData,
    loading,
    isAuthenticated: !!user,
    loginWithEmail: authService.loginWithEmail,
    loginWithGoogle: authService.loginWithGoogle,
    registerWithEmail: authService.registerWithEmail,
    logout: authService.logout,
    resetPassword: authService.resetPassword,
    updateProfile: authService.updateUserProfile
  };
}; 