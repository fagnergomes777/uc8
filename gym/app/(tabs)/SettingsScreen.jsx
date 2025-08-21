// ============================================================================
// SettingsScreen.jsx - Tela de configurações do aplicativo
// Funcionalidades: Alternância entre tema claro e escuro
// ============================================================================

import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

export default function SettingsScreen({ theme, toggleTheme, isDarkMode }) {
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Título da tela */}
      <Text style={[styles.text, { color: theme.text }]}>Configurações</Text>

      {/* Container do switch para modo escuro */}
      <View style={styles.switchContainer}>
        <Text style={{ color: theme.text, marginRight: 10 }}>Modo Escuro</Text>
        {/* Switch: componente de alternância (liga/desliga) */}
        <Switch
          value={isDarkMode} // Estado atual (true/false)
          onValueChange={toggleTheme} // Função chamada ao alterar
          trackColor={{ false: "#ccc", true: "#4CAF50" }} // Cores do trilho
          thumbColor={isDarkMode ? "#fff" : "#f4f3f4"} // Cor do botão
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});