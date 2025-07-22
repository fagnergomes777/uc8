
import {Text, View} from 'react-native'
import { Link } from 'expo-router'

export default function Home(){
    return(
        <View>
            <Text>Tela Inicial</Text>
             <Link href='/products/roupas'>Ir para roupas</Link>
        </View>
    )
}