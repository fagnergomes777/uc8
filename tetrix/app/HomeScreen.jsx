/**
 * TELA INICIAL (HOME SCREEN)
 *
 * Tela principal do aplicativo que apresenta o menu principal
 * com opções para iniciar o jogo e ver histórico.
 */

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/homeStyles";

/**
 * @param {Object} navigation - Objeto de navegação do React Navigation
 */
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Título principal do jogo */}
      <Text style={styles.title}>Tetrix</Text>

      {/* Botão para iniciar novo jogo */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Game")}
      >
        <Text style={styles.buttonText}>Iniciar Jogo</Text>
      </TouchableOpacity>

      {/* Botão para ver histórico de partidas */}
      <TouchableOpacity
        style={[styles.button, styles.secondary]}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={styles.buttonText}>Histórico de Jogos</Text>
      </TouchableOpacity>

      {/* Texto informativo */}
      <Text style={styles.small}>
        Use os botões na tela do jogo para controlar as peças.
      </Text>
    </View>
  );
}