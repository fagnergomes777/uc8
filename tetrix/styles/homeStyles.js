import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isTablet = width > 768;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f1a",
    alignItems: "center",
    justifyContent: "center",
    padding: isTablet ? 40 : 20,
  },
  title: {
    fontSize: isTablet ? 64 : 48,
    color: "#fff",
    fontWeight: "700",
    marginBottom: isTablet ? 60 : 40,
    textAlign: "center",
    textShadowColor: "#1f8ef1",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  button: {
    backgroundColor: "#1f8ef1",
    paddingVertical: isTablet ? 18 : 14,
    paddingHorizontal: isTablet ? 40 : 30,
    borderRadius: 12,
    marginBottom: isTablet ? 16 : 12,
    minWidth: isTablet ? 280 : 220,
    alignItems: "center",
    shadowColor: "#1f8ef1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  secondary: {
    backgroundColor: "#28a745",
    shadowColor: "#28a745",
  },
  buttonText: {
    color: "#fff",
    fontSize: isTablet ? 20 : 18,
    fontWeight: "600",
  },
  small: {
    color: "#9aa4b2",
    marginTop: isTablet ? 40 : 30,
    textAlign: "center",
    fontSize: isTablet ? 16 : 14,
  },
});