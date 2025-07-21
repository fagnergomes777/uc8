import {View, Text} from 'react-native'
import {Link} from 'expo-router'
import {styles} from '../styles/styles'


export default function NotFound(){
    return(
        <View style={[styles.container, {backgroundColor: 'purple'}]}>
            <Text style={styles.textPadrao}>Ops página não encontrada</Text>
            <Link replace href='/' style={styles.textPadrao}>Voltar para home</Link>
        </View>
    )
}