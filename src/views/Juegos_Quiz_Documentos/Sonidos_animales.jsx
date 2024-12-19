import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Sonidos_animales = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar la música
  const [correctAnswer, setCorrectAnswer] = useState(false); // Estado para verificar si la respuesta es correcta
  const [backgroundMusic, setBackgroundMusic] = useState(null); // Estado para la música de fondo
  const [currentAnimalSound, setCurrentAnimalSound] = useState(null); // Estado para controlar el sonido actual del animal

  // Rutas de los sonidos
  const correctSound = new Audio('music/correcto_matematicas.mp3');
  const wrongSound = new Audio('music/incorrecto.mp3');
  const animalSounds = {
    perro: new Audio('music/perro.mp3'),
    gato: new Audio('music/cat.mp3'),
    vaca: new Audio('music/vaca.mp3'),
    oveja: new Audio('music/oveja.mp3'),
  };

  // Efecto para crear la instancia de la música de fondo
  useEffect(() => {
    const music = new Audio('music/musica_matematicas.mp3');
    music.loop = true;
    setBackgroundMusic(music);

    return () => {
      music.pause(); // Detener música cuando el componente se desmonta
    };
  }, []);

  // Reproducir sonido correcto al mostrar la pregunta
  useEffect(() => {
    if (currentQuestion < questions.length) {
      const correctAnimal = questions[currentQuestion].answers.find(
        (answer) => answer.isCorrect
      );
      if (correctAnimal) {
        // Detener el sonido anterior si está reproduciéndose
        if (currentAnimalSound) {
          currentAnimalSound.pause();
          currentAnimalSound.currentTime = 0; // Volver al inicio del sonido
        }

        // Reproducir sonido del animal correcto
        const newAnimalSound = animalSounds[correctAnimal.sound];
        setCurrentAnimalSound(newAnimalSound); // Actualizar el sonido actual
        newAnimalSound.play();
      }
    }
  }, [currentQuestion]);

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
      question: '¿Qué animal dice "guau"?',
      answers: [
        { text: 'Perro', isCorrect: true, sound: 'perro' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
        { text: 'Oveja', isCorrect: false, sound: 'oveja' },
      ],
    },
    {
      question: '¿Qué animal dice "miau"?',
      answers: [
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Gato', isCorrect: true, sound: 'gato' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
        { text: 'Oveja', isCorrect: false, sound: 'oveja' },
      ],
    },
    {
      question: '¿Qué animal dice "mu"?',
      answers: [
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Vaca', isCorrect: true, sound: 'vaca' },
        { text: 'Oveja', isCorrect: false, sound: 'oveja' },
      ],
    },
    {
      question: '¿Qué animal dice "bee"?',
      answers: [
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
        { text: 'Oveja', isCorrect: true, sound: 'oveja' },
      ],
    },
  ];

  const handleAnswerOptionClick = (isCorrect, sound) => {
    if (isCorrect) {
      setScore(score + 1);
      correctSound.play(); // Reproducir sonido correcto
      setCorrectAnswer(true);
    } else {
      wrongSound.play(); // Reproducir sonido incorrecto
      setCorrectAnswer(false);
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
      <h1 className="display-4 text-primary mb-4">Juego de Sonidos de Animales</h1>

      {/* Botón para controlar la música de fondo */}
      <button
        className="btn btn-secondary mb-4"
        onClick={toggleBackgroundMusic}
      >
        {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
      </button>

      {showScore ? (
        <div className="alert alert-info mt-4 shadow-lg rounded">
          <h3>¡Felicidades, ganaste el juego!<br />
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
                onClick={() => handleAnswerOptionClick(answer.isCorrect, answer.sound)}
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
