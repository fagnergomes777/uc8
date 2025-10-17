

export const PIECE_SIZE_ROWS = 4;
export const PIECE_SIZE_COLS = 4;

const I = {
    name: "I",
    matrix: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    color: "#00f0f0",
}

const J = {
    name: "J",
    matrix: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    color: "#0000f0",
}

const L = {
    name: "L",
    matrix: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    color: "#f0a000",
}

const O = {
    name: "O",
    matrix: [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    color: "#f0f000",
}

const S = {
    name: "S",
    matrix: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    color: "#00f000",
}

const T = {
    name: "T",
    matrix: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    color: "#A000F0",
}

const Z = {
    name: "Z",
    matrix: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    color: "#F00",
}

const PIECE = [I, J, L, O, S, T, Z];

/**
 * @return {Object}
 */

export function randomPiece() {
    const p = PIECE[Math.floor(Math.random() * PIECE.length)];

    const matrix = p.matrix.map((row) => row.slice());

    return {
        matrix,
        color: p.color,
        name: p.name,
        x: 0,
        y: 0,
    }
}