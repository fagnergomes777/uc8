import { Pressable, Text, View, StyleSheet } from "react-native";
import { styles } from "../../styles/styles";
import { Link, router } from "expo-router";


export default function Products() {

    const goToHome = () => {
        router.navigate('/')
    }


  return (
    <>
      <View style={[styles.container, { backgroundColor: "#12abf7" }]}>
        <Text>Products Screen</Text>

        <Link push href="/products/1">
          Produto 1
        </Link>
        <Link push href="/products/2">
          Produto 2
        </Link>
        <Link push href="/products/3">
          Produto 3
        </Link>
        <Pressable onPress={goToHome} style={style.botaoVoltar}>
          <Text style={style.textBotaoVoltar}>Inicio</Text>
        </Pressable>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  botaoVoltar: {
    backgroundColor: "#fff",
    padding: 15,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginTop: 15,
  },
  textBotaoVoltar:{
    fontSize: 25,
  }
});
