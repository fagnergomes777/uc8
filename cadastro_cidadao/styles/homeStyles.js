import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "./colors";
const { width } = Dimensions.get("window");
const blockSize = (width - 64) / 2;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.pale,
        alignItems: "center",
        padding: 16
    },
    title: {
        fontSize: 22,
        color: COLORS.darkText,
        marginVertical: 12,
        fontWeight: "700",
    },
    grid: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 16
    },
    block: {
        width: blockSize,
        height: blockSize,
        borderRadius: 12,
        marginBottom: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.08,
        shadowOffset: {width: 0, height: 4},
        elevation: 4
    },
    blockText: {
        maginTop: 8,
        color: "#064E2E",
        fontWeight: "600",
    },
});
