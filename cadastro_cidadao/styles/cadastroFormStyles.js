import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export default StyleSheet.create({
  form: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  label: {
    marginTop: 1,
    marginBottom: 4,
    color: COLORS.darkText,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: COLORS.strong,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#063E1F",
    fontWeight: "700",
  },
});
