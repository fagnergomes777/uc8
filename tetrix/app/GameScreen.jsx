/**
 * TETRIX - TELA PRINCIPAL DO JOGO
 *
 * Este arquivo contém toda a lógica principal do jogo Tetrix (Tetris).
 * Gerencia o estado do jogo, movimento das peças, pontuação e game over.
 */

// Importações necessárias do React Native e bibliotecas
import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para salvar histórico
import Board from "../components/Board"; // Componente do tabuleiro
import styles from "../styles/gameStyles"; // Estilos da tela
import {
  randomPiece, // Gera peça aleatória
  createGrid, // Cria grid vazio
  mergePiece, // Mescla peça com o tabuleiro
  canMove, // Verifica se peça pode se mover
  rotatePiece, // Rotaciona peça
  clearLines, // Remove linhas completas
} from "../utils/gameLogic";

// Constantes do jogo - Dimensões padrão do Tetris
const GRID_COLS = 10; // 10 colunas no tabuleiro
const GRID_ROWS = 20; // 20 linhas no tabuleiro

/**
 * COMPONENTE PRINCIPAL DA TELA DO JOGO
 * Recebe navigation como prop para navegação entre telas
 */
export default function GameScreen({ navigation }) {
  // === ESTADOS DO JOGO ===

  // Tabuleiro principal - matriz 20x10 com as peças fixadas
  const [grid, setGrid] = useState(() => createGrid(GRID_ROWS, GRID_COLS));

  // Peça ativa atual (que está caindo)
  const [active, setActive] = useState(null);

  // Próxima peça a ser jogada (mostrada na preview)
  const [next, setNext] = useState(() => randomPiece());

  // Pontuação do jogador
  const [score, setScore] = useState(0);

  // Nível atual (aumenta com linhas eliminadas)
  const [level, setLevel] = useState(1);

  // Se o jogo está em execução (pause/play)
  const [isRunning, setIsRunning] = useState(false);

  // Se o jogo terminou
  const [gameOver, setGameOver] = useState(false);

  // Intervalo de queda das peças (diminui com o nível)
  const [dropInterval, setDropInterval] = useState(700);

  // Referência para o timer de queda automática
  const dropRef = useRef(null);

  // === FUNÇÕES PRINCIPAIS DO JOGO ===

  /**
   * FUNÇÃO PARA CRIAR NOVA PEÇA
   * - Usa useCallback para evitar re-renderizações desnecessárias
   * - Posiciona a nova peça no centro do topo do tabuleiro
   * - Verifica se a posição inicial está livre (se não, é game over)
   */
  const spawnPiece = useCallback(() => {
    if (gameOver) return; // Não spawna se o jogo acabou

    setActive((currentActive) => {
      if (currentActive) return currentActive; // Já existe uma peça ativa

      setNext((currentNext) => {
        const piece = currentNext; // Pega a próxima peça

        // Calcula posição X central baseada na largura da peça
        const startX =
          Math.floor(GRID_COLS / 2) - Math.floor(piece.matrix[0].length / 2);
        const startY = 0; // Sempre começa no topo

        const newActive = { ...piece, x: startX, y: startY };

        // Verifica se a posição inicial está ocupada
        setGrid((currentGrid) => {
          if (!canMove(currentGrid, newActive, 0, 0)) {
            // Game Over - posição ocupada
            setTimeout(() => onGameOver(), 100);
            return currentGrid;
          }
          return currentGrid;
        });

        // Define a nova peça ativa após pequeno delay
        setTimeout(() => setActive(newActive), 50);

        // Gera nova peça para a próxima
        return randomPiece();
      });

      return currentActive;
    });
  }, [gameOver, onGameOver]);

  // === EFEITOS (HOOKS) ===

  /**
   * EFEITO PARA INICIALIZAR JOGO
   * - Spawna primeira peça quando o jogo inicia
   * - Só executa quando não há peça ativa e o jogo está rodando
   */
  useEffect(() => {
    if (!gameOver && !active && isRunning) {
      spawnPiece();
    }
  }, [spawnPiece, active, isRunning, gameOver]);

  /**
   * EFEITO PARA CONTROLAR VELOCIDADE
   * - Aumenta velocidade conforme o nível sobe
   * - Velocidade mínima é 100ms entre quedas
   */
  useEffect(() => {
    setDropInterval(Math.max(100, 700 - (level - 1) * 50));
  }, [level]);

  /**
   * EFEITO PRINCIPAL - TIMER DE QUEDA AUTOMÁTICA
   * - Gerencia o timer que faz as peças caírem automaticamente
   * - Para o timer quando o jogo está pausado, acabou ou não há peça ativa
   * - Reinicia o timer quando as condições mudam
   */
  useEffect(() => {
    // Para o timer se não estiver rodando, game over ou sem peça ativa
    if (!isRunning || gameOver || !active) {
      if (dropRef.current) {
        clearInterval(dropRef.current);
        dropRef.current = null;
      }
      return;
    }

    // Inicia timer de queda automática
    dropRef.current = setInterval(handleDrop, dropInterval);

    // Cleanup - remove timer quando componente é atualizado
    return () => {
      if (dropRef.current) {
        clearInterval(dropRef.current);
        dropRef.current = null;
      }
    };
  }, [isRunning, dropInterval, gameOver, active, handleDrop]);

  /**
   * EFEITO DE CLEANUP
   * - Remove timer quando componente é desmontado
   * - Evita memory leaks
   */
  useEffect(() => {
    return () => {
      if (dropRef.current) {
        clearInterval(dropRef.current);
      }
    };
  }, []);

  /**
   * FUNÇÃO DE QUEDA AUTOMÁTICA
   * - Chamada pelo timer a cada intervalo definido
   * - Move a peça uma posição para baixo
   * - Quando não pode mais descer, fixa a peça no tabuleiro
   */
  const handleDrop = useCallback(() => {
    if (!active || gameOver) return; // Não faz nada se não há peça ou jogo acabou

    setActive((currentActive) => {
      if (!currentActive) return null;

      // Verifica se pode descer mais uma posição
      if (canMove(grid, currentActive, 0, 1)) {
        // Move peça para baixo
        return { ...currentActive, y: currentActive.y + 1 };
      } else {
        // Peça não pode mais descer - fixa no tabuleiro

        // Mescla peça atual com o grid
        const merged = mergePiece(grid, currentActive);

        // Remove linhas completas e conta quantas foram removidas
        const { newGrid, linesCleared } = clearLines(merged);

        // Atualiza pontuação e nível baseado nas linhas eliminadas
        if (linesCleared > 0) {
          setScore((prev) => prev + linesCleared * 100 * level); // Mais pontos em níveis altos
          setLevel((prev) => prev + Math.floor(linesCleared / 4)); // Nível aumenta a cada 4 linhas
        }

        // Atualiza o tabuleiro
        setGrid(newGrid);

        // Remove peça ativa (próxima será spawnada pelo useEffect)
        setTimeout(() => {
          setActive(null);
        }, 0);

        return null;
      }
    });
  }, [active, grid, gameOver, level]);

  /**
   * FUNÇÃO DE GAME OVER
   * - Salva resultado no histórico local
   * - Mostra alert com opções para o jogador
   */
  const onGameOver = useCallback(async () => {
    setGameOver(true);
    setIsRunning(false); // Para o jogo

    // Cria registro para o histórico
    const record = {
      date: new Date().toISOString(), // Data/hora do jogo
      score,
      level,
    };

    // Salva no AsyncStorage (armazenamento local)
    try {
      const raw = await AsyncStorage.getItem("@tetrix_history");
      const arr = raw ? JSON.parse(raw) : []; // Array existente ou novo
      arr.unshift(record); // Adiciona no início
      // Mantém apenas os 50 últimos resultados
      await AsyncStorage.setItem(
        "@tetrix_history",
        JSON.stringify(arr.slice(0, 50))
      );
    } catch (e) {
      console.warn("Erro ao salvar histórico", e);
    }

    // Mostra dialog com opções
    Alert.alert("Game Over", `Pontuação: ${score}`, [
      { text: "Voltar", onPress: () => navigation.navigate("Home") },
      { text: "Jogar Novamente", onPress: () => resetGame() },
    ]);
  }, [score, level, navigation]);

  // === FUNÇÕES DE CONTROLE ===

  /**
   * MOVIMENTO HORIZONTAL
   * - Move peça para esquerda (dx=-1) ou direita (dx=1)
   * - Só move se a posição destino estiver livre
   */
  function move(dx) {
    if (!active || gameOver || !isRunning) return; // Verificações de segurança
    if (canMove(grid, active, dx, 0)) {
      setActive((prev) => ({ ...prev, x: prev.x + dx }));
    }
  }

  /**
   * QUEDA RÁPIDA (SOFT DROP)
   * - Move peça uma posição para baixo instantaneamente
   * - Dá pontos extras pelo movimento manual
   */
  function softDrop() {
    if (!active || gameOver || !isRunning) return;
    if (canMove(grid, active, 0, 1)) {
      setActive((prev) => ({ ...prev, y: prev.y + 1 }));
      setScore((prev) => prev + 1); // Ponto extra por queda manual
    }
  }

  /**
   * ROTAÇÃO DA PEÇA
   * - Rotaciona peça 90 graus no sentido horário
   * - Implementa "wall kick" - tenta ajustar posição se rotação bloquear
   */
  function rotate() {
    if (!active || gameOver || !isRunning) return;

    const rotated = rotatePiece(active); // Cria versão rotacionada

    if (canMove(grid, rotated, 0, 0)) {
      // Rotação normal - sem obstáculos
      setActive(rotated);
    } else {
      // Wall kick - tenta ajustar posição
      if (canMove(grid, rotated, -1, 0)) {
        // Tenta mover para esquerda
        setActive({ ...rotated, x: active.x - 1 });
      } else if (canMove(grid, rotated, 1, 0)) {
        // Tenta mover para direita
        setActive({ ...rotated, x: active.x + 1 });
      } else if (canMove(grid, rotated, 0, -1)) {
        // Tenta mover para cima
        setActive({ ...rotated, y: active.y - 1 });
      }
      // Se nenhum ajuste funcionar, rotação é cancelada
    }
  }

  /**
   * REINICIAR JOGO
   * - Reseta todos os estados para valores iniciais
   * - Para timers ativos
   */
  function resetGame() {
    // Para timer ativo
    if (dropRef.current) {
      clearInterval(dropRef.current);
      dropRef.current = null;
    }

    // Reseta todos os estados
    setGrid(createGrid(GRID_ROWS, GRID_COLS)); // Tabuleiro vazio
    setActive(null); // Nenhuma peça ativa
    setScore(0); // Pontuação zerada
    setLevel(1); // Nível inicial
    setNext(randomPiece()); // Nova peça para próxima
    setGameOver(false); // Jogo não acabou
    setIsRunning(true); // Inicia automaticamente
  }

  /**
   * PAUSAR/RETOMAR JOGO
   * - Se game over, reinicia o jogo
   * - Senão, alterna entre pausado e rodando
   */
  function toggleGame() {
    if (gameOver) {
      resetGame(); // Reinicia se acabou
    } else {
      setIsRunning((prev) => !prev); // Alterna pause/play
    }
  }

  // === FUNÇÕES DE RENDERIZAÇÃO ===

  /**
   * RENDERIZAR TABULEIRO COM PEÇA ATIVA
   * - Combina o grid fixo com a peça que está caindo
   * - Retorna matriz completa para exibição
   */
  function renderGridWithActive() {
    // Cria cópia do grid atual
    const copy = grid.map((row) => row.slice());

    // Se há peça ativa, adiciona ela ao grid visual
    if (active) {
      const { matrix, x: px, y: py, color } = active;

      // Percorre cada célula da matriz da peça
      for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[r].length; c++) {
          if (matrix[r][c]) {
            // Se há bloco nesta posição
            const gy = py + r; // Posição Y no grid
            const gx = px + c; // Posição X no grid

            // Verifica se está dentro dos limites do tabuleiro
            if (gy >= 0 && gy < GRID_ROWS && gx >= 0 && gx < GRID_COLS) {
              copy[gy][gx] = color; // Adiciona cor da peça
            }
          }
        }
      }
    }
    return copy; // Retorna grid combinado
  }

  // === INTERFACE DO USUÁRIO (JSX) ===
  return (
    <View style={styles.container}>
      {/* CABEÇALHO - Botões de navegação e informações */}
      <View style={styles.header}>
        {/* Botão Voltar */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>Voltar</Text>
        </TouchableOpacity>

        {/* Botão Pausar/Jogar/Novo Jogo */}
        <TouchableOpacity
          onPress={toggleGame}
          style={[
            styles.headerButton,
            {
              backgroundColor: gameOver
                ? "#28a745" // Verde se game over (Novo Jogo)
                : isRunning
                ? "#e74c3c" // Vermelho se rodando (Pausar)
                : "#28a745", // Verde se pausado (Jogar)
            },
          ]}
        >
          <Text style={styles.headerButtonText}>
            {gameOver ? "Novo Jogo" : isRunning ? "Pausar" : "Jogar"}
          </Text>
        </TouchableOpacity>

        {/* Título do jogo */}
        <Text style={styles.headerTitle}>Tetrix</Text>

        {/* Pontuação atual */}
        <Text style={styles.headerInfo}>Score: {score}</Text>
      </View>

      {/* ÁREA PRINCIPAL - Tabuleiro e informações laterais */}
      <View style={styles.content}>
        {/* Container do tabuleiro principal */}
        <View style={styles.boardContainer}>
          <Board grid={renderGridWithActive()} />
        </View>

        {/* Painel lateral com informações */}
        <View style={styles.side}>
          <Text style={styles.sideText}>Próximo</Text>

          {/* Preview da próxima peça */}
          <View style={styles.nextPieceContainer}>
            <Board
              grid={(() => {
                // Cria grid pequeno 4x4 para preview
                const small = createGrid(4, 4);
                const { matrix, color } = next;

                // Adiciona próxima peça ao grid pequeno
                for (let r = 0; r < matrix.length; r++) {
                  for (let c = 0; c < matrix[r].length; c++) {
                    if (matrix[r][c]) small[r][c] = color;
                  }
                }
                return small;
              })()}
              small // Flag para renderizar em tamanho pequeno
            />
          </View>

          {/* Informações do jogo */}
          <Text style={styles.sideText}>Level: {level}</Text>
          <Text style={styles.sideText}>
            Speed: {Math.round(1000 / dropInterval)}/s
          </Text>
        </View>
      </View>

      {/* CONTROLES - Botões de movimento */}
      <View style={styles.controls}>
        {/* Mover para esquerda */}
        <TouchableOpacity style={styles.controlBtn} onPress={() => move(-1)}>
          <Text style={styles.controlTxt}>◀</Text>
        </TouchableOpacity>

        {/* Rotacionar peça */}
        <TouchableOpacity style={styles.controlBtn} onPress={() => rotate()}>
          <Text style={styles.controlTxt}>⤴</Text>
        </TouchableOpacity>

        {/* Mover para direita */}
        <TouchableOpacity style={styles.controlBtn} onPress={() => move(1)}>
          <Text style={styles.controlTxt}>▶</Text>
        </TouchableOpacity>

        {/* Queda rápida */}
        <TouchableOpacity
          style={[styles.controlBtn, styles.dropBtn]}
          onPress={() => softDrop()}
        >
          <Text style={styles.controlTxt}>↓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}