import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        // Usuario autenticado, ir a la aplicación principal
        router.replace('/(tabs)/home');
      } else {
        // Usuario no autenticado, ir a login
        router.replace('/InicioSesion');
      }
    }
  }, [loading, isAuthenticated, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3D Material</Text>
      <ActivityIndicator size="large" color="#00e676" style={styles.loader} />
      <Text style={styles.subtitle}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loader: {
    marginBottom: 20,
  },
  subtitle: {
    color: '#a0a0a0',
    fontSize: 16,
  },
});