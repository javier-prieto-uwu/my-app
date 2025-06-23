import { MaterialCommunityIcons } from "@expo/vector-icons";
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
        tabBarIconStyle: styles.tabBarIcon,
        headerStyle: styles.header,
        headerTitleAlign: "left",
        headerTitleContainerStyle: styles.headerTitleContainer,
        tabBarShowLabel: false,
        tabBarItemStyle: styles.tabBarItem,
        tabBarAllowFontScaling: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={28}
              name={focused ? "home-variant" : "home-variant-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="calcularCosto"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={28}
              name={focused ? "calculator-variant" : "calculator-variant-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="agregarM"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={28}
              name={focused ? "plus-box" : "plus-box-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="inventario"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={28}
              name={focused ? "archive" : "archive-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={28}
              name={focused ? "menu" : "menu"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#181818",
    height: 70,
    paddingTop: 6,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
    borderTopColor: '#222',
  },
  tabBarIcon: {
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: 0,
  },
  header: {
    backgroundColor: "#0d0d0d",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    borderBottomColor: '#222',
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
