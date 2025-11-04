import React from "react";
import { ScrollView } from "react-native";
import CitizenForm from "../../components/CitizenForm";
import styles from "../../styles/cadastroStyles";

export default function CadastroScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CitizenForm />
    </ScrollView>
  );
}