/**
 * COMPONENTE BOARD (TABULEIRO)
 *
 * Renderiza o tabuleiro do jogo como uma grade de células.
 * Pode ser usado tanto para o tabuleiro principal quanto para
 * a preview da próxima peça (versão pequena).
 */

import React from "react";
import { View } from "react-native";
import Cell from "./Cell";
import { styles } from "../styles/boardStyles";

/**
 * @param {Array} grid - Matriz bidimensional representando o tabuleiro
 *                       Cada célula pode ser 0 (vazia) ou string (cor da peça)
 * @param {boolean} small - Se true, renderiza em tamanho pequeno (para preview)
 */
export default function Board({ grid, small = false }) {
  return (
    <View style={[styles.board, small ? styles.smallBoard : null]}>
      {/* Mapeia cada linha do grid */}
      {grid.map((row, rIdx) => (
        <View key={`r${rIdx}`} style={styles.row}>
          {/* Mapeia cada célula da linha */}
          {row.map((cell, cIdx) => (
            <Cell
              key={`${rIdx}-${cIdx}`}
              color={cell} // Cor da célula (0 se vazia, cor se ocupada)
              small={small} // Tamanho pequeno para preview
            />
          ))}
        </View>
      ))}
    </View>
  );
}