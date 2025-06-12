import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
import PiePagina2 from "./Componentes/index/PiePagina2";

export default function Index() {
  //estados
  const [user, setUser] = React.useState("");
  const [pw, setPw] = React.useState("");

  const router = useRouter();

  const login = () => {
    if (user == "" || pw == "") {
      alert("Favor de llenar los campos");
    } else {
      if (user == "admin" && pw == "123") {
        router.push("/(tabs)/home");
      } else {
        alert("Credenciales incorrectas");
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo con sombra */}
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://www.mexicomakers.com.mx/cdn/shop/files/PLABlack.jpg?v=1740682017",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Título */}
        <Text style={styles.titulo}>
          Iniciar Sesión
        </Text>

        {/* Campos de formulario */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu usuario"
            placeholderTextColor="#a0a0a0"
            onChangeText={setUser}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#a0a0a0"
            secureTextEntry
            onChangeText={setPw}
          />
        </View>

        {/* Botones principales */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            onPress={login} 
            style={styles.primaryButton}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/CrearCuenta")}
            style={[styles.primaryButton, styles.secondaryButton]}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>CREAR CUENTA</Text>
          </TouchableOpacity>
        </View>

        {/* Separador */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>o continuar con</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Botón de Google */}
        <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
          <Text style={styles.googleIcon}>G</Text>
        </TouchableOpacity>

        {/* Pie de página */}
        <PiePagina2 />
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0d0d0d',
  },
  logoContainer: {
    shadowColor: '#00e676',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 30,
    alignSelf: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 30,
  },
  titulo: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Poppins',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  formContainer: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    fontSize: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    fontFamily: 'Poppins',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#00e676',
    borderRadius: 30,
    paddingVertical: 16,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#00e676',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00e676',
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Poppins',
    letterSpacing: 0.5,
  },
  secondaryButtonText: {
    color: '#00e676',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  separatorText: {
    color: '#a0a0a0',
    fontSize: 14,
    fontFamily: 'Poppins',
    marginHorizontal: 10,
  },
  googleButton: {
    backgroundColor: '#1a1a1a',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#333',
    elevation: 3,
  },
  googleIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00e676',
    fontFamily: 'Poppins',
  },
});