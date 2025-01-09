import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "../../assets/css/Sopaletras.css";

const SopaDeLetras = () => {
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [selectedWord, setSelectedWord] = useState([]);
  const [foundPositions, setFoundPositions] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [wordColors, setWordColors] = useState({});
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [level, setLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const backgroundMusicRef = useRef(new Audio("music/musica_matematicas.mp3"));
  const correctSoundRef = useRef(new Audio("music/correcto_matematicas.mp3"));
  const incorrectSoundRef = useRef(new Audio("music/incorrecto.mp3"));

  const levels = [
    {
      words: ["SOL", "TIERRA", "LUNA", "MARTE", "VENUS", "JUPITER", "SATURNO"],
      grid: [
        ["S", "O", "L", "T", "I", "E", "R", "D", "A"],
        ["V", "E", "N", "U", "S", "L", "A", "M", "R"],
        ["J", "U", "P", "I", "T", "E", "R", "S", "R"],
        ["S", "A", "T", "U", "R", "N", "O", "U", "E"],
        ["M", "A", "R", "T", "E", "D", "N", "N", "I"],
        ["O", "L", "L", "A", "S", "M", "E", "E", "T"],
        ["L", "U", "N", "A", "G", "P", "V", "V", "C"],
      ],
    },
    {
      words: ["CORAZON", "CEREBRO", "RIÑON", "PULMON", "HIGADO", "HUESO"],
      grid: [
        ["C", "O", "R", "A", "Z", "O", "N", "T", "O"],
        ["C", "E", "R", "E", "B", "E", "O", "P", "R"],
        ["R", "I", "N", "O", "N", "E", "D", "N", "B"],
        ["P", "U", "L", "M", "O", "N", "A", "O", "E"],
        ["H", "I", "G", "A", "D", "O", "G", "Ñ", "R"],
        ["E", "S", "T", "O", "M", "A", "I", "I", "E"],
        ["A", "H", "U", "E", "S", "O", "H", "R", "C"],
      ],
    },
    {
      words: ["MEMORIA", "DISCO", "PANTALLA", "TECLADO", "SOFTWARE", "REDES"],
      grid: [
        ["P", "R", "R", "E", "D", "E", "S", "D", "O"],
        ["M", "E", "M", "O", "R", "I", "A", "P", "T"],
        ["D", "I", "S", "C", "O", "V", "G", "D", "O"],
        ["P", "A", "N", "T", "A", "L", "L", "A", "C"],
        ["T", "E", "C", "L", "A", "D", "O", "D", "S"],
        ["S", "O", "F", "T", "W", "A", "R", "E", "I"],
        ["R", "A", "D", "E", "S", "R", "N", "O", "D"],
      ],
    },
    {
      words: ["FISICA", "QUIMICA", "BIOLOGIA", "GEOGRAFIA", "ATOMO", "ELEMENTO", "MOLECULA"],
      grid: [
        ["F", "I", "S", "I", "C", "A", "Q", "B", "X"],
        ["Q", "U", "I", "M", "I", "C", "A", "V", "S"],
        ["B", "I", "O", "L", "O", "G", "I", "A", "T"],
        ["G", "E", "O", "G", "R", "A", "F", "I", "A"],
        ["A", "T", "O", "M", "O", "Y", "I", "B", "U"],
        ["E", "L", "E", "M", "E", "N", "T", "O", "C"],
        ["M", "O", "L", "E", "C", "U", "L", "A", "P"],
      ],
    },
    {
      words: ["IA", "ROBOT", "CYBER", "BIGDATA", "BLOCKCHA"],
      grid: [
        ["I", "A", "T", "E", "L", "I", "G", "E", "N"],
        ["I", "N", "T", "E", "L", "I", "A", "T", "N"],
        ["R", "O", "B", "O", "F", "T", "X", "O", "P"],
        ["A", "U", "T", "O", "A", "E", "T", "B", "Z"],
        ["C", "I", "B", "D", "R", "B", "O", "O", "I"],
        ["B", "I", "G", "D", "A", "Y", "B", "R", "L"],
        ["B", "I", "C", "Y", "B", "E", "R", "R", "I"],
        ["B", "B", "L", "O", "C", "K", "C", "H", "A"],
      ],
    },
  ];

  const availableColors = [
    "#FF5733",
    "#FF5733",
    "#FF5733",
    "#FF5733",
    "#FF5733",
    "#FF5733",
    "#FF5733",
    "#FF5733",
  ];

  useEffect(() => {
    setFoundPositions([]);
    setFoundWords([]);
    setWordColors({});
  }, [level]);

  useEffect(() => {
    const backgroundMusic = backgroundMusicRef.current;
    backgroundMusic.loop = true;
    backgroundMusic.play();

    return () => {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, []);

  const reiniciarJuego = () => {
    setLevel(1);
    setFoundPositions([]);
    setFoundWords([]);
    setWordColors({});
    setSelectedWord([]);
    setLevelCompleted(false);
  };

  const toggleMusic = () => {
    const backgroundMusic = backgroundMusicRef.current;
    if (musicPlaying) {
      backgroundMusic.pause();
    } else {
      backgroundMusic.play();
    }
    setMusicPlaying(!musicPlaying);
  };

  const isWordAlreadyFound = (word) => 
    foundWords.includes(word) || foundWords.includes(word.split("").reverse().join(""));

  const checkWord = () => {
    const formedWord = selectedWord.map((item) => item.letter).join("");
    const reversedWord = formedWord.split("").reverse().join("");
    const currentWords = levels[level - 1].words;

    if (
      (currentWords.includes(formedWord) || currentWords.includes(reversedWord)) &&
      !isWordAlreadyFound(formedWord)
    ) {
      const newColor =
        wordColors[formedWord] ||
        availableColors[Object.keys(wordColors).length % availableColors.length];

      const wordToAdd = currentWords.includes(formedWord) ? formedWord : reversedWord;
      setWordColors((prev) => ({ ...prev, [wordToAdd]: newColor }));
      setFoundPositions((prev) => [...prev, ...selectedWord]);
      setFoundWords((prev) => [...prev, wordToAdd]);
      setSelectedWord([]);

      correctSoundRef.current.currentTime = 0;
      correctSoundRef.current
        .play()
        .catch((error) => console.error("Error al reproducir sonido correcto:", error));
    } else {
      incorrectSoundRef.current.currentTime = 0;
      incorrectSoundRef.current
        .play()
        .catch((error) => console.error("Error al reproducir sonido incorrecto:", error));
      setSelectedWord([]);
    }
  };

  const handleMouseDown = (letter, row, col) => {
    setIsDragging(true);
    setSelectedWord([{ letter, row, col }]);
  };

  const handleMouseEnter = (letter, row, col) => {
    if (isDragging) {
      setSelectedWord((prev) => {
        if (!prev.find((item) => item.row === row && item.col === col)) {
          return [...prev, { letter, row, col }];
        }
        return prev;
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    checkWord();
  };

  const getCellColor = (row, col) => {
    const found = foundPositions.find((pos) => pos.row === row && pos.col === col);
    if (found) {
      return "#28a745";
    }
    return selectedWord.find((item) => item.row === row && item.col === col)
      ? "#ffc107"
      : "#f8f9fa";
  };

  const allWordsFound = levels[level - 1].words.every((word) =>
    foundWords.includes(word)
  );

  useEffect(() => {
    if (allWordsFound) {
      setLevelCompleted(true);
    }
  }, [allWordsFound]);

  return (
    <div className="container sopaletrass mt-0 text-center">
      <div className="titulo-sopa">
        <h1 className="text-light">Sopa de Letras</h1>
      </div>
      <div>
        <button className="btn btn-primary mb-3" onClick={toggleMusic}>
          {musicPlaying ? "Pausar Música" : "Reproducir Música"}
        </button>
        <div className="mb-4 select-sopaletras">
          <select
            className="form-select"
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value))}
          >
            <option value={1}>Nivel 1</option>
            <option value={2}>Nivel 2</option>
            <option value={3}>Nivel 3</option>
            <option value={4}>Nivel 4</option>
            <option value={5}>Nivel 5</option>
          </select>
        </div>
      </div>

      <div className="grid">
        {levels[level - 1].grid.map((row, rowIndex) => (
          <div key={rowIndex} className="d-flex justify-content-center">
            {row.map((letter, colIndex) => (
              <div
                key={colIndex}
                className="border text-center p-3"
                style={{
                  width: "40px",
                  height: "40px",
                  lineHeight: "10px",
                  cursor: "pointer",
                  backgroundColor: getCellColor(rowIndex, colIndex),
                }}
                onMouseDown={() => handleMouseDown(letter, rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(letter, rowIndex, colIndex)}
                onMouseUp={handleMouseUp}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="titulo-sopa">
          <h5 className="text-light">Palabras para buscar:</h5>
        </div>
        <div className="d-flex justify-content-center flex-wrap">
          {levels[level - 1].words.map((word, index) => (
            <span
              key={index}
              className="badge m-1 p-2"
              style={{
                backgroundColor: wordColors[word] || "BLACK",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {levelCompleted && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">¡Felicidades!</h5>
              </div>
              <div className="modal-body">
                <p>Has encontrado todas las palabras.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    reiniciarJuego();
                    setLevelCompleted(false);
                  }}
                >
                  Jugar de nuevo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SopaDeLetras;
