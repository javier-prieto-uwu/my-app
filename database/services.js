// Firebase Services - CRUD operations
import { 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp
} from 'firebase/firestore';
import { 
  db, 
  getMaterialesRef, 
  getProyectosRef, 
  getUsuariosRef, 
  getCalculosRef,
  getCategoriasRef 
} from './collections';

// ===== MATERIALES SERVICES =====
export const materialesService = {
  // Crear nuevo material
  async create(material) {
    try {
      const docRef = await addDoc(getMaterialesRef(), {
        ...material,
        fechaIngreso: Timestamp.now(),
        activo: true
      });
      return { id: docRef.id, ...material };
    } catch (error) {
      console.error('Error creating material:', error);
      throw error;
    }
  },

  // Obtener todos los materiales de un usuario
  async getByUser(usuarioId) {
    try {
      const q = query(
        getMaterialesRef(),
        where('usuarioId', '==', usuarioId),
        where('activo', '==', true),
        orderBy('fechaIngreso', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting materials:', error);
      throw error;
    }
  },

  // Obtener material por ID
  async getById(id) {
    try {
      const docRef = doc(db, 'materiales', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting material:', error);
      throw error;
    }
  },

  // Actualizar material
  async update(id, updates) {
    try {
      const docRef = doc(db, 'materiales', id);
      await updateDoc(docRef, {
        ...updates,
        fechaActualizacion: Timestamp.now()
      });
      return { id, ...updates };
    } catch (error) {
      console.error('Error updating material:', error);
      throw error;
    }
  },

  // Eliminar material (soft delete)
  async delete(id) {
    try {
      const docRef = doc(db, 'materiales', id);
      await updateDoc(docRef, {
        activo: false,
        fechaEliminacion: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Error deleting material:', error);
      throw error;
    }
  },

  // Obtener materiales por categoría
  async getByCategory(categoria, usuarioId) {
    try {
      const q = query(
        getMaterialesRef(),
        where('categoria', '==', categoria),
        where('usuarioId', '==', usuarioId),
        where('activo', '==', true)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting materials by category:', error);
      throw error;
    }
  }
};

// ===== PROYECTOS SERVICES =====
export const proyectosService = {
  // Crear nuevo proyecto
  async create(proyecto) {
    try {
      const docRef = await addDoc(getProyectosRef(), {
        ...proyecto,
        fechaCreacion: Timestamp.now(),
        estado: 'pendiente'
      });
      return { id: docRef.id, ...proyecto };
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Obtener proyectos de un usuario
  async getByUser(usuarioId) {
    try {
      const q = query(
        getProyectosRef(),
        where('usuarioId', '==', usuarioId),
        orderBy('fechaCreacion', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  },

  // Actualizar estado del proyecto
  async updateStatus(id, estado) {
    try {
      const docRef = doc(db, 'proyectos', id);
      await updateDoc(docRef, {
        estado,
        fechaActualizacion: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Error updating project status:', error);
      throw error;
    }
  }
};

// ===== USUARIOS SERVICES =====
export const usuariosService = {
  // Crear o actualizar usuario
  async createOrUpdate(userData) {
    try {
      const docRef = doc(db, 'usuarios', userData.id);
      await setDoc(docRef, {
        ...userData,
        fechaActualizacion: Timestamp.now()
      }, { merge: true });
      return userData;
    } catch (error) {
      console.error('Error creating/updating user:', error);
      throw error;
    }
  },

  // Obtener usuario por ID
  async getById(id) {
    try {
      const docRef = doc(db, 'usuarios', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }
};

// ===== CALCULOS SERVICES =====
export const calculosService = {
  // Guardar cálculo
  async save(calculo) {
    try {
      const docRef = await addDoc(getCalculosRef(), {
        ...calculo,
        fecha: Timestamp.now()
      });
      return { id: docRef.id, ...calculo };
    } catch (error) {
      console.error('Error saving calculation:', error);
      throw error;
    }
  },

  // Obtener cálculos de un usuario
  async getByUser(usuarioId) {
    try {
      const q = query(
        getCalculosRef(),
        where('usuario', '==', usuarioId),
        orderBy('fecha', 'desc'),
        limit(50)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting calculations:', error);
      throw error;
    }
  }
};

// ===== ESTADISTICAS SERVICES =====
export const estadisticasService = {
  // Obtener estadísticas generales
  async getEstadisticasGenerales(usuarioId) {
    try {
      // Obtener materiales
      const materiales = await materialesService.getByUser(usuarioId);
      
      // Obtener proyectos
      const proyectos = await proyectosService.getByUser(usuarioId);
      
      // Calcular estadísticas
      const stats = {
        materialesDisponibles: materiales.length,
        filamentoConsumido: materiales
          .filter(m => m.categoria === 'Filamento')
          .reduce((sum, m) => sum + (m.consumido || 0), 0),
        resinaConsumida: materiales
          .filter(m => m.categoria === 'Resina')
          .reduce((sum, m) => sum + (m.consumido || 0), 0),
        proyectosCompletados: proyectos.filter(p => p.estado === 'completado').length,
        tiempoImpresion: proyectos
          .filter(p => p.estado === 'completado')
          .reduce((sum, p) => sum + (p.tiempoImpresion || 0), 0),
        costoTotalMateriales: materiales.reduce((sum, m) => sum + (m.precio * m.cantidad), 0),
        ganancias: proyectos
          .filter(p => p.estado === 'completado')
          .reduce((sum, p) => sum + (p.ganancia || 0), 0),
        pedidosPendientes: proyectos.filter(p => p.estado === 'pendiente').length
      };

      // Calcular eficiencia (proyectos completados vs total)
      const totalProyectos = proyectos.length;
      stats.eficiencia = totalProyectos > 0 ? Math.round((stats.proyectosCompletados / totalProyectos) * 100) : 0;
      
      // Calcular tiempo promedio por proyecto
      stats.tiempoPromedioProyecto = stats.proyectosCompletados > 0 
        ? Math.round((stats.tiempoImpresion / stats.proyectosCompletados) * 10) / 10 
        : 0;

      return stats;
    } catch (error) {
      console.error('Error getting statistics:', error);
      throw error;
    }
  }
}; 