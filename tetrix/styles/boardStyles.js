import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Consistência com gameStyles.js
const isTablet = width > 768;
const BOARD_WIDTH_RATIO = isTablet ? 0.45 : 0.65;

const availableWidth = width * BOARD_WIDTH_RATIO;
const availableHeight = height * 0.6;
const CELL_SIZE = Math.min(availableWidth / 10, availableHeight / 20);
const CELL_SMALL = CELL_SIZE * 0.45; // Para o preview da próxima peça

export const styles = StyleSheet.create({
  board: {
    backgroundColor: "#0f1923",
    padding: isTablet ? 6 : 4,
    borderRadius: 8,
    borderColor: "#2a3441",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  smallBoard: {
    padding: isTablet ? 8 : 6,
    backgroundColor: "#1a1f2e",
    borderColor: "#3a4553",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: 0.5,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#2a3441",
  },
  cellSmall: {
    width: CELL_SMALL,
    height: CELL_SMALL,
    margin: 0.5,
    borderRadius: 1,
  },
});

// Exportar constantes para uso em outros componentes
export { CELL_SIZE, CELL_SMALL };