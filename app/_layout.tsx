import { Stack } from "expo-router";
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          animation: 'slide_from_right', // 💫 Aquí defines la animación
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="InicioSesion" options={{ headerShown: false }} />
        <Stack.Screen name="CrearCuenta" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
