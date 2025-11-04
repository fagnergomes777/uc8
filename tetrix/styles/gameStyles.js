import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Cálculo responsivo para diferentes tamanhos de tela
const isTablet = width > 768;
const BOARD_WIDTH_RATIO = isTablet ? 0.45 : 0.65;
const SIDE_WIDTH_RATIO = isTablet ? 0.35 : 0.3;

// Tamanho do tabuleiro baseado na menor dimensão para manter proporção
const availableWidth = width * BOARD_WIDTH_RATIO;
const availableHeight = height * 0.6; // 60% da altura para o tabuleiro
const CELL_SIZE = Math.min(availableWidth / 10, availableHeight / 20);

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f1a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#1a1f2e",
    borderBottomWidth: 1,
    borderBottomColor: "#2a3441",
  },
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#3a4553",
    borderRadius: 8,
    minWidth: 60,
    alignItems: "center",
  },
  headerButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headerInfo: {
    fontSize: isTablet ? 16 : 14,
    color: "#a0aabf",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  boardContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  side: {
    marginLeft: isTablet ? 24 : 16,
    justifyContent: "flex-start",
    alignItems: "center",
    width: width * SIDE_WIDTH_RATIO,
    paddingVertical: 8,
  },
  sideText: {
    fontSize: isTablet ? 16 : 14,
    marginVertical: 8,
    color: "#a0aabf",
    textAlign: "center",
    fontWeight: "500",
  },
  nextPieceContainer: {
    backgroundColor: "#1a1f2e",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#2a3441",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#1a1f2e",
    borderTopWidth: 1,
    borderTopColor: "#2a3441",
  },
  controlBtn: {
    paddingVertical: isTablet ? 16 : 14,
    paddingHorizontal: isTablet ? 24 : 20,
    backgroundColor: "#3a4553",
    borderRadius: 12,
    minWidth: isTablet ? 70 : 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropBtn: {
    backgroundColor: "#e74c3c",
  },
  controlTxt: {
    fontSize: isTablet ? 24 : 20,
    color: "#fff",
    fontWeight: "bold",
  },
});

// Exportar constantes para uso em outros componentes
export { CELL_SIZE };