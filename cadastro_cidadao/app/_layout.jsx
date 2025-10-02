import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "./screens/HomeScreen";
import CadastroScreen from "./screens/CadastroScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ConfigsScreen from "./screens/ConfigsScreen";
import AboutScreen from "./screens/AboutScreen";

import { initDB } from "../db/db";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { COLORS } from "../styles/colors";

const Drawer = createDrawerNavigator();

export default function App() {
  useEffect(() => {
    initDB().catch((err) => {
      console.log("DB init error:", err);
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.pale,
            },
            
            headerTintColor: COLORS.darkText,
          }}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Cadastro" component={CadastroScreen} />
          <Drawer.Screen name="Histórico" component={HistoryScreen} />
          <Drawer.Screen name="Configurações" component={ConfigsScreen} />
          <Drawer.Screen name="Sobre" component={AboutScreen} />
        </Drawer.Navigator>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
