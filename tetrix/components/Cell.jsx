/**
 * COMPONENTE CELL (CÉLULA)
 *
 * Representa uma única célula do tabuleiro.
 * Pode estar vazia (transparente com borda) ou ocupada (com cor da peça).
 */

import React from "react";
import { View } from "react-native";
import { styles } from "../styles/boardStyles";

/**
 * @param {string|number} color - Cor da célula (string de cor ou 0 se vazia)
 * @param {boolean} small - Se true, usa tamanho pequeno (para preview)
 */
export default function Cell({ color, small = false }) {
  // Combina estilos baseado no estado da célula
  const style = [
    styles.cell, // Estilo base da célula
    small ? styles.cellSmall : null, // Tamanho pequeno se necessário
    color
      ? { backgroundColor: color } // Se ocupada: cor da peça
      : {
          // Se vazia: transparente com borda
          backgroundColor: "transparent",
          borderWidth: 0.6,
          borderColor: "#122233",
        },
  ];

  return <View style={style} />;
}