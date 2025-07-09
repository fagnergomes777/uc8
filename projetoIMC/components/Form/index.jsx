import { View, Text, TextInput, Pressable } from 'react-native';
import styles from './style';


export default function Form() {
    return(
        <View style={styles.form}>
            <Text style={styles.label}>Altura (m)</Text>
            <TextInput style={styles.input} placeholder='Ex. 1.75' keyboardType='numeric'/>

            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput style={styles.input} placeholder='Ex. 80' keyboardType='numeric'/>

            <Pressable style={styles.buttonCalculator}>
                <Text style={styles.buttonCalculatorText}>Calcular</Text>
            </Pressable>
        </View>
    )
}