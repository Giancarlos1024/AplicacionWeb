import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Estudios = () => {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Referencias de audio
  const backgroundMusic = useRef(null);
  const correctSound = useRef(null);
  const incorrectSound = useRef(null);

  useEffect(() => {
    // Inicializar los audios al cargar el componente
    backgroundMusic.current = new Audio("music/musica_matematicas.mp3");
    backgroundMusic.current.loop = true;

    correctSound.current = new Audio("music/correcto_matematicas.mp3");
    incorrectSound.current = new Audio("music/incorrecto.mp3");

    return () => {
      // Detener música cuando el componente se desmonte
      if (backgroundMusic.current) {
        backgroundMusic.current.pause();
      }
    };
  }, []);

  const questions = [
    {
      question: "¿Quién fue el primer presidente de los Estados Unidos?",
      options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson"],
      correctAnswer: "George Washington",
    },
    {
      question: "¿En qué año llegó Cristóbal Colón a América?",
      options: ["1492", "1500", "1480"],
      correctAnswer: "1492",
    },
    {
      question: "¿Qué continente está al sur de América?",
      options: ["Asia", "Antártida", "África"],
      correctAnswer: "Antártida",
    },
    {
      question: "¿Cómo se llama el océano que está al este de América?",
      options: ["Océano Pacífico", "Océano Atlántico", "Océano Índico"],
      correctAnswer: "Océano Atlántico",
    },
    {
      question: "¿Qué país tiene la ciudad de El Cairo?",
      options: ["Arabia Saudita", "Egipto", "Irak"],
      correctAnswer: "Egipto",
    },
  ];

  // Manejar respuesta
  const handleAnswer = (answer) => {
    if (answer === questions[questionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      correctSound.current.play();
    } else {
      incorrectSound.current.play();
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setTimeout(() => {
        alert(`¡Juego terminado! Tu puntuación es: ${score + 1}/${questions.length}`);
        setScore(0);
        setQuestionIndex(0);
      }, 500); // Espera para evitar superposición de sonidos
    }
  };

  // Controlar música de fondo
  const toggleBackgroundMusic = () => {
    if (isMusicPlaying) {
      backgroundMusic.current.pause();
    } else {
      backgroundMusic.current.play();
    }
    setIsMusicPlaying((prevState) => !prevState);
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg p-4" style={{ backgroundColor: "#f0f8ff" }}>
        <h1 className="text-center text-primary font-weight-bold mb-4">
          🌎 Juego de Estudios Sociales
        </h1>

        {/* Música de fondo */}
        <div className="text-center mb-4">
          <button
            onClick={toggleBackgroundMusic}
            className="btn btn-lg btn-info"
            style={{ fontSize: "1.2rem" }}
          >
            {isMusicPlaying ? "Pausar Música" : "Reproducir Música"}
          </button>
        </div>

        {/* Pregunta */}
        <h2 className="text-center text-secondary mb-4">
          {questions[questionIndex].question}
        </h2>

        {/* Opciones */}
        <div className="d-flex justify-content-center flex-wrap mt-3">
          {questions[questionIndex].options.map((option, index) => (
            <button
              key={index}
              className="btn btn-lg btn-outline-primary m-2 px-4 py-2"
              onClick={() => handleAnswer(option)}
              style={{
                fontSize: "1.2rem",
                width: "200px",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Puntuación */}
        <div className="mt-4 text-center">
          <h4 className="font-weight-bold text-primary">Puntuación: {score}</h4>
        </div>
      </div>
    </div>
  );
};
