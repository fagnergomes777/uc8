import { Text, View, Image } from "react-native"
import { styles }  from "../styles/styles"

export default function Perfil() {
    return(
        <View style={styles.containerPerfil}>
            <Image source={require('../assets/sololeveling2.jpg')} style={styles.avatar}/>

            <Text style={styles.nomeUsuario}>Fagner Gomes</Text>

            <Text style={styles.descricaoUsuario} >Aluno do SENAC TDS</Text>3

            <View style={styles.divisor} />

            <View/>
        </View>
    )
}