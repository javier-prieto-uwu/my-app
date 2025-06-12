import { Stack } from "expo-router";

export default function RootLayout() {
  return(

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
        <Stack.Screen name="index" options={{ headerShown: false}} />
        <Stack.Screen name="InicioSesion" options={{ headerShown: false}} />
        <Stack.Screen name="crearcuenta" options={{ headerShown: true}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
      </Stack>

  )
}
