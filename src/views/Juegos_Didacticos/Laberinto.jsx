// Archivo: Laberinto.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../../assets/css/Laberinto.css';

const Laberinto = () => {
  const [maze, setMaze] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(new Audio('music/musica_matematicas.mp3'));

  useEffect(() => {
    generateMaze(level);
  }, [level]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      movePlayer(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition, maze]);

  const generateMaze = (level) => {
    const levels = [
      [
        ['P', '', '', 'W', 'G'],
        ['W', 'W', '', 'W', ''],
        ['', '', '', '', ''],
        ['', 'W', 'W', 'W', ''],
        ['', '', '', '', ''],
      ],
      [
        ['P', '', 'W', 'W', 'G'],
        ['W', '', '', 'W', ''],
        ['', 'W', '', '', ''],
        ['W', '', '', 'W', 'W'],
        ['', '', '', '', ''],
      ],
      [
        ['P', 'W', 'W', '', 'G'],
        ['', '', 'W', '', 'W'],
        ['W', '', 'W', '', ''],
        ['W', '', 'W', 'W', ''],
        ['', '', '', '', ''],
      ],
    ];

    setMaze(levels[level - 1]);
    setPlayerPosition({ row: 0, col: 0 });
  };

  const movePlayer = (key) => {
    const { row, col } = playerPosition;
    let newRow = row;
    let newCol = col;

    if (key === 'ArrowUp') newRow--;
    if (key === 'ArrowDown') newRow++;
    if (key === 'ArrowLeft') newCol--;
    if (key === 'ArrowRight') newCol++;

    if (
      newRow >= 0 &&
      newRow < maze.length &&
      newCol >= 0 &&
      newCol < maze[0].length &&
      maze[newRow][newCol] !== 'W'
    ) {
      setPlayerPosition({ row: newRow, col: newCol });

      if (maze[newRow][newCol] === 'G') {
        if (level < 3) {
          alert(`¡Nivel ${level} completado! Avanzando al siguiente nivel.`);
          setLevel(level + 1);
        } else {
          alert('¡Felicidades! Has completado todos los niveles.');
        }
      }
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="laberinto-container">
      <div>
        <h1>Laberinto Multinivel</h1>
        <button className="btn btn-primary" onClick={toggleMusic}>
          {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
        </button>
      </div>
      <div className="maze">
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className="maze-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`maze-cell ${
                  cell === 'W'
                    ? 'wall'
                    : cell === 'G'
                    ? 'goal'
                    : playerPosition.row === rowIndex && playerPosition.col === colIndex
                    ? 'player'
                    : ''
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Laberinto;
