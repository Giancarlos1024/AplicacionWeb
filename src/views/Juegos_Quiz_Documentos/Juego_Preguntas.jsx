import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Juego_Preguntas = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar la música
  const [backgroundMusic, setBackgroundMusic] = useState(null); // Estado para la música de fondo

  // Rutas de los sonidos
  const correctSound = new Audio('music/correcto_matematicas.mp3');
  const wrongSound = new Audio('music/incorrecto.mp3');

  // Efecto para crear la instancia de la música de fondo
  useEffect(() => {
    const music = new Audio('music/musica_matematicas.mp3');
    music.loop = true;
    setBackgroundMusic(music);
    
    return () => {
      music.pause(); // Detener música cuando el componente se desmonta
    };
  }, []);

  // Función para controlar el play/pause de la música de fondo
  const toggleBackgroundMusic = () => {
    if (backgroundMusic) {
      if (isPlaying) {
        backgroundMusic.pause();
      } else {
        backgroundMusic.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Preguntas del juego
  const questions = [
    {
      question: '¿Cuántas patas tiene un perro?',
      answers: [
        { text: '2', isCorrect: false },
        { text: '4', isCorrect: true },
        { text: '6', isCorrect: false },
        { text: '8', isCorrect: false },
      ],
    },
    {
      question: '¿De qué color es el cielo durante un día soleado?',
      answers: [
        { text: 'Rojo', isCorrect: false },
        { text: 'Azul', isCorrect: true },
        { text: 'Verde', isCorrect: false },
        { text: 'Negro', isCorrect: false },
      ],
    },
    {
      question: '¿Cuánto es 2 + 3?',
      answers: [
        { text: '4', isCorrect: false },
        { text: '5', isCorrect: true },
        { text: '6', isCorrect: false },
        { text: '7', isCorrect: false },
      ],
    },
    {
      question: '¿Quién es el presidente de EE.UU.?',
      answers: [
        { text: 'Donald Trump', isCorrect: false },
        { text: 'Joe Biden', isCorrect: true },
        { text: 'Barack Obama', isCorrect: false },
        { text: 'George Bush', isCorrect: false },
      ],
    },
    {
      question: '¿Cuál es el continente más grande?',
      answers: [
        { text: 'Asia', isCorrect: true },
        { text: 'África', isCorrect: false },
        { text: 'Europa', isCorrect: false },
        { text: 'América', isCorrect: false },
      ],
    },
  ];

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      correctSound.play(); // Reproducir sonido correcto
    } else {
      wrongSound.play(); // Reproducir sonido incorrecto
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      if (backgroundMusic) {
        backgroundMusic.pause(); // Detener música de fondo cuando el juego termine
      }
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    if (backgroundMusic) {
      backgroundMusic.play(); // Reiniciar música de fondo
    }
    setIsPlaying(true); // Asegurar que la música se reanude
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 text-primary mb-4">Juego de Preguntas</h1>

      {/* Botón para controlar la música de fondo */}
      <button
        className="btn btn-secondary mb-4"
        onClick={toggleBackgroundMusic}
      >
        {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
      </button>

      {showScore ? (
        <div className="alert alert-info mt-4 shadow-lg rounded">
          <h3>¡Juego terminado!<br />
          Puntuación: {score} de {questions.length}
          </h3>
          <button className="btn btn-success mt-3" onClick={restartGame}>
            Jugar de nuevo
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <div className="mb-4">
            <h4>
              Pregunta {currentQuestion + 1} de {questions.length}
            </h4>
            <p>{questions[currentQuestion].question}</p>
          </div>

          <div className="row justify-content-center">
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                key={index}
                className="btn btn-outline-primary col-5 m-2 shadow-sm"
                onClick={() => handleAnswerOptionClick(answer.isCorrect)}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Juego_Preguntas;
