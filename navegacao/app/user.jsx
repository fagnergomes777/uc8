import {View} from "react-native";
import {Link} from "expo-router";
import {styles} from '../styles/styles'

export default function Settings() {
    return (

        <View style={[styles.container, {backgroundColor: '#fa43'}]}>
            <Link style={styles.textPadrao} href=' /'>Ir para Home</Link>
            <Link style={styles.textPadrao} href=' /settings'>Ir para Settings</Link>
        </View>
    )
}