import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { insertCitizen, updateCitizen } from "../db/db";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaskedTextInput } from "react-native-mask-text";
import styles from "../styles/cadastroFormStyles";

export default function CitizenForm() {
  const nav = useNavigation();
  const route = useRoute();
  const editing = route.params && route.params.citizen;

  const [id] = useState(editing ? editing.id : null);
  const [cpf, setCpf] = useState(editing ? editing.cpf : "");
  const [name, setName] = useState(editing ? editing.name : "");
  const [birth, setBirth] = useState(editing ? editing.birth : "");
  const [cep, setCep] = useState(editing ? editing.cep : "");
  const [street, setStreet] = useState(editing ? editing.street : "");
  const [neighborhood, setNeighborhood] = useState(
    editing ? editing.neighborhood : ""
  );
  const [city, setCity] = useState(editing ? editing.city : "");
  const [state, setState] = useState(editing ? editing.state : "");
  const [number, setNumber] = useState(editing ? editing.number : "");
  const [complement, setComplement] = useState(
    editing ? editing.complement : ""
  );
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (cep && cep.replace(/\D/g, "").length === 8) {
      fetch(cep.replace(/\D/g, ""));
    }
  }, [cep]);

  // Função para verificar se o cep digitado está correto

  async function fetch(cepOnlyNumbers) {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://viacep.com.br/ws/${cepOnlyNumbers}/json/`
      );

      if (res.data.erro) {
        setStreet(res.data.logradouro || "");
        setNeighborhood(res.data.bairro || "");
        setCity(res.data.localidade || "");
        setState(res.data.uf || "");
      } else {
        Alert.alert("CEP não encontrado", "Verifique o CEP digitado");
      }
    } catch (_err) {
      Alert.alert("Erro ao buscar CEP", "Verifique sua conexão");
    } finally {
      setLoading(false);
    }
  }

  async function onSave() {
    if (!cpf || !name) {
      Alert.alert("Campos obrigatórios", "Preencha pelo menos o CPF e o Nome");
      return;
    }
    const citizen = {
      cpf,
      name,
      birth,
      cep,
      street,
      neighborhood,
      city,
      state,
      number,
      complement,
    };
    try {
      setSaving(true);
      if (id) {
        await updateCitizen(id, citizen);
        Alert.alert("Atualizado", "Cadastro atualizado com sucesso!");
      } else {
        await insertCitizen(citizen);
        Alert.alert("Salvo", "Cadastro salvo com sucesso!");
      }

      setCpf("");
      setName("");
      setBirth("");
      setCep("");
      setNeighborhood("");
      setCity("");
      setState("");
      setNumber("");
      setComplement("");
      nav.navigate("Histórico");
    } catch (err) {
      console.log(err);
      Alert.alert(
        "Erro ao salvar",
        "Verifique os dados e tente novamente. CPF já cadastrado"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.form}>
      <Text style={styles.label}>CPF *</Text>
      <MaskedTextInput
        mask="999.999.999-99"
        value={cpf}
        onChangeText={(t) => setCpf(t)}
        keyboardType="numeric"
        style={styles.input}
        placeholder="000.000.000-00"
      />

      <Text style={styles.label}>Nome *</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Nome completo"
      />

      <Text style={styles.label}>Data de Nascimento</Text>
      <MaskedTextInput
        mask="99/99/9999"
        value={birth}
        onChangeText={setBirth}
        keyboardType="numeric"
        style={styles.input}
        placeholder="DD/MM/AAAA"
      />

      <Text style={styles.label}>CEP</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaskedTextInput
          mask="99999-999"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
          style={[styles.input, { flex: 1 }]}
          placeholder="00000-000"
        />
        {loading ? (
          <ActivityIndicator style={{ marginLeft: 8 }} />
        ) : (
          <TouchableOpacity
            onPress={() => {
              const raw = (cep || "").replace(/\D/g, "");
              if (raw.length === 8) fetch(raw);
              else Alert.alert("CEP inválido", "Digite 8 dígitos do CEP.");
            }}
          >
            <MaterialIcons
              name="search"
              size={28}
              color="#064E2E"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        )}
      </View>

        <Text style={styles.label}>Logradouro</Text>
      <TextInput
        value={street}
        onChangeText={setStreet}
        style={styles.input}
        placeholder="Rua, Av..."
      />

      <Text style={styles.label}>Número</Text>
      <TextInput
        value={number}
        onChangeText={setNumber}
        style={styles.input}
        placeholder="Número"
      />

      <Text style={styles.label}>Complemento</Text>
      <TextInput
        value={complement}
        onChangeText={setComplement}
        style={styles.input}
        placeholder="Apto, Bloco..."
      />

      <Text style={styles.label}>Bairro</Text>
      <TextInput
        value={neighborhood}
        onChangeText={setNeighborhood}
        style={styles.input}
        placeholder="Bairro"
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        value={city}
        onChangeText={setCity}
        style={styles.input}
        placeholder="Cidade"
      />

      <Text style={styles.label}>Estado</Text>
      <TextInput
        value={state}
        onChangeText={setState}
        style={styles.input}
        placeholder="UF"
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={onSave}
        activeOpacity={0.8}
      >
        {saving ? (<ActivityIndicator color="#fff"/>):(
            <Text style={styles.saveText}>Salvar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
