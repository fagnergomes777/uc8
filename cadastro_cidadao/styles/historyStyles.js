import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.pale,
  },
  itemContainer: {
    position: "relative",
    marginVertical: 4,
  },
  item: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    elevation: 3,
    position: "relative",
    zIndex: 1,
  },
  name: {
    fontWeight: "700",
    color: COLORS.darkText,
  },
  small: {
    color: "#375a45",
    marginTop: 4,
    fontSize: 12,
  },
  actionsBackground: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 12,
    zIndex: 0,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#057a44",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },

  rightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
});
