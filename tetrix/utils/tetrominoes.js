/**
 * DEFINIÇÃO DAS PEÇAS TETROMINOS
 *
 * Este arquivo define todas as 7 peças clássicas do Tetris,
 * suas formas (matrizes) e cores características.
 * Cada peça é representada por uma matriz onde 1 = bloco e 0 = vazio.
 */

// Constantes para tamanhos padrão
export const PIECE_SIZE_ROWS = 4;
export const PIECE_SIZE_COLS = 4;

/**
 * PEÇA I - LINHA RETA
 * Forma: linha horizontal de 4 blocos
 * Cor: Ciano claro
 */
const I = {
  name: "I",
  matrix: [
    [0, 0, 0, 0],
    [1, 1, 1, 1], // Linha horizontal
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  color: "#00f0f0", // Ciano
};

/**
 * PEÇA J - FORMATO "J"
 * Forma: L invertido
 * Cor: Azul
 */
const J = {
  name: "J",
  matrix: [
    [1, 0, 0], // Braço superior esquerdo
    [1, 1, 1], // Base horizontal
    [0, 0, 0],
  ],
  color: "#0000f0", // Azul
};

/**
 * PEÇA L - FORMATO "L"
 * Forma: L normal
 * Cor: Laranja
 */
const L = {
  name: "L",
  matrix: [
    [0, 0, 1], // Braço superior direito
    [1, 1, 1], // Base horizontal
    [0, 0, 0],
  ],
  color: "#f0a000", // Laranja
};

/**
 * PEÇA O - QUADRADO
 * Forma: quadrado 2x2
 * Cor: Amarelo
 */
const O = {
  name: "O",
  matrix: [
    [0, 1, 1, 0],
    [0, 1, 1, 0], // Quadrado 2x2 centralizado
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  color: "#f0f000", // Amarelo
};

/**
 * PEÇA S - FORMATO "S"
 * Forma: zigue-zague (S)
 * Cor: Verde
 */
const S = {
  name: "S",
  matrix: [
    [0, 1, 1], // Parte superior direita
    [1, 1, 0], // Parte inferior esquerda
    [0, 0, 0],
  ],
  color: "#00f000", // Verde
};

/**
 * PEÇA T - FORMATO "T"
 * Forma: T invertido
 * Cor: Roxo
 */
const T = {
  name: "T",
  matrix: [
    [0, 1, 0], // Haste superior
    [1, 1, 1], // Base horizontal
    [0, 0, 0],
  ],
  color: "#a000f0", // Roxo
};

/**
 * PEÇA Z - FORMATO "Z"
 * Forma: zigue-zague (Z)
 * Cor: Vermelho
 */
const Z = {
  name: "Z",
  matrix: [
    [1, 1, 0], // Parte superior esquerda
    [0, 1, 1], // Parte inferior direita
    [0, 0, 0],
  ],
  color: "#f00000", // Vermelho
};

// Array com todas as peças disponíveis
const PIECES = [I, J, L, O, S, T, Z];

/**
 * GERAR PEÇA ALEATÓRIA
 * Seleciona uma peça aleatória do conjunto de tetrominós
 * @returns {Object} Objeto da peça com matriz, cor, nome e posição inicial
 */
export function randomPiece() {
  // Escolhe peça aleatória
  const p = PIECES[Math.floor(Math.random() * PIECES.length)];

  // Clona profundamente a matriz para evitar mutações
  const matrix = p.matrix.map((row) => row.slice());

  // Retorna objeto da peça (posição será definida no spawnPiece)
  return {
    matrix,
    color: p.color,
    name: p.name,
    x: 0,
    y: 0,
  };
}