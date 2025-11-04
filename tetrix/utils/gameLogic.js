/**
 * LÓGICA PRINCIPAL DO JOGO TETRIX
 *
 * Este arquivo contém todas as funções essenciais para o funcionamento
 * do jogo Tetris: criação de grid, movimento de peças, rotação,
 * detecção de colisões e eliminação de linhas.
 */

import { randomPiece } from "./tetrominoes";

/**
 * CRIAR GRID VAZIO
 * Cria uma matriz bidimensional preenchida com zeros
 * @param {number} rows - Número de linhas
 * @param {number} cols - Número de colunas
 * @returns {Array} Matriz bidimensional
 */
export function createGrid(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

/**
 * VERIFICAR SE PEÇA PODE SE MOVER
 * Verifica se uma peça pode se mover para uma nova posição
 * sem colidir com bordas ou outras peças
 * @param {Array} grid - Tabuleiro atual
 * @param {Object} piece - Peça a ser movida
 * @param {number} dx - Deslocamento horizontal
 * @param {number} dy - Deslocamento vertical
 * @returns {boolean} True se movimento é válido
 */
export function canMove(grid, piece, dx, dy) {
  const rows = grid.length;
  const cols = grid[0].length;
  const { matrix, x, y } = piece;

  // Verifica cada bloco da peça
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c]) {
        // Se há bloco nesta posição
        const newY = y + r + dy; // Nova posição Y
        const newX = x + c + dx; // Nova posição X

        // Verificações de colisão:
        if (newX < 0 || newX >= cols) return false; // Borda lateral
        if (newY >= rows) return false; // Borda inferior
        if (newY >= 0 && grid[newY][newX]) return false; // Colisão com peça
      }
    }
  }
  return true; // Movimento válido
}

/**
 * MESCLAR PEÇA COM O TABULEIRO
 * Adiciona a peça atual permanentemente ao grid
 * @param {Array} grid - Tabuleiro atual
 * @param {Object} piece - Peça a ser adicionada
 * @returns {Array} Novo grid com a peça mesclada
 */
export function mergePiece(grid, piece) {
  const copy = grid.map((row) => row.slice()); // Cópia do grid
  const { matrix, x, y, color } = piece;

  // Adiciona cada bloco da peça ao grid
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c]) {
        // Se há bloco
        const gy = y + r; // Posição Y no grid
        const gx = x + c; // Posição X no grid

        // Verifica limites e adiciona cor
        if (gy >= 0 && gy < copy.length && gx >= 0 && gx < copy[0].length) {
          copy[gy][gx] = color;
        }
      }
    }
  }
  return copy;
}

/**
 * ROTACIONAR PEÇA 90 GRAUS HORÁRIO
 * Algoritmo avançado que funciona com peças de qualquer tamanho
 * @param {Object} piece - Peça a ser rotacionada
 * @returns {Object} Nova peça rotacionada
 */
export function rotatePiece(piece) {
  const matrix = piece.matrix;
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Para matrizes não quadradas, criar matriz quadrada temporária
  const size = Math.max(rows, cols);
  const tempMatrix = Array.from({ length: size }, () => Array(size).fill(0));

  // Copiar matriz original para o centro da matriz temporária
  const offsetY = Math.floor((size - rows) / 2);
  const offsetX = Math.floor((size - cols) / 2);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      tempMatrix[r + offsetY][c + offsetX] = matrix[r][c] || 0;
    }
  }

  // Rotacionar matriz temporária 90 graus horário
  // Fórmula: nova_posição[c][size-1-r] = original[r][c]
  const rotated = Array.from({ length: size }, () => Array(size).fill(0));
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      rotated[c][size - 1 - r] = tempMatrix[r][c];
    }
  }

  // Encontrar bounding box da peça rotacionada para extrair matriz mínima
  let minRow = size,
    maxRow = -1,
    minCol = size,
    maxCol = -1;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (rotated[r][c]) {
        minRow = Math.min(minRow, r);
        maxRow = Math.max(maxRow, r);
        minCol = Math.min(minCol, c);
        maxCol = Math.max(maxCol, c);
      }
    }
  }

  // Se não há blocos, retornar matriz original
  if (minRow === size) {
    return { ...piece };
  }

  // Extrair apenas a parte necessária (remove espaços vazios)
  const finalRows = maxRow - minRow + 1;
  const finalCols = maxCol - minCol + 1;
  const finalMatrix = Array.from({ length: finalRows }, () =>
    Array(finalCols).fill(0)
  );

  // Copia apenas a área ocupada da matriz rotacionada
  for (let r = 0; r < finalRows; r++) {
    for (let c = 0; c < finalCols; c++) {
      finalMatrix[r][c] = rotated[minRow + r][minCol + c];
    }
  }

  return { ...piece, matrix: finalMatrix };
}

/**
 * ELIMINAR LINHAS COMPLETAS
 * Remove linhas que estão completamente preenchidas
 * e adiciona novas linhas vazias no topo
 * @param {Array} grid - Tabuleiro atual
 * @returns {Object} {newGrid, linesCleared} - Novo grid e número de linhas eliminadas
 */
export function clearLines(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = [];
  let cleared = 0;

  // Verifica cada linha do grid
  for (let r = 0; r < rows; r++) {
    // Se linha está completamente preenchida (sem zeros)
    if (grid[r].every((cell) => cell !== 0)) {
      cleared++; // Conta linha eliminada
    } else {
      newGrid.push(grid[r]); // Mantém linha incompleta
    }
  }

  // Adiciona linhas vazias no topo para manter tamanho original
  while (newGrid.length < rows) {
    newGrid.unshift(Array(cols).fill(0)); // Adiciona no início
  }

  return { newGrid, linesCleared: cleared };
}

// Re-exporta função de peça aleatória
export { randomPiece };