import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../styles/colors";
import styles from "../../styles/homeStyles";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const nav = useNavigation();

  const blocks = [
    { title: "Cadastro", screen: "Cadastro", icon: "person-add" },
    { title: "Configurações", screen: "Configurações", icon: "settings" },
    { title: "Histórico", screen: "Histórico", icon: "history" },
    { title: "Sobre", screen: "Sobre", icon: "info" },
  ];

  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>App Cadastro de Cidadão</Text>
      <View style={styles.grid}>
        {blocks.map((b, i) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={i}
            style={[
              styles.block,
              { backgroundColor: Object.values(COLORS)[i % 4] },
            ]}
            onPress={() => nav.navigate(b.screen)}
          >
            <MaterialIcons name={b.icon} size={42} color="#064E2E" />
            <Text style={styles.blockText}>{b.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}