import { Stack } from "expo-router";

export default function RootLayout() {
  return(

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTintColor: '#',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: true}} />
        <Stack.Screen name="crearcuenta" options={{ headerShown: true}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
      </Stack>

  )
}
