import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#0b132b",
        padding: 16,
        paddingTop: 48,
    },

    title:{
        color: "#fff",
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 16,
    },

    input:{
        backgroundColor: "#1c2541",
        color: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        marginBottom: 12,
    },

    button:{
        backgroundColor: "#3a86ff",
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },

    buttonText:{
        color: "#fff",
        fontWeight: "700",

    },

    row:{
        flexDirection: "row",
        alignItems: "center",
    },

    card:{
        backgroundColor: "#1c2541",
        borderRadius: 12,
        padding: 12,
    },

    cardText:{
        color: "#fff",
        fontSize: 16,
    },

    muted:{
        color: "#cbd5e1",
        textAlign: "center",
        marginTop: 12,
    },

    actions:{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 12,
    },

    secondary:{
        backgroundColor: "#415a77",
    },

    footer:{
        color: "#cbd5e1",
        marginTop: 12,
        fontSize: 12,
    },
})