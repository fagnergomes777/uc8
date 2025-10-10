import { View, Text, Linking } from "react-native";
import styles from "../../styles/configsStyles";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o Aplicativo</Text>
      <Text style={{ marginTop: 8 }}>
        Aplicativo de cadastro de cidadão. Tecnologias usadas: Expo, React
        Native(jsx), axios, SQLite.
      </Text>

      <Text style={{ marginTop: 8, color: "blue" }}
        onPress={()=> Linking.openURL("https://viacep.com.br")}
      >
       API viacep usada para busca de endereço
      </Text>
    </View>
  );
}
