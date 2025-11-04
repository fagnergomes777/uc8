/**
 * TELA DE HISTÓRICO
 *
 * Exibe o histórico das partidas jogadas, salvas no AsyncStorage.
 * Permite visualizar pontuações anteriores e limpar o histórico.
 */

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/historyStyles";

/**
 * @param {Object} navigation - Objeto de navegação do React Navigation
 */
export default function HistoryScreen({ navigation }) {
  // Estado para armazenar lista de jogos históricos
  const [history, setHistory] = useState([]);

  // Efeito para carregar dados quando a tela é focada
  useEffect(() => {
    // Listener para recarregar dados quando volta para a tela
    const unsubscribe = navigation.addListener("focus", () => {
      load();
    });

    // Carrega dados iniciais
    load();

    // Cleanup do listener
    return unsubscribe;
  }, [navigation]);

  /**
   * CARREGAR HISTÓRICO DO ASYNC STORAGE
   * Recupera e parseia os dados salvos localmente
   */
  async function load() {
    try {
      const raw = await AsyncStorage.getItem("@tetrix_history");
      const arr = raw ? JSON.parse(raw) : []; // Array vazio se não há dados
      setHistory(arr);
    } catch (e) {
      console.warn("Erro ao carregar histórico:", e);
    }
  }

  /**
   * LIMPAR TODO O HISTÓRICO
   * Remove todos os registros do AsyncStorage
   */
  async function clearAll() {
    await AsyncStorage.removeItem("@tetrix_history");
    setHistory([]); // Limpa estado local também
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho com navegação e ações */}
      <View style={styles.header}>
        {/* Botão voltar */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.btnBack}
        >
          <Text style={styles.btnText}>Voltar</Text>
        </TouchableOpacity>

        {/* Título da tela */}
        <Text style={styles.title}>Histórico</Text>

        {/* Botão limpar histórico */}
        <TouchableOpacity onPress={clearAll} style={styles.btnClear}>
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista dos jogos históricos */}
      <FlatList
        data={history}
        keyExtractor={(item, idx) => item.date + idx} // Chave única para cada item
        contentContainerStyle={styles.scrollContainer}
        renderItem={({ item }) => (
          // Cada item do histórico
          <View style={styles.row}>
            <View>
              {/* Data e hora da partida */}
              <Text style={styles.date}>
                {new Date(item.date).toLocaleString()}
              </Text>
              {/* Informações da partida */}
              <Text style={styles.meta}>
                Score: {item.score} • Level: {item.level}
              </Text>
            </View>
          </View>
        )}
        // Componente exibido quando lista está vazia
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum jogo registrado</Text>
        }
      />
    </View>
  );
}