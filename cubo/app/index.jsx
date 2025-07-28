import {View, Text, StyleSheet} from 'react-native'
import DraggbleSquare from '../components/DraggbleSquare'

export default function HomeScreen(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Arraste o quadrado abaixo</Text>
            <DraggbleSquare/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    title:{
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    }
})