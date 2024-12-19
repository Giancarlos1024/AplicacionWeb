import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const SopaDeLetras = () => {
  const [selectedWord, setSelectedWord] = useState([]);
  const [foundPositions, setFoundPositions] = useState([]);
  const [foundWords, setFoundWords] = useState([]); // Nuevo estado
  const [wordColors, setWordColors] = useState({});
  const [musicPlaying, setMusicPlaying] = useState(true);

  // Referencias para los sonidos
  const backgroundMusicRef = useRef(new Audio("music/musica_matematicas.mp3"));
  const correctSoundRef = useRef(new Audio("music/correcto_matematicas.mp3"));
  const incorrectSoundRef = useRef(new Audio("music/incorrecto.mp3"));

  const words = ["BABA", "DROGA", "FRENO", "GANSO", "NADAR", "REY", "SABE", "SAPO", "TAXIS", "UVA", "VECES"];
  const grid = [
    ["A", "B", "A", "B", "A", "S", "S"],
    ["F", "N", "P", "G", "E", "Y", "A"],
    ["N", "R", "O", "C", "E", "O", "T"],
    ["A", "R", "E", "R", "S", "A", "I"],
    ["D", "V", "B", "N", "X", "V", "F"],
    ["A", "O", "A", "I", "O", "U", "P"],
    ["R", "G", "S", "A", "P", "O", "C"],
  ];
  const availableColors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#A633FF", "#FFD733", "#33FFF5", "#FF8C33"];

  useEffect(() => {
    const backgroundMusic = backgroundMusicRef.current;
    backgroundMusic.loop = true;
    backgroundMusic.play();

    return () => {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, []);

  const toggleMusic = () => {
    const backgroundMusic = backgroundMusicRef.current;
    if (musicPlaying) {
      backgroundMusic.pause();
    } else {
      backgroundMusic.play();
    }
    setMusicPlaying(!musicPlaying);
  };

  const checkWord = () => {
    const formedWord = selectedWord.map((item) => item.letter).join("");
    if (words.includes(formedWord) && !foundWords.includes(formedWord)) {
      const newColor =
        wordColors[formedWord] || availableColors[Object.keys(wordColors).length % availableColors.length];

      setWordColors({ ...wordColors, [formedWord]: newColor });
      setFoundPositions([...foundPositions, ...selectedWord]);
      setFoundWords([...foundWords, formedWord]); // Agregar palabra encontrada
      setSelectedWord([]);

      correctSoundRef.current.play();
    } else {
      setTimeout(() => setSelectedWord([]), 2000);
      incorrectSoundRef.current.play();
    }
  };

  const handleSelect = (letter, row, col) => {
    if (!selectedWord.find((item) => item.row === row && item.col === col)) {
      setSelectedWord([...selectedWord, { letter, row, col }]);
    }
  };

  useEffect(() => {
    if (selectedWord.length > 0) {
      checkWord();
    }
  }, [selectedWord]);

  const getCellColor = (row, col) => {
    const found = foundPositions.find((pos) => pos.row === row && pos.col === col);
    if (found) {
      return "#28a745";
    }
    return selectedWord.find((item) => item.row === row && item.col === col)
      ? "#ffc107"
      : "#f8f9fa";
  };

  const allWordsFound = foundWords.length === words.length;

  return (
    <div className="container mt-4 text-center">
      <div>
      <h1 className="mb-4">Sopa de Letras</h1>
      <button className="btn btn-primary mb-3" onClick={toggleMusic}>
        {musicPlaying ? "Pausar Música" : "Reproducir Música"}
      </button>
      </div>
      
      
      <div className="grid" style={{ display: "inline-block" }}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="d-flex justify-content-center">
            {row.map((letter, colIndex) => (
              <div
                key={colIndex}
                className="border text-center p-3"
                style={{
                  width: "40px",
                  height: "40px",
                  lineHeight: "30px",
                  cursor: "pointer",
                  backgroundColor: getCellColor(rowIndex, colIndex),
                }}
                onClick={() => handleSelect(letter, rowIndex, colIndex)}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h5>Palabras para buscar:</h5>
        <div className="d-flex justify-content-center flex-wrap">
          {words.map((word, index) => (
            <span
              key={index}
              className={`badge m-1 p-2`}
              style={{
                backgroundColor: wordColors[word] || "#007bff",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {allWordsFound && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
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
                  onClick={() => window.location.reload()}
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
