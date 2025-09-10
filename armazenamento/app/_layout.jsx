import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard,
  Modal,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as FileSystem from "expo-file-system";

import styles from "../styles/styles";

const NOTES_KEY = "@NOTAS";
const PIN_KEY = "user_pin";

export default function App() {
  const [hasPin, setHasPin] = useState(null);
  const [pinInput, setPinInput] = useState("");
  const [pinStep, setPinStep] = useState("enter");
  const [tempPin, setTempPin] = useState("");
  const [nota, setNota] = useState("");
  const [notas, setNotas] = useState([]);

  // estados para edição
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const savedPin = await SecureStore.getItemAsync(PIN_KEY);
        setHasPin(!!savedPin);
        setPinStep(savedPin ? "enter" : "set");
      } catch (_error) {
        setHasPin(false);
        setPinStep("set");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(NOTES_KEY);
        if (raw) setNotas(JSON.parse(raw));
      } catch (_error) {}
    })();
  }, []);

  const persistNotas = async (list) => {
    setNotas(list);
    try {
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(list));
    } catch (_error) {
      Alert.alert("Erro", "Não foi possível salvar suas notas.");
    }
  };

  const clearNotas = () =>{
    Alert.alert(
      "Limpar tudo",
      "Tem certeza que deseja apagar todas as notas?",
      [
        {text: "Cancelar", style: "cancel"},
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => persistNotas([]), 
        }
      ]
    )
  }

  const exportBackup = async () => {
    try {
      const path = FileSystem.documentDirectory + "notes-backup.json";

      await FileSystem.writeAsStringAsync(path, JSON.stringify(notas), {
        encoding: FileSystem.EncodingType.UTF8,
      });

      Alert.alert("Backup criado", `Arquivo salvo em:\n${path}`);
    } catch (_error) {
      Alert.alert("Erro", "Falha ao criar backup.");
    }
  };

  const showBackup = async () => {
    try {
      const path = FileSystem.documentDirectory + "notes-backup.json";

      const content = await FileSystem.readAsStringAsync(path);

      Alert.alert("Backup encontrado", content);
    } catch (_error) {
      Alert.alert("Erro", "Não foi possível abrir o backup.");
    }
  };

  // importar backup
  const importBackup = async () => {
    try {
      const path = FileSystem.documentDirectory + "notes-backup.json";
      const content = await FileSystem.readAsStringAsync(path);

      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        persistNotas(parsed);
        Alert.alert("Backup restaurado", "Suas notas foram recuperadas.");
      } else {
        Alert.alert("Erro", "Backup inválido.");
      }
    } catch (_error) {
      Alert.alert("Erro", "Não foi possível importar o backup.");
    }
  };

  const addNota = () => {
    const text = nota.trim();
    if (!text) return;
    const nova = { id: Date.now().toString(), text };
    persistNotas([nova, ...notas]);
    setNota("");
    Keyboard.dismiss();
  };

  // iniciar edição
  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
    setEditing(true);
  };

  // salvar edição
  const saveEdit = () => {
    if (!editText.trim()) {
      Alert.alert("Erro", "A nota não pode ficar vazia.");
      return;
    }
    const updated = notas.map((n) =>
      n.id === editId ? { ...n, text: editText.trim() } : n
    );
    persistNotas(updated);
    setEditing(false);
    setEditId(null);
    setEditText("");
  };

  const handlePinSubmit = async () => {
    const code = pinInput.trim();

    if (code.length < 4) {
      Alert.alert("PIN inválido", "Use pelo menos 4 dígitos.");
      return;
    }

    if (pinStep === "set") {
      setTempPin(code);
      setPinInput("");
      setPinStep("confirm");
      return;
    }

    if (pinStep === "confirm") {
      if (code !== tempPin) {
        Alert.alert("Não confere", "Os PINs não são iguais");
        return;
      }

      try {
        await SecureStore.setItemAsync(PIN_KEY, code, {
          keychainService: "appPin",
        });

        setHasPin(true);
        setPinStep("enter");
        setPinInput("");

        Alert.alert("Pronto", "PIN configurado com sucesso.");
      } catch (_error) {
        Alert.alert("Erro", "Não foi possível salvar o PIN");
      }
      return;
    }

    try {
      const savedPin = await SecureStore.getItemAsync(PIN_KEY);
      if (savedPin && code === savedPin) {
        setPinInput("");
        
      } else {
        Alert.alert("PIN incorreto", "Tente novamente.");
      }
    } catch (_error) {
      Alert.alert("Erro", "Falha ao verificar PIN.");
    }
  };

  if (hasPin === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando…</Text>
      </View>
    );
  }

  if (!hasPin || pinStep !== "enter") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {pinStep === "set"
            ? "Crie um PIN"
            : pinStep === "confirm"
            ? "Confirme o PIN"
            : "Digite seu PIN"}
        </Text>

        <TextInput
          style={styles.input}
          value={pinInput}
          onChangeText={setPinInput}
          placeholder="PIN (mín. 4 dígitos)"
          keyboardType="numeric"
          secureTextEntry
          maxLength={10}
        />

        <TouchableOpacity style={styles.button} onPress={handlePinSubmit}>
          <Text style={styles.buttonText}>
            {pinStep === "enter" ? "Entrar" : "Salvar PIN"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Notas</Text>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={nota}
          onChangeText={setNota}
          placeholder="Escreva uma nota…"
          returnKeyType="done"
          onSubmitEditing={addNota}
        />

        <TouchableOpacity style={styles.button} onPress={addNota}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 8, paddingVertical: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => startEdit(item.id, item.text)} style={styles.card}>
            <Text style={styles.cardText}>{item.text}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.muted}>Nenhuma nota ainda.</Text>
        }
      />

      <View style={styles.actions}>
        <TouchableOpacity onPress={clearNotas} style={[styles.button,styles.secondary]}>
          <Text style={styles.buttonText}>Limpar tudo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={exportBackup} style={[styles.button,styles.secondary]}>
          <Text style={styles.buttonText}>Exportar Backup</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={showBackup} style={[styles.button,styles.secondary]}>
          <Text style={styles.buttonText}>Mostrar Backup</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={importBackup} style={[styles.button,styles.secondary]}>
          <Text style={styles.buttonText}>Importar Backup</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de edição */}
      <Modal visible={editing} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Editar Nota</Text>
            <TextInput
              style={styles.input}
              value={editText}
              onChangeText={setEditText}
              placeholder="Edite sua nota..."
            />
            <View style={styles.row}>
              <TouchableOpacity style={[styles.button, styles.secondary]} onPress={() => setEditing(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={saveEdit}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}