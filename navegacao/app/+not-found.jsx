import {View, Text} from 'react-native'
import {Link} from 'expo-router'
import {styles} from '../styles/styles'

export default function NotFound(){
    return(
        <View style={[styles.container,{backgroundColor: '#f3f3' }]}> 
        <Text style={styles.TextPadrao}>Ops página não encontrada</Text>
        <Link href='/'>Voltar para home</Link>
        </View>
    )
}