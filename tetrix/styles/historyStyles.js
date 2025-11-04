import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isTablet = width > 768;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f1a",
    paddingTop: isTablet ? 48 : 36,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: isTablet ? 20 : 12,
    paddingVertical: isTablet ? 16 : 12,
    marginBottom: isTablet ? 12 : 8,
    backgroundColor: "#1a1f2e",
    borderBottomWidth: 1,
    borderBottomColor: "#2a3441",
  },
  title: {
    color: "#fff",
    fontSize: isTablet ? 24 : 20,
    fontWeight: "700",
  },
  btnBack: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#3a4553",
    borderRadius: 8,
  },
  btnClear: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#e74c3c",
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontSize: isTablet ? 16 : 14,
    fontWeight: "600",
  },
  scrollContainer: {
    paddingHorizontal: isTablet ? 20 : 12,
  },
  row: {
    padding: isTablet ? 16 : 12,
    backgroundColor: "#1a1f2e",
    borderRadius: 12,
    marginBottom: isTablet ? 12 : 10,
    borderWidth: 1,
    borderColor: "#2a3441",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  date: {
    color: "#eaf6ff",
    fontSize: isTablet ? 16 : 14,
    fontWeight: "700",
  },
  meta: {
    color: "#b8d9ea",
    marginTop: isTablet ? 6 : 4,
    fontSize: isTablet ? 14 : 12,
  },
  empty: {
    color: "#99aebf",
    textAlign: "center",
    marginTop: isTablet ? 40 : 30,
    fontSize: isTablet ? 18 : 16,
  },
});