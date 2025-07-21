import { View } from "react-native";
import { Link } from "expo-router";
import { styles } from '../styles/styles';


export default function Home() {
    return (

        <View style={[styles.container, {backgroundColor: '#d3d3d3'}]}>
            <Link style={styles.textPadrao} href=' /settings'>Ir para configurações</Link>
            <Link push style={styles.textPadrao} href=' /products'>Ir para produtos</Link>
        </View>
    )
}
