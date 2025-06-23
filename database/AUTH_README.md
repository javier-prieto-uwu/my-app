# Configuración de Autenticación Firebase

Este documento explica cómo configurar la autenticación con Firebase en tu aplicación 3D Material.

## 🔧 Configuración Inicial

### 1. Crear Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita Authentication en el panel lateral

### 2. Configurar Métodos de Autenticación

#### Email/Contraseña
1. En Firebase Console → Authentication → Sign-in method
2. Habilita "Email/Password"
3. Opcional: Habilita "Email link (passwordless sign-in)"

#### Google Sign-In
1. En Firebase Console → Authentication → Sign-in method
2. Habilita "Google"
3. Configura el OAuth consent screen en Google Cloud Console
4. Agrega los dominios autorizados

### 3. Configurar Firestore

1. En Firebase Console → Firestore Database
2. Crea una base de datos en modo de prueba
3. Configura las reglas de seguridad:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios pueden leer/escribir solo sus propios datos
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Materiales del usuario
    match /usuarios/{userId}/materiales/{materialId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Proyectos del usuario
    match /usuarios/{userId}/proyectos/{proyectoId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 4. Configurar el Archivo de Configuración

Actualiza `database/config.js` con tus credenciales:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## 📱 Configuración para Móvil

### Android
1. Descarga `google-services.json` desde Firebase Console
2. Colócalo en `android/app/`
3. Configura el build.gradle según la documentación de Firebase

### iOS
1. Descarga `GoogleService-Info.plist` desde Firebase Console
2. Agrégalo a tu proyecto iOS
3. Configura el Info.plist según la documentación de Firebase

## 🚀 Uso de la Autenticación

### Registro de Usuario
```javascript
import { useAuth } from '../contexts/AuthContext';

const { registerWithEmail } = useAuth();

const handleRegister = async () => {
  try {
    await registerWithEmail(email, password, {
      nombre: 'Juan Pérez',
      nivel: 'Principiante'
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

### Inicio de Sesión
```javascript
const { loginWithEmail, loginWithGoogle } = useAuth();

// Con email/contraseña
await loginWithEmail(email, password);

// Con Google
await loginWithGoogle();
```

### Cerrar Sesión
```javascript
const { logout } = useAuth();
await logout();
```

### Obtener Datos del Usuario
```javascript
const { user, userData } = useAuth();

console.log('Usuario Auth:', user);
console.log('Datos del usuario:', userData);
```

## 🔒 Seguridad

### Reglas de Firestore Recomendadas
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Función helper para verificar autenticación
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Función helper para verificar propiedad
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    // Usuarios
    match /usuarios/{userId} {
      allow read, write: if isAuthenticated() && isOwner(userId);
    }
    
    // Materiales (subcolección de usuarios)
    match /usuarios/{userId}/materiales/{materialId} {
      allow read, write: if isAuthenticated() && isOwner(userId);
    }
    
    // Proyectos (subcolección de usuarios)
    match /usuarios/{userId}/proyectos/{proyectoId} {
      allow read, write: if isAuthenticated() && isOwner(userId);
    }
  }
}
```

## 🐛 Solución de Problemas

### Error: "Firebase App named '[DEFAULT]' already exists"
- Asegúrate de que solo inicializas Firebase una vez
- Verifica que no hay múltiples imports de config.js

### Error: "auth/popup-closed-by-user"
- El usuario cerró la ventana de Google Sign-In
- Maneja este error graciosamente en tu UI

### Error: "auth/network-request-failed"
- Verifica la conexión a internet
- Asegúrate de que Firebase esté configurado correctamente

### Error: "auth/invalid-email"
- Valida el formato del email antes de enviarlo
- Usa expresiones regulares para validación

## 📋 Checklist de Configuración

- [ ] Proyecto Firebase creado
- [ ] Authentication habilitado
- [ ] Email/Password habilitado
- [ ] Google Sign-In habilitado
- [ ] Firestore Database creado
- [ ] Reglas de seguridad configuradas
- [ ] Archivo de configuración actualizado
- [ ] Dependencias instaladas
- [ ] Configuración móvil completada
- [ ] Pruebas de autenticación realizadas

## 🔄 Migración de Datos Simulados

Para migrar de datos simulados a datos reales:

1. **Materiales**: Usar `materialService` con userId
2. **Proyectos**: Usar `proyectoService` con userId
3. **Estadísticas**: Calcular desde datos reales en Firestore
4. **Usuario**: Usar datos del contexto de autenticación

### Ejemplo de Migración
```javascript
// Antes (datos simulados)
const materiales = datosSimulados;

// Después (datos reales)
const { user } = useAuth();
const { getMateriales } = useMateriales();
const materiales = await getMateriales(user.uid);
```

## 📞 Soporte

Si tienes problemas con la configuración:

1. Revisa la [documentación oficial de Firebase](https://firebase.google.com/docs)
2. Verifica que todas las dependencias estén instaladas
3. Asegúrate de que las reglas de Firestore estén correctas
4. Revisa los logs de Firebase Console para errores 