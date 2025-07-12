import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    formContainer:{
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    form:{
        width: '100%',
        height: 'auto',
        marginTop: '30',
        padding: 10,
    },
    label:{
        color: '#000',
        fontSize:18,
        paddingLeft:20,
    },
    input:{
        width: '90%',
        backgroundColor: "#f6f6f6",
        height: 40,
        margin: 12,
        paddingLeft: 10,
        borderRadius: 50,
    },
    buttonCalculator:{
        width: '90%',
        borderRadius: 50,
        backgroundColor: '#ff0043',
        padding: 14,
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 30,
        marginLeft: 12,
    },
    buttonCalculatorText:{
        fontSize: 20,
        color: '#fff',
    }

})

export default styles;