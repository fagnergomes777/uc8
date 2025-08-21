// ============================================================================
// AddressScreen.jsx - Tela de cadastro de endereço
// Funcionalidades: Busca de CEP via API ViaCEP, salvamento de endereço
// ============================================================================

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function AddressScreen({ route, navigation, theme }) {
  // ==================== ESTADOS DO COMPONENTE ====================
  // Recebe o nome do aluno da tela anterior com proteção contra undefined
  const { alunoNome } = route.params || {};
  const [cep, setCep] = useState(""); // CEP digitado pelo usuário
  const [endereco, setEndereco] = useState(null); // Dados do endereço retornados pela API

  // ==================== FUNÇÕES DE NEGÓCIO ====================

  // Busca endereço na API ViaCEP baseado no CEP informado
  async function buscarEndereco() {
    // Validação: CEP deve ter exatamente 8 números
    if (cep.length !== 8) {
      Alert.alert("Erro", "Digite um CEP válido com 8 números.");
      return;
    }

    try {
      // Faz requisição para API ViaCEP
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      // Verifica se a API retornou erro (CEP não encontrado)
      if (data.erro) {
        Alert.alert("Erro", "CEP não encontrado.");
      } else {
        setEndereco(data); // Salva dados do endereço no estado
      }
    } catch (_error) {
      // Captura erros de rede ou outros problemas
      Alert.alert("Erro", "Não foi possível buscar o endereço.");
    }
  }

  // Salva o endereço (simulação - em produção salvaria em banco de dados)
  async function salvarEndereco() {
    try {
      // Por enquanto, apenas mostra uma mensagem de sucesso
      // Em uma implementação real, você salvaria no banco de dados
      Alert.alert("Sucesso", `Endereço salvo para ${alunoNome}!`);
      navigation.goBack(); // Volta para a tela anterior
    } catch (_error) {
      Alert.alert("Erro", "Não foi possível salvar o endereço.");
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>
        Cadastrar endereço para {alunoNome}
      </Text>

      <TextInput
        style={[styles.input, { borderColor: theme.text, color: theme.text }]}
        placeholder="Digite o CEP"
        placeholderTextColor="#888"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />

      <Button title="Buscar" onPress={buscarEndereco} color="#4CAF50" />

      {endereco && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: theme.text }}>Rua: {endereco.logradouro}</Text>
          <Text style={{ color: theme.text }}>Bairro: {endereco.bairro}</Text>
          <Text style={{ color: theme.text }}>
            Cidade: {endereco.localidade}
          </Text>
          <Text style={{ color: theme.text }}>Estado: {endereco.uf}</Text>

          <View style={{ marginTop: 10 }}>
            <Button
              title="Salvar Endereço"
              onPress={salvarEndereco}
              color="#2196F3"
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});