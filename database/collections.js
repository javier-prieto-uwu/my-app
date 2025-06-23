// Firestore Collections Configuration
import { collection, doc, setDoc, addDoc, getDocs, getDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from './config';

// Collection names
export const COLLECTIONS = {
  MATERIALES: 'materiales',
  PROYECTOS: 'proyectos',
  USUARIOS: 'usuarios',
  CALCULOS: 'calculos',
  CATEGORIAS: 'categorias'
};

// Material structure
export const materialStructure = {
  id: '',
  categoria: '', // 'Filamento', 'Resina', 'Pintura', 'Aros de llavero'
  nombre: '',
  tipo: '',
  subtipo: '',
  color: '',
  precio: 0,
  peso: 0, // gramos para filamento/resina, ml para pintura
  cantidad: 0,
  consumido: 0, // cantidad consumida
  fechaIngreso: '',
  usuarioId: '',
  imagen: '',
  activo: true
};

// Project structure
export const projectStructure = {
  id: '',
  nombre: '',
  materialId: '',
  cantidadMaterial: 0,
  tiempoImpresion: 0, // horas
  costo: 0,
  ganancia: 0,
  estado: '', // 'pendiente', 'en_proceso', 'completado', 'cancelado'
  fechaInicio: '',
  fechaFin: '',
  usuarioId: '',
  notas: ''
};

// User structure
export const userStructure = {
  id: '',
  nombre: '',
  email: '',
  foto: '',
  nivel: '', // 'Principiante', 'Intermedio', 'Experto'
  fechaRegistro: '',
  configuracion: {
    moneda: 'MXN',
    zonaHoraria: 'America/Mexico_City',
    notificaciones: true
  }
};

// Calculation structure
export const calculationStructure = {
  id: '',
  usuario: '',
  filamento: {
    tipo: '',
    precioBobina: 0,
    pesoBobina: 0,
    gramosUtilizados: 0,
    costoFilamento: 0,
    costoMaterialSolo: 0
  },
  manoObra: {
    preparacionTiempo: 0,
    preparacionCosto: 0,
    costoTotalManoObra: 0
  },
  avanzados: {
    arosLlavero: 0,
    imanes: 0,
    otrosMateriales: 0,
    consumoKwh: 0,
    costoKwh: 0,
    costoLuz: 0,
    horasimpresion: 0,
    totalMaterialesExtra: 0
  },
  fecha: '',
  total: 0
};

// Collection references
export const getMaterialesRef = () => collection(db, COLLECTIONS.MATERIALES);
export const getProyectosRef = () => collection(db, COLLECTIONS.PROYECTOS);
export const getUsuariosRef = () => collection(db, COLLECTIONS.USUARIOS);
export const getCalculosRef = () => collection(db, COLLECTIONS.CALCULOS);
export const getCategoriasRef = () => collection(db, COLLECTIONS.CATEGORIAS);

// Helper functions for common queries
export const getMaterialesByCategoria = (categoria) => {
  const q = query(
    getMaterialesRef(),
    where('categoria', '==', categoria),
    where('activo', '==', true)
  );
  return getDocs(q);
};

export const getMaterialesByUsuario = (usuarioId) => {
  const q = query(
    getMaterialesRef(),
    where('usuarioId', '==', usuarioId),
    where('activo', '==', true),
    orderBy('fechaIngreso', 'desc')
  );
  return getDocs(q);
};

export const getProyectosByUsuario = (usuarioId) => {
  const q = query(
    getProyectosRef(),
    where('usuarioId', '==', usuarioId),
    orderBy('fechaInicio', 'desc')
  );
  return getDocs(q);
};

export const getCalculosByUsuario = (usuarioId) => {
  const q = query(
    getCalculosRef(),
    where('usuario', '==', usuarioId),
    orderBy('fecha', 'desc')
  );
  return getDocs(q);
}; 