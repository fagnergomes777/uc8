import { StyleSheet } from "react-native";

/**
 * @param {object} theme
 * @param {number} fontScale
 * @param {boolean} bigTargets
 */

export const makeGlobalStyles = ({ theme, fontScale, bigTargets }) => {
  const base = 16 * fontScale; // Tamanho base da fonte
  const padding = bigTargets ? 16 : 10; // Padding adaptativo
  const radius = 16; // Raio padrão

  return StyleSheet.create({
    app: {
      flex: 1,
      backgroundColor: theme.background,
    },

    header: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerTitle: {
      fontSize: base * 1.1,
      fontWeight: "700",
      color: "theme.text",
    },

    tabBar: {
      flexDirection: "row",
      gap: 8,
      padding: 8,
      backgroundColor: theme.card,
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
    },
    tabBtn: {
      flex: 1,
      paddingVertical: padding,
      paddingHorizontal: 12,
      borderRadius: radius,
      alignItems: "center",
      borderWidth: 2,
      borderColor: "transparent",
    },
    tabBtnActive: {
      backgroundColor: theme.primary + "22",
      borderColor: theme.primary,
    },
    tabBtnText: {
      fontSize: base * 0.95,
      fontWeight: "700",
      color: "theme.text",
    },
    lockNowBtn: {
      paddingVertical: padding,
      paddingHorizontal: 12,
      blackgroundColor: theme.danger,
      borderRadius: radius,
    },
    lockNowText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: base * 0.9,
    },
    content: {
      flex: 1,
      padding: 16,
    },
  });
};
