// Archivo: Laberinto.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../../assets/css/Laberinto.css';

const Laberinto = () => {
  const [maze, setMaze] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0); // Estado para el temporizador
  const [gameOver, setGameOver] = useState(false); // Estado para saber si el juego terminó

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
// Efecto para manejar el temporizador
useEffect(() => {
  let timer;
  if (isPlaying) {
    timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime >= 120) { // Límite de 10 segundos
          if (!gameOver) { // Verifica si ya se mostró la alerta
            setIsPlaying(false); // Detener el juego
            setGameOver(true); // Marcar que el juego ha terminado
            handleGameOver(); // Llamar a la función que maneja el final del juego
          }
          return prevTime; // No incrementar más el tiempo
        }
        return prevTime + 1; // Incrementar el tiempo
      });
    }, 1000);
  } else {
    clearInterval(timer);
  }
  return () => clearInterval(timer);
}, [isPlaying, gameOver]);



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
        ['', 'W', '', 'W', ''],
        ['W', '', '', 'W', ''],
        ['', '', '', '', ''],
      ],
      [
        ['P', 'W', 'W', '', 'G'],
        ['', '', 'W', '', 'W'],
        ['W', '', 'W', '', ''],
        ['W', '', 'W', 'W', ''],
        ['', '', '', '', ''],
      ],
      [
        ['P', '', '', 'W', 'G'],
        ['W', '', 'W', 'W', ''],
        ['', '', '', 'W', ''],
        ['', 'W', '', 'W', ''],
        ['', '', '', '', ''],
      ],
      [
        ['P', '', 'W', '', 'G'],
        ['W', '', 'W', '', 'W'],
        ['', '', 'W', '', ''],
        ['', 'W', 'W', 'W', ''],
        ['', '', '', '', ''],
      ],
      [
        ['P', 'W', '', '', ''],
        ['', 'W', '', 'W', ''],
        ['', 'W', '', 'W', ''],
        ['', 'W', '', 'W', ''],
        ['', 'W', '', 'W', ''],
        ['', 'W', '', 'W', ''],
        ['', '', '', 'W', 'G'],
      ],
      [
        ['P', '', 'W', '', 'G','W'],
        ['W', '', 'W', '', 'W',''],
        ['', '', 'W', '', 'W',''],
        ['', 'W', 'W', '', 'W',''],
        ['', 'W', '', '', '',''],
        ['', 'W', 'W', 'W', 'W',''],
        ['', '', '', '', '',''],
      ],
      [
        ['P', '', '', 'W', ''],
        ['W', 'W', '', 'W', ''],
        ['', '', '', 'W', 'G'],
        ['', 'W', 'W', 'W', ''],
        ['', '', '', '', ''],
      ],
      [
        ['P', '', '', 'W', 'G'],
        ['W', '', '', 'W', ''],
        ['', '', 'W', '', ''],
        ['', 'W', 'W', '', ''],
        ['', '', '', '', ''],
      ],
      [
        ['P', 'W', '', '', ''],
        ['', 'W', '', 'W', ''],
        ['', 'W', 'G', 'W', ''],
        ['', 'W', 'W', 'W', ''],
        ['', '', '', '', ''],
        
      ],
      [
        ['P', '', '', 'W', '','', '', '', 'W', 'G'],
        ['W', 'W', '', 'W', '','W', '', '', 'W', ''],
        ['', '', '', 'W', '','W', '', '', 'W', ''],
        ['W', '', 'W', '', '','W', '', 'W', 'W', ''],
        ['', '', '', '', 'W','', '', '', '', ''],
      ],
      [
        ['P', 'W', '', '', '','W', '', '', 'W', '','G'],
        ['', 'W', '', 'W', '','W', '', '', 'W', 'W',''],
        ['', 'W', '', 'W', '','W', '', '', '', 'W',''],
        ['', 'W', '', 'W', '','W', '', 'W', '', 'W',''],
        ['', '', '', 'W', '','', '', 'W', '', '',''],
      ],
      [
        ['P', 'W', '', '', '','W', '', '', '', 'W','G','W'],
        ['', 'W', '', 'W', '','W', '', 'W', '', 'W','',''],
        ['', 'W', '', 'W', '','W', '', 'W', '', 'W','W',''],
        ['', 'W', '', 'W', '','W', '', 'W', '', 'W','',''],
        ['', 'W', '', 'W', '','W', '', 'W', '', 'W','','W'],
        ['', 'W', '', 'W', '','W', '', 'W', '', 'W','',''],
        ['', 'W', '', 'W', '','W', '', 'W', '', 'W','W',''],
        ['', '', '', 'W', '','', '', 'W', '', '','',''],
      ],
      [
        ['', 'W', '', 'W', '','W', '', '', '', '','','W'],
        ['', 'W', '', 'W', '','W', '', 'W', '', 'W','','W'],
        ['', 'W', '', '', '','W', '', 'W', '', 'W','',''],
        ['', 'W', '', 'W', '','W', '', 'W', '', 'W','W',''],
        ['', '', '', 'W', '','W', '', 'W', '', 'W','',''],
        ['', 'W', '', 'W', '','W', '', 'W', '', 'W','',''],
        ['', 'W', '', 'W', '','', '', 'W', '', 'W','W',''],
        ['P', 'W', '', 'W', '','W', '', 'W', '', 'W','','G'],
      ],
      [
        ['', 'W', '', 'W', '','', '', 'W', '', '','','W'],
        ['', 'W', '', 'W', '','W', '', 'W', '', 'W','','W'],
        ['', 'W', '', '', '','W', '', 'W', '', 'W','',''],
        ['', 'W', '', 'W', '','W', '', 'W', '', 'W','W',''],
        ['', '', '', 'W', '','W', '', 'W', '', 'W','',''],
        ['', 'W', '', 'W', '','W', '', '', '', 'W','',''],
        ['', 'W', '', 'W', '','W', 'W', 'W', 'W', 'W','W',''],
        ['P', 'W', '', 'W', 'W','G', '', '', '', '','',''],
      ],
      [
        ['', 'W', 'G', '', '','', '', '', '', '','',''],
        ['', 'W', 'W', 'W', 'W','W', 'W', 'W', 'W', '','',''],
        ['', 'W', '', '', '','W', '', 'W', '', 'W','W',''],
        ['', 'W', '', 'W', '','W', '', '', '', '','',''],
        ['', '', '', 'W', '','W', '', 'W', 'W', 'W','W','W'],
        ['', 'W', '', 'W', '','W', '', '', '', '','',''],
        ['', 'W', '', 'W', '','W', 'W', 'W', 'W', 'W','W',''],
        ['P', 'W', '', 'W', '','', '', '', '', '','',''],
      ],
      [
        ['', 'W', '', '', '','', '', '', '', '','','','','',''],
        ['P', 'W', 'G', 'W', 'W','W', 'W', 'W', 'W', 'W','W','W','W','W',''],
        ['', 'W', 'W', '', '','W', '', 'W', '', 'W','W','','','',''],
        ['', 'W', '', '', '','W', '', '', '', '','','','','',''],
        ['', '', '', 'W', '','W', '', 'W', 'W', 'W','W','W','','',''],
        ['', 'W', '', 'W', '','W', '', '', '', '','','','','',''],
        ['', 'W', '', 'W', '','W', 'W', 'W', 'W', 'W','W','','','',''],
        ['', 'W', '', 'W', '','', '', '', '', '','','','','',''],
      ],
      [
        ['P', '', '', '', ''],
        ['', '', 'W', 'W', ''],
        ['', '', '', '', ''],
        ['', 'W', 'W', '', ''],
        ['', 'W', '', '', ''],
        ['', 'W', '', '', ''],
        ['', 'W', '', '', ''],
        ['', 'W', 'W', 'W', 'W'],
        ['', '', '', '', 'G'],
      ],
      [
        ['', '', '', '', '','',''],
        ['', 'W', '', '', '','',''],
        ['', 'W', 'W', 'W', 'W','W',''],
        ['', 'W', '', '', 'G','W',''],
        ['P', 'W', '', 'W', 'W','',''],
        ['', 'W', '', '', '','',''],
      ],
      [
        ['P', 'W', '', '', ''],
        ['', 'W', '', 'W', ''],
        ['', 'W', '', 'W', 'G'],
        ['', 'W', '', 'W', ''],
        ['', '', '', 'W', ''],
      ],
    ];

    setMaze(levels[level - 1]);
    setPlayerPosition({ row: 0, col: 0 });
    setTime(0); // Reiniciar el temporizador al generar un nuevo laberinto
    setIsPlaying(true); // Activa el temporizador automáticamente
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
        if (level < 20) {
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

  const startGame = () => {
    setIsPlaying(true);
  };

  const stopGame = () => {
    setIsPlaying(false);
  };

  const handleGameOver = () => {
    alert('¡Tiempo agotado! Has perdido.');
    setTime(0); // Reiniciar el tiempo
    setPlayerPosition({ row: 0, col: 0 }); // Reiniciar la posición del jugador
    setMaze([]); // Opcional: Puedes regenerar el laberinto o dejarlo vacío
    setIsPlaying(false);
    setGameOver(true); // Marcar el juego como terminado
  };
  
  const handleRestart = () => {
    setTime(30); // Tiempo inicial
    setGameOver(false); // Marcar el juego como no terminado
    setPlayerPosition({ row: 0, col: 0 }); // Reiniciar la posición del jugador
    setLevel(1); // Reiniciar al nivel 1 o al nivel deseado
    setIsPlaying(true); // Comenzar el juego nuevamente
    generateMaze(1); // Generar un nuevo laberinto
  };


  return (
    <div className="laberinto-container">
      <div className='laberinto-h1'>
        <h1 className='textlaberinto2'>🚀Laberinto Multinivel</h1>
        <p className='textlaberinto'>Nivel: {level}</p>
        <p className='textlaberinto'>Tiempo: {time} segundos</p>
        {/* <button onClick={startGame}>Iniciar</button>
      <button onClick={stopGame}>Pausar</button> */}
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
      {gameOver && (
        <button onClick={handleRestart}>Volver a jugar</button>
      )}
    </div>
  );
};

export default Laberinto;
