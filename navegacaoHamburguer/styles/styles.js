import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // ESTILO DO HOME
    containerHome:{
        flex: 1,
        backgroundColor: '#fefefe',
        alignItems: 'center',
        justifyContent:'center',
        paddingHorizontal:20
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        color: "#e94560"
    },
    subtitulo: {
        fontSize: 16,
        marginBottom: 24,
        color: "#555"
    },
    avatar: {
        width:120,
        height: 120,
        borderRadius: 100,
        marginBottom: 20
    },

    //ESTILO DO PERFIL

    containerPerfil:{
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
        backgroundColor: '#f5f6fa'
    },
    nomeUsuario:{
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#222'
    },
    descricaoUsuario:{
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#666',
        textAlign: 'center'
    },
    divisor:{
        height: 1,
        backgroundColor: '#ccc',
        width: '80%',
        marginVertical: 30,
    }

})