import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Lenguaje = () => {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar si la música está reproduciéndose

  // Referencias de audio
  const backgroundMusic = useRef(new Audio('music/musica_matematicas.mp3'));
  const correctSound = useRef(new Audio('music/correcto_matematicas.mp3'));
  const incorrectSound = useRef(new Audio('music/incorrecto.mp3'));

  const questions = [
    {
      question: '¿Cual es la primera letra del abecedario?',
      options: ['B', 'A', 'C'],
      correctAnswer: 'A',
    },
    {
      question: '¿Qué palabra es un sustantivo?',
      options: ['Correr', 'Niño', 'Saltando'],
      correctAnswer: 'Niño',
    },
    {
      question: '¿Cuál es el pronombre en la oración "Ella come una manzana"?',
      options: ['Ella', 'Manzana', 'Come'],
      correctAnswer: 'Ella',
    },
    {
      question: '¿Qué palabra es un verbo?',
      options: ['Feliz', 'Correr', 'Rápido'],
      correctAnswer: 'Correr',
    },
    {
      question: '¿Qué tipo de palabra es "rápidamente"?',
      options: ['Adjetivo', 'Verbo', 'Adverbio'],
      correctAnswer: 'Adverbio',
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
    <div className="container py-5">
      <div className="card shadow-lg p-4" style={{ backgroundColor: '#f0f8ff' }}>
        <h1 className="text-center text-primary font-weight-bold mb-4">📚 Juego de Lenguaje y Comunicación</h1>

        {/* Música de fondo */}
        <div className="text-center mb-4">
          <button
            onClick={toggleBackgroundMusic}
            className="btn btn-lg btn-info"
            style={{ fontSize: '1.2rem' }}
          >
            {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
          </button>
        </div>

        {/* Pregunta */}
        <h2 className="text-center text-secondary mb-4">{questions[questionIndex].question}</h2>

        {/* Opciones de respuesta */}
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

        {/* Puntuación */}
        <div className="mt-4 text-center">
          <h4 className="font-weight-bold text-primary">Puntuación: {score}</h4>
        </div>

        {/* Sonidos de respuesta */}
        <div className="mt-4 text-center">
          <h5>¡Buena suerte! Responde correctamente a las preguntas.</h5>
        </div>
      </div>
    </div>
  );
};
