import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Ingles = () => {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar si la música está reproduciéndose

  const backgroundMusic = useRef(new Audio('music/musica_matematicas.mp3'));
  const correctSound = useRef(new Audio('music/correcto_matematicas.mp3'));
  const incorrectSound = useRef(new Audio('music/incorrecto.mp3'));

  const questions = [
    {
      question: '¿Cómo se escribe "perro" en inglés?',
      options: ['Cat', 'Dog', 'Bird'],
      correctAnswer: 'Dog',
    },
    {
      question: '¿Cómo se escribe "gato" en inglés?',
      options: ['Dog', 'Cat', 'Fish'],
      correctAnswer: 'Cat',
    },
    {
      question: '¿Cómo se escribe "manzana" en inglés?',
      options: ['Banana', 'Apple', 'Grapes'],
      correctAnswer: 'Apple',
    },
    {
      question: '¿Cómo se escribe "feliz" en inglés?',
      options: ['Sad', 'Happy', 'Angry'],
      correctAnswer: 'Happy',
    },
    {
      question: '¿Cómo se escribe "rojo" en inglés?',
      options: ['Blue', 'Red', 'Green'],
      correctAnswer: 'Red',
    },
  ];

  // Función para manejar la respuesta
  const handleAnswer = (answer) => {
    if (answer === questions[questionIndex].correctAnswer) {
      setScore(score + 1);
      correctSound.current.play(); // Reproducir sonido de respuesta correcta
    } else {
      incorrectSound.current.play(); // Reproducir sonido de respuesta incorrecta
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      alert(`Juego terminado! Tu puntuación es: ${score}/${questions.length}`);
      setScore(0);
      setQuestionIndex(0);
    }
  };

  // Función para controlar la música de fondo
  const toggleBackgroundMusic = () => {
    if (isPlaying) {
      backgroundMusic.current.pause();
      setIsPlaying(false);
    } else {
      backgroundMusic.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="container text-center mt-5">
      <div className="card shadow-lg p-4" style={{ backgroundColor: '#f8f9fa' }}>
        <h1 className="mb-4 text-primary font-weight-bold">🎮 Juego de Inglés para Niños</h1>
        <h3 className="mb-4">Pregunta {questionIndex + 1} de {questions.length}</h3>

        {/* Controles de música */}
        <div className="mt-4">
          <button
            onClick={toggleBackgroundMusic}
            className="btn btn-lg btn-info"
            style={{ fontSize: '1.2rem' }}
          >
            {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
          </button>
        </div>

        <div className="mt-4">
          <h2 className="text-secondary">{questions[questionIndex].question}</h2>
          <div className="d-flex justify-content-center flex-wrap mt-3">
            {questions[questionIndex].options.map((option, index) => (
              <button
                key={index}
                className="btn btn-lg btn-outline-primary m-2 px-4 py-2"
                onClick={() => handleAnswer(option)}
                style={{
                  fontSize: '1.2rem',
                  width: '200px',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-weight-bold text-primary">Puntuación: {score}</h4>
        </div>

      </div>
    </div>
  );
};

export default Ingles;
