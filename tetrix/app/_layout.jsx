/**
 * LAYOUT PRINCIPAL E NAVEGAÇÃO
 *
 * Configuração do React Navigation para o aplicativo.
 * Define as telas disponíveis e como navegar entre elas.
 */

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import GameScreen from "./GameScreen";
import HistoryScreen from "./HistoryScreen";

// Criação do navegador de pilha (stack navigator)
const Stack = createNativeStackNavigator();

/**
 * COMPONENTE PRINCIPAL DA APLICAÇÃO
 * Configura toda a estrutura de navegação
 */
export default function App() {
  return (
    <Stack.Navigator
      initialRouteName="Home" // Tela inicial
      screenOptions={{ headerShown: false }} // Remove header padrão
    >
      {/* Tela inicial/menu principal */}
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* Tela do jogo */}
      <Stack.Screen name="Game" component={GameScreen} />

      {/* Tela de histórico */}
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
}