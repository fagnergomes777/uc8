import React, {useEffect, useState} from 'react';

import { View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as SecureStore from 'expo-secure-store';

import * as FileSystem from 'expo-file-system';

import styles from '../styles/styles';

const NOTES_KEY = "@NOTAS";
const PIN_KEY = "user_pin";

export default function App() {
  const[ hasPin, setHasPin ] = useState(null);

  const [ pinImput, setPinInput ] = useState("");

  const [ pinStep, setPinStep ] = useState("enter");

  const [ tempPin, setTempPin ] = useState("")

  const [ nota, serNota ] = useState("");

  const [ notas, setNotas ] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const savedPin = await SecureStore.getItemAsync(PIN_KEY);

        setHasPin(!!savedPin);

        setPinStep(savedPin ? "enter" : "set");

      } catch (_error) {
        console.log("Erro ao ler PIN:", _error);
        setHasPin(false);
        setPinStep("set");
      }
    })()
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(NOTES_KEY);

        if (raw) setNotas(JSON.parse(raw));
      } catch (_error) {
        console.log("Erro ao carregar notas:", _error);
      }
    })();
  }, []);

  const persistNotas = async (list) => {
    setNotas(list);

    try{
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(list));
    }catch(_error){
      Alert.alert("Erro", "Não foi possível salvar suas notas.")
    }
  };

  const addNota = () => {
    const text = nota.trim();

    if(!text) return;

    const nova = {id: Date.now().toString(), text};

    persistNotas([nova, ...notas]);

    setNotas("");

    Keyboard.dismiss();
  }

  const clearNotas = () => {
    Alert.alert(
      "Limpar tudo",
      "Tem certeza que deseja apagar todas as notas?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Apagar",
          style: "destructive",
          onPress: async () => persistNotas ([]),
        }
      ]
    );
  };


  

}

