import {View} from "react-native";
import {Link} from "expo-router";
import {styles} from '../styles/styles'

export default function Settings() {
    return (

        <View style={[styles.container, {backgroundColor: '#d3d3'}]}>
            <Link push style={styles.textPadrao} href=' /'>Ir para Home</Link>
            <Link style={styles.textPadrao} href=' /user'>Ir para Usuários</Link>
            <Link push href='/asdmalk'>Página de erro</Link>
        </View>
    )
}
