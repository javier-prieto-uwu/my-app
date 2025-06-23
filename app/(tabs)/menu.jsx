import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '../../contexts/AuthContext'

export default function Menu() {
  const router = useRouter();
  const { userData, logout } = useAuth();
  
  // Usar datos reales del usuario o datos por defecto
  const usuario = userData || {
    nombre: 'Usuario',
    email: 'usuario@example.com',
    foto: 'https://via.placeholder.com/100x100/00e676/ffffff?text=U',
    nivel: 'Principiante',
    fechaRegistro: new Date().toISOString()
  };

  // Estadísticas simuladas (se pueden conectar con datos reales más adelante)
  const estadisticas = {
    materialesDisponibles: 24,
    filamentoConsumido: 1250, // gramos
    resinaConsumida: 850, // ml
    proyectosCompletados: 47,
    tiempoImpresion: 320, // horas
    costoTotalMateriales: 2840.50,
    ganancias: 5670.25,
    eficiencia: 85, // porcentaje
    tiempoPromedioProyecto: 6.8, // horas
    pedidosPendientes: 8
  };

  // Categorías de materiales
  const categoriasMateriales = [
    { nombre: 'Filamentos', cantidad: 12, color: '#00e676' },
    { nombre: 'Resinas', cantidad: 6, color: '#2196f3' },
    { nombre: 'Pinturas', cantidad: 4, color: '#ff9800' },
    { nombre: 'Aros de llavero', cantidad: 2, color: '#9c27b0' }
  ];

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar sesión', 
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              // La navegación se maneja automáticamente en el contexto
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar sesión');
            }
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    // TODO: Implementar edición de perfil
    Alert.alert('Editar perfil', 'Función en desarrollo');
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'add':
        router.push('/(tabs)/agregarM');
        break;
      case 'reports':
        Alert.alert('Reportes', 'Función en desarrollo');
        break;
      case 'settings':
        Alert.alert('Configuración', 'Función en desarrollo');
        break;
      case 'support':
        Alert.alert('Soporte', 'Función en desarrollo');
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header con foto de usuario */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: usuario.foto }} 
            style={styles.userPhoto}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{usuario.nombre}</Text>
            <Text style={styles.userEmail}>{usuario.email}</Text>
            <View style={styles.userLevel}>
              <Text style={styles.levelText}>{usuario.nivel}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.editProfileBtn} onPress={handleEditProfile}>
          <Text style={styles.editProfileText}>Editar perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Estadísticas principales */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Estadísticas Generales</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{estadisticas.materialesDisponibles}</Text>
            <Text style={styles.statLabel}>Materiales disponibles</Text>
            <View style={styles.statIcon}>📦</View>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{estadisticas.proyectosCompletados}</Text>
            <Text style={styles.statLabel}>Proyectos completados</Text>
            <View style={styles.statIcon}>✅</View>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{estadisticas.eficiencia}%</Text>
            <Text style={styles.statLabel}>Eficiencia general</Text>
            <View style={styles.statIcon}>📈</View>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{estadisticas.tiempoPromedioProyecto}h</Text>
            <Text style={styles.statLabel}>Tiempo promedio por proyecto</Text>
            <View style={styles.statIcon}>⏱️</View>
          </View>
        </View>
      </View>

      {/* Consumo de materiales */}
      <View style={styles.materialsContainer}>
        <Text style={styles.sectionTitle}>Consumo de Materiales</Text>
        
        <View style={styles.materialStats}>
          <View style={styles.materialCard}>
            <View style={styles.materialHeader}>
              <Text style={styles.materialTitle}>Filamento</Text>
              <Text style={styles.materialAmount}>{estadisticas.filamentoConsumido}g</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '75%', backgroundColor: '#00e676' }]} />
            </View>
            <Text style={styles.materialSubtext}>Consumido este mes</Text>
          </View>
          
          <View style={styles.materialCard}>
            <View style={styles.materialHeader}>
              <Text style={styles.materialTitle}>Resina</Text>
              <Text style={styles.materialAmount}>{estadisticas.resinaConsumida}ml</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '60%', backgroundColor: '#2196f3' }]} />
            </View>
            <Text style={styles.materialSubtext}>Consumida este mes</Text>
          </View>
        </View>
      </View>

      {/* Categorías de materiales */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Materiales por Categoría</Text>
        
        {categoriasMateriales.map((categoria, index) => (
          <View key={index} style={styles.categoryItem}>
            <View style={styles.categoryInfo}>
              <View style={[styles.categoryDot, { backgroundColor: categoria.color }]} />
              <Text style={styles.categoryName}>{categoria.nombre}</Text>
            </View>
            <Text style={styles.categoryAmount}>{categoria.cantidad} materiales</Text>
          </View>
        ))}
      </View>

      {/* Métricas financieras */}
      <View style={styles.financialContainer}>
        <Text style={styles.sectionTitle}>Métricas Financieras</Text>
        
        <View style={styles.financialGrid}>
          <View style={styles.financialCard}>
            <Text style={styles.financialLabel}>Costo total materiales</Text>
            <Text style={styles.financialAmount}>${estadisticas.costoTotalMateriales}</Text>
            <Text style={styles.financialPeriod}>Este mes</Text>
          </View>
          
          <View style={styles.financialCard}>
            <Text style={styles.financialLabel}>Ganancias</Text>
            <Text style={[styles.financialAmount, { color: '#00e676' }]}>${estadisticas.ganancias}</Text>
            <Text style={styles.financialPeriod}>Este mes</Text>
          </View>
          
          <View style={styles.financialCard}>
            <Text style={styles.financialLabel}>Tiempo de impresión</Text>
            <Text style={styles.financialAmount}>{estadisticas.tiempoImpresion}h</Text>
            <Text style={styles.financialPeriod}>Este mes</Text>
          </View>
          
          <View style={styles.financialCard}>
            <Text style={styles.financialLabel}>Pedidos pendientes</Text>
            <Text style={[styles.financialAmount, { color: '#ff9800' }]}>{estadisticas.pedidosPendientes}</Text>
            <Text style={styles.financialPeriod}>Activos</Text>
          </View>
        </View>
      </View>

      {/* Acciones rápidas */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleQuickAction('add')}
          >
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={styles.actionText}>Agregar material</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleQuickAction('reports')}
          >
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionText}>Ver reportes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleQuickAction('settings')}
          >
            <Text style={styles.actionIcon}>⚙️</Text>
            <Text style={styles.actionText}>Configuración</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleQuickAction('support')}
          >
            <Text style={styles.actionIcon}>📞</Text>
            <Text style={styles.actionText}>Soporte</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#00e676',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: '#a0a0a0',
    fontSize: 14,
    marginBottom: 8,
  },
  userLevel: {
    backgroundColor: '#00e676',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  levelText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  editProfileBtn: {
    backgroundColor: '#181818',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  editProfileText: {
    color: '#00e676',
    fontSize: 14,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#181818',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222',
    position: 'relative',
  },
  statNumber: {
    color: '#00e676',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#a0a0a0',
    fontSize: 12,
  },
  statIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    fontSize: 20,
  },
  materialsContainer: {
    marginBottom: 24,
  },
  materialStats: {
    gap: 12,
  },
  materialCard: {
    backgroundColor: '#181818',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  materialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  materialTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  materialAmount: {
    color: '#00e676',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  materialSubtext: {
    color: '#a0a0a0',
    fontSize: 12,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#222',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    color: 'white',
    fontSize: 16,
  },
  categoryAmount: {
    color: '#a0a0a0',
    fontSize: 14,
  },
  financialContainer: {
    marginBottom: 24,
  },
  financialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  financialCard: {
    backgroundColor: '#181818',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  financialLabel: {
    color: '#a0a0a0',
    fontSize: 12,
    marginBottom: 4,
  },
  financialAmount: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  financialPeriod: {
    color: '#666',
    fontSize: 10,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#181818',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#181818',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#00e676',
    fontSize: 14,
    fontWeight: 'bold',
  },
});