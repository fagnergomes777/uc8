import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.darktext,
  },
  row: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
