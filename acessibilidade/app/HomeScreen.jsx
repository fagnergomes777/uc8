import React, { useState } from "react";

import { View, Text, Pressable, AccessibilityInfo } from "react-native";

import * as Speech from "expo-speech";

import { makeHomeStyles } from "../styles/homeStyles";

export default function HomeScreen({ theme, fontScale, bigTargets }) {
  const styles = makeHomeStyles({ theme, fontScale, bigTargets });

  const [items, setItems] = useState([
    { id: 1, text: "Ler as instruções de acessibilidade", done: false },
    { id: 2, text: "Testar com TalkBack/VoiceOver", done: false },
    { id: 3, text: "Ativar Alto contraste", done: false },
    { id: 4, text: "Aumentar tamanho de fonte", done: false },
  ]);

  const toggle = (id) => {
    setItems((prev) => {
      const updated = prev.map((it) =>
        it.id === id ? { ...it, done: !it.done } : it
      );

      const changed = updated.find((it) => it.id === id);

      AccessibilityInfo.announceForAccessibility(
        `${changed.text} marcado como ${
          changed.done ? "Concluído" : "pendente"
        }`
      );
      return updated;
    });
  };

  const announceSumary = () => {
    const done = items.filter((i) => i.done).length;
    const total = items.length;
    const msg = `Você concluiu ${done} de ${total} tarefas.`;

    Speech.speak(msg, {language: "pt-BR"});

    AccessibilityInfo.announceForAccessibility(msg);
    
  }

    return (
        
    )




}
