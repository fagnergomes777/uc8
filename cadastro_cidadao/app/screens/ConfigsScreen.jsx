import React from "react";
import {View, Text, Switch} from "react-native"
import styles from "../../styles/configsStyles"

export default function ConfigsScreen(){
    const [notifications, setNotifications] = React.useState(true);
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Configurações</Text>
            <View style={styles.row}>
                <Text>Habilitar Notificações (exemplo)</Text>
                <Switch value={notifications} onValueChange={setNotifications}/>
            </View>
            <Text style={{marginTop: 16}}>
                Outras funções do app podem ficar aqui.
            </Text>
        </View>
    )
}