import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../database/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
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

  const loginWithEmail = async (email, password) => {
    try {
      const result = await authService.loginWithEmail(email, password);
      setUser(result.user);
      setUserData(result.userData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await authService.loginWithGoogle();
      setUser(result.user);
      setUserData(result.userData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const registerWithEmail = async (email, password, userData) => {
    try {
      const result = await authService.registerWithEmail(email, password, userData);
      setUser(result.user);
      setUserData(result.userData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setUserData(null);
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error('No hay usuario autenticado');
      
      await authService.updateUserProfile(user.uid, updates);
      
      // Actualizar el estado local
      setUserData(prev => ({
        ...prev,
        ...updates
      }));
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    userData,
    loading,
    isAuthenticated: !!user,
    loginWithEmail,
    loginWithGoogle,
    registerWithEmail,
    logout,
    updateProfile,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 