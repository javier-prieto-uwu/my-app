import { useRouter } from "expo-router";
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Imagen con sombra */}
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://www.mexicomakers.com.mx/cdn/shop/files/PLABlack.jpg?v=1740682017",
          }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Título grande con mejor espaciado */}
      <Text style={styles.logoText}>
        <Text style={styles.green}>3D</Text>
        <Text style={styles.white}>MATERIAL</Text>
      </Text>

      {/* Título descriptivo con efecto de gradiente textual */}
      <Text style={styles.titulo}>
        El Mejor Sistema Gestor{'\n'}De Materiales
      </Text>

      {/* Subtítulo con mejor legibilidad */}
      <Text style={styles.subtitulo}>
        Administra tus filamentos y materiales de impresión 3D
      </Text>

      {/* Botones con efectos interactivos */}
      <TouchableOpacity 
        style={styles.boton} 
        onPress={() => router.push("/InicioSesion")}
        activeOpacity={0.8}
      >
        <Text style={styles.botonTexto}>INICIAR SESIÓN</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.boton]}
        activeOpacity={0.8}
      >
        <Text style={styles.botonTexto}>REGISTRARSE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    shadowColor: '#00e676',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 30,
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 30,
  },
  logoText: {
    fontSize: 36,
    fontFamily: 'Poppins',
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 1,
  },
  green: {
    color: '#00e676',
    textShadowColor: 'rgba(0, 230, 118, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  white: {
    color: 'white',
  },
  titulo: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 32,
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  subtitulo: {
    color: '#a0a0a0',
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.25,
    marginBottom: 40,
    maxWidth: '80%',
  },
  boton: {
    backgroundColor: '#00e676',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#00e676',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  botonSecundario: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00e676',
  },
  botonTexto: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Poppins',
    letterSpacing: 0.5,
  },
});