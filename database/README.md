# Database Configuration

Esta carpeta contiene toda la configuración y servicios de Firebase para la aplicación de impresión 3D.

## 📁 Estructura de archivos

```
database/
├── config.js          # Configuración principal de Firebase
├── collections.js     # Definición de colecciones y estructuras
├── services.js        # Servicios CRUD para todas las entidades
└── README.md          # Este archivo
```

## 🚀 Configuración inicial

### 1. Instalar dependencias
```bash
npm install firebase
npm install @react-native-async-storage/async-storage
```

### 2. Configurar Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Firestore Database
4. Habilita Authentication
5. Copia la configuración de tu proyecto

### 3. Actualizar configuración
En `config.js`, reemplaza la configuración de ejemplo con tu configuración real:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};
```

## 📊 Colecciones de Firestore

### Materiales
- **Categorías**: Filamento, Resina, Pintura, Aros de llavero
- **Campos**: nombre, tipo, subtipo, color, precio, peso, cantidad, consumido

### Proyectos
- **Estados**: pendiente, en_proceso, completado, cancelado
- **Campos**: nombre, materialId, tiempoImpresion, costo, ganancia

### Usuarios
- **Niveles**: Principiante, Intermedio, Experto
- **Campos**: nombre, email, foto, nivel, configuracion

### Cálculos
- **Campos**: filamento, manoObra, avanzados, total, fecha

## 🔧 Servicios disponibles

### Materiales
```javascript
import { materialesService } from '../database/services';

// Crear material
await materialesService.create(materialData);

// Obtener materiales del usuario
const materiales = await materialesService.getByUser(userId);

// Actualizar material
await materialesService.update(id, updates);

// Eliminar material
await materialesService.delete(id);
```

### Proyectos
```javascript
import { proyectosService } from '../database/services';

// Crear proyecto
await proyectosService.create(projectData);

// Obtener proyectos del usuario
const proyectos = await proyectosService.getByUser(userId);

// Actualizar estado
await proyectosService.updateStatus(id, 'completado');
```

### Estadísticas
```javascript
import { estadisticasService } from '../database/services';

// Obtener estadísticas generales
const stats = await estadisticasService.getEstadisticasGenerales(userId);
```

## 🔒 Reglas de seguridad recomendadas

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios solo pueden acceder a sus propios datos
    match /materiales/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.usuarioId;
    }
    
    match /proyectos/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.usuarioId;
    }
    
    match /calculos/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.usuario;
    }
    
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 📱 Uso en componentes

```javascript
import React, { useState, useEffect } from 'react';
import { materialesService } from '../database/services';

export default function Inventario() {
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarMateriales();
  }, []);

  const cargarMateriales = async () => {
    try {
      setLoading(true);
      const data = await materialesService.getByUser('userId');
      setMateriales(data);
    } catch (error) {
      console.error('Error cargando materiales:', error);
    } finally {
      setLoading(false);
    }
  };

  // ... resto del componente
}
```

## ⚠️ Notas importantes

1. **Autenticación**: Asegúrate de que el usuario esté autenticado antes de usar los servicios
2. **Manejo de errores**: Todos los servicios incluyen try-catch para manejo de errores
3. **Timestamps**: Los documentos incluyen timestamps automáticos
4. **Soft delete**: Los materiales se eliminan suavemente (marcados como inactivos)
5. **Consultas optimizadas**: Las consultas incluyen índices y filtros apropiados

## 🔄 Migración de datos simulados

Cuando estés listo para usar datos reales:

1. Reemplaza las llamadas a datos simulados por llamadas a los servicios
2. Agrega manejo de estados de carga
3. Implementa manejo de errores en la UI
4. Configura las reglas de seguridad en Firebase

```javascript
// Antes (datos simulados)
const materiales = materialesEjemplo;

// Después (datos reales)
const [materiales, setMateriales] = useState([]);
useEffect(() => {
  materialesService.getByUser(userId).then(setMateriales);
}, [userId]);
``` 