import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#00e676",
        tabBarInactiveTintColor: "#a0a0a0",
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        headerStyle: styles.header,
        headerTitleAlign: "left",
        headerTitleContainerStyle: styles.headerTitleContainer,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="calcularCosto"
        options={{
          headerShown: false,
          tabBarLabel: "Calculadora",

          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="calculator" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="agregarM"
        options={{
          headerShown: false,
          tabBarLabel: "Agregar",

          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="plus" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="inventario"
        options={{
          headerShown: false,
          tabBarLabel: "Inventario",

          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="archive" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          headerShown: false,
          tabBarLabel: "Menú",

          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="bars" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#0d0d0d",
    height: 60,
    borderTopWidth: 0,
    paddingTop: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: "Poppins",
    fontWeight: "500",
    marginBottom: 5,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
  header: {
    backgroundColor: "#0d0d0d",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 0,
    paddingLeft: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "600",
    flex: 1,
  },
  logoContainer: {
    marginLeft: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
});
