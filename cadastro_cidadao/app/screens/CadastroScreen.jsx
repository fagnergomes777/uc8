import { ScrollView } from "react-native-gesture-handler";
import CitizenForm from "../../components/CitizenForm";
import styles from "../../styles/cadastroStyles";

export default function CadastroScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <CitizenForm/>
        </ScrollView>
    )
}