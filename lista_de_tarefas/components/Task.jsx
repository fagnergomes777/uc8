import { Pressable, View, Text, StyleSheet } from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";

export default function Task({text, initialCompleted}) {
    const [completed, setCompleted] = useState(initialCompleted)

    return (
    <View style={styles.rowContainer}>
      <Pressable onPress={() => setCompleted(!completed)}>
        <Ionicons name="checkmark-circle" size={32} color={completed ? '#00ff00' : '#000'} />
      </Pressable>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  }
});