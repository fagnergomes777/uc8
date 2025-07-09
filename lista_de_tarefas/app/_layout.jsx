import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Task from "../components/Task";
import { Colors } from "../constants/Colors";
const logo = require("../assets/images/anime.png");

const initialTasks = [
  {
    id: 1,
    completed: true,
    text: "Estudar React Native",
  },
];

export default function ListaDeTarefas() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setNewTasks] = useState("");

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      completed: false,
      text,
    };
    setTasks([...tasks, newTask]);
    setNewTasks("");
    Alert.alert("Tarefa foi adicionada", `Você adicionou: ${text}`);
  };

  return (
    <View style={style.erickContainer}>
      <View style={style.mainContainer}>
        <View style={style.marlonContainer}>
          <Text style={style.estiloTitulo}>Minhas Tarefas</Text>
          <Image source={logo} style={style.imageEstilo} />
        </View>

        <View>
          <TextInput
            value={text}
            onChangeText={setNewTasks}
            placeholder="Digitar tarefa"
            style={style.estiloInput}
            placeholderTextColor={"white"}
          />

          <Pressable
            onPress={addTask}
            style={({ pressed }) => [
              style.Pressionar,
              {
                backgroundColor: pressed ? "rgb(13, 103, 212)" : Colors.primary,
              },
            ]}
          >
            {({ pressed }) => (
              <Text
                style={[
                  style.textInput,
                  {
                    color: pressed ? "yellow" : "white",
                    fontWeight: pressed ? "bold" : 500,
                  },
                ]}
              >
                Adicionar
              </Text>
            )}
          </Pressable>
        </View>
      </View>
      <FlatList style = {style.listaAtividades}
        data={tasks}
        renderItem={({ item }) => (
          <Task text={item.text} initialCompleted={item.completed} />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  erickContainer: {
    backgroundColor: "#8A8383",
    flex: 1,
  },
  mainContainer: {
    marginTop: 100,
    marginHorizontal: 15,
  },
  imageEstilo: {
    width: 50,
    height: 50,
  },
  marlonContainer: {
    alignContent: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    backgroundColor: Colors.corDeFundo,
    // propriedade: deOndeVCImporta.OqueVCImporta
    padding: 10,
    borderRadius: 40,
  },
  estiloTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.corDoTitulo,
  },
  estiloInput: {
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
    padding: 15,
    color: "white",
  },
  Pressionar: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    color: "white",
    fontSize: 18,
  },
  listaAtividades:{
    width: 'auto',
    padding: 15,
  },
});
