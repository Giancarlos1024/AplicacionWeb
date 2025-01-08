import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/Lenguaje.css';

export const Lenguaje = () => {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // Tiempo en segundos
  const [gameOver, setGameOver] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]); // Estado para las preguntas aleatorias

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
   
    {
      question: '¿Qué es un adjetivo?',
      options: ['Un verbo', 'Una acción', 'Una palabra que describe un sustantivo'],
      correctAnswer: 'Una palabra que describe un sustantivo',
    },
    {
      question: '¿Cuál es el antónimo de "grande"?',
      options: ['Pequeño', 'Alto', 'Largo'],
      correctAnswer: 'Pequeño',
    },
    {
      question: '¿Qué significa la palabra "increíble"?',
      options: ['Algo que se puede creer', 'Algo que es difícil de creer', 'Algo muy aburrido'],
      correctAnswer: 'Algo que es difícil de creer',
    },
    {
      question: '¿Cuál de estas palabras es un adverbio?',
      options: ['Rápidamente', 'Niño', 'Correr'],
      correctAnswer: 'Rápidamente',
    },
    {
      question: '¿Cuál es el pronombre en la oración "Nosotros vamos al parque"?',
      options: ['Nosotros', 'Vamos', 'Parque'],
      correctAnswer: 'Nosotros',
    },
    {
      question: '¿Qué significa "antónimo"?',
      options: ['Palabra que significa lo mismo que otra', 'Palabra que significa lo contrario de otra', 'Palabra que describe una acción'],
      correctAnswer: 'Palabra que significa lo contrario de otra',
    },
    {
      question: '¿Cuál de las siguientes oraciones está en futuro?',
      options: ['Ella baila', 'Ella bailó', 'Ella bailará'],
      correctAnswer: 'Ella bailará',
    },
    {
      question: '¿Qué tipo de palabra es "felicidad"?',
      options: ['Sustantivo', 'Verbo', 'Adverbio'],
      correctAnswer: 'Sustantivo',
    },
    {
      question: '¿Cuál es el verbo en la oración "María lee un libro"?',
      options: ['María', 'Lee', 'Libro'],
      correctAnswer: 'Lee',
    },
    {
      question: '¿Qué es un sinónimo?',
      options: ['Palabra que significa lo mismo que otra', 'Palabra que significa lo contrario de otra', 'Palabra que describe una acción'],
      correctAnswer: 'Palabra que significa lo mismo que otra',
    },
    {
      question: '¿Cómo se llama la parte de la oración que indica quién o qué realiza la acción?',
      options: ['Sujeto', 'Verbo', 'Complemento'],
      correctAnswer: 'Sujeto',
    },
    {
      question: '¿Qué tipo de palabra es "hermoso"?',
      options: ['Adjetivo', 'Sustantivo', 'Verbo'],
      correctAnswer: 'Adjetivo',
    },
    {
      question: '¿Qué es un verbo?',
      options: ['Una acción', 'Una persona', 'Un lugar'],
      correctAnswer: 'Una acción',
    },
    {
      question: '¿Qué palabra es un adverbio de lugar?',
      options: ['Rápidamente', 'Aquí', 'Muy'],
      correctAnswer: 'Aquí',
    },
    {
      question: '¿Qué es una oración compuesta?',
      options: ['Una oración que tiene un solo verbo', 'Una oración que tiene dos o más proposiciones unidas por una conjunción', 'Una oración que tiene un solo sustantivo'],
      correctAnswer: 'Una oración que tiene dos o más proposiciones unidas por una conjunción',
    },
    {
      question: '¿Cómo se llama la palabra que conecta dos oraciones?',
      options: ['Conjunción', 'Adverbio', 'Interjección'],
      correctAnswer: 'Conjunción',
    },
    {
      question: '¿Qué es una interjección?',
      options: ['Una palabra que expresa un sentimiento o emoción', 'Una palabra que indica una acción', 'Una palabra que describe un objeto'],
      correctAnswer: 'Una palabra que expresa un sentimiento o emoción',
    },
    {
      question: '¿Cómo se llama el conjunto de letras que forman una palabra?',
      options: ['Sílabas', 'Palabra', 'Alfabeto'],
      correctAnswer: 'Sílabas',
    },
    {
      question: '¿Qué es un sujeto en una oración?',
      options: ['La acción que se realiza', 'La palabra que describe una característica', 'La persona o cosa que realiza la acción'],
      correctAnswer: 'La persona o cosa que realiza la acción',
    },
    {
      question: '¿Cómo se llama la palabra que modifica a un verbo, adjetivo o a otro adverbio?',
      options: ['Conjunción', 'Adverbio', 'Sustantivo'],
      correctAnswer: 'Adverbio',
    },
    {
      question: '¿Qué tipo de palabra es "feliz"?',
      options: ['Sustantivo', 'Adjetivo', 'Verbo'],
      correctAnswer: 'Adjetivo',
    },
    {
      question: '¿Cuál es el pronombre en la oración "Juan y María van al cine"?',
      options: ['Juan', 'María', 'Ellos'],
      correctAnswer: 'Ellos',
    },
    {
      question: '¿Qué es una oración simple?',
      options: ['Una oración con un solo verbo', 'Una oración con más de un verbo', 'Una oración que no tiene verbo'],
      correctAnswer: 'Una oración con un solo verbo',
    },
    {
      question: '¿Qué palabra es un sustantivo colectivo?',
      options: ['Equipo', 'Correr', 'Feliz'],
      correctAnswer: 'Equipo',
    },
    {
      question: '¿Qué es un adverbio de modo?',
      options: ['Una palabra que indica lugar', 'Una palabra que describe cómo se realiza una acción', 'Una palabra que indica tiempo'],
      correctAnswer: 'Una palabra que describe cómo se realiza una acción',
    },
    {
      question: '¿Cómo se llama el verbo en la oración "Carlos canta una canción"?',
      options: ['Carlos', 'Canta', 'Canción'],
      correctAnswer: 'Canta',
    },
    {
      question: '¿Qué tipo de palabra es "rápido"?',
      options: ['Sustantivo', 'Verbo', 'Adjetivo'],
      correctAnswer: 'Adjetivo',
    },
    {
      question: '¿Cuál de las siguientes palabras es un pronombre?',
      options: ['Ella', 'Rápidamente', 'Mesa'],
      correctAnswer: 'Ella',
    },
    {
      question: '¿Qué es un sustantivo concreto?',
      options: ['Un sustantivo que no se puede tocar', 'Un sustantivo que se puede tocar', 'Un sustantivo que describe una acción'],
      correctAnswer: 'Un sustantivo que se puede tocar',
    },
    {
      question: '¿Qué significa la palabra "antónimo"?',
      options: ['Palabra que significa lo mismo que otra', 'Palabra que significa lo contrario de otra', 'Palabra que describe una acción'],
      correctAnswer: 'Palabra que significa lo contrario de otra',
    },
  ];

  // Función para mezclar las preguntas
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Mezclamos las preguntas al iniciar o reiniciar el juego
    setShuffledQuestions(shuffleArray([...questions]));
    setQuestionIndex(0); // Restablecer el índice de la pregunta
    setScore(0); // Restablecer la puntuación
    setTimeLeft(120); // Restablecer el tiempo
    setGameOver(false); // Restablecer el estado del juego
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
    }

    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, gameOver]);

  const handleAnswer = (answer) => {
    if (answer === shuffledQuestions[questionIndex].correctAnswer) {
      setScore(score + 1);
      correctSound.current.play();
    } else {
      incorrectSound.current.play();
    }

    if (questionIndex < shuffledQuestions.length - 1 && !gameOver) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  const toggleBackgroundMusic = () => {
    if (isPlaying) {
      backgroundMusic.current.pause();
      setIsPlaying(false);
    } else {
      backgroundMusic.current.play();
      setIsPlaying(true);
    }
  };

  const restartGame = () => {
    setShuffledQuestions(shuffleArray([...questions])); // Mezclar preguntas al reiniciar
    setQuestionIndex(0);
    setScore(0);
    setTimeLeft(120);
    setGameOver(false);
  };

  return (
    <div className="container contenedor-lenguaje">
      <div className="p-1 csss">
        <div className="titulo-lenguaje">
          <h1 className="text-center text-light font-weight-bold mb-4">🎮 Juego de Lenguaje y Comunicación</h1>
        </div>

        {/* Música de fondo */}
        <div className="text-center mb-2">
          <button
            onClick={toggleBackgroundMusic}
            className="btn btn-lg btn-info"
            style={{ fontSize: '1.2rem' }}
          >
            {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
          </button>
        </div>

        {/* Cronómetro */}
        {!gameOver && (
          <div className="text-center mb-4 tiempo-lenguaje">
            <h2 className="text-light">Tiempo: {timeLeft} segundos</h2>
          </div>
        )}

        {/* Pregunta */}
        <div className="texto-pregunta-lenguaje">
          <h2 className="text-center text-light mb-4">{shuffledQuestions[questionIndex]?.question}</h2>
        </div>

        {/* Opciones de respuesta */}
        <div className="d-flex justify-content-center flex-wrap mt-1">
          {shuffledQuestions[questionIndex]?.options.map((option, index) => (
            <button
              key={index}
              className="btn btn-lg btn-outline-primary m-2 px-4 py-2 contenedor-opciones-lenguaje"
              onClick={() => handleAnswer(option)}
              style={{
                width: '200px',
                transition: 'transform 0.3s ease',
                color: "#fff",
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              disabled={gameOver} // Deshabilitar respuestas después de que termine el juego
            >
              {option}
            </button>
          ))}
        </div>

        {/* Puntuación */}
        <div className="mt-1 text-center">
          <h4 className="font-weight-bold text-light">Puntuación: {score}</h4>
        </div>

        {/* Mensaje final */}
        {gameOver && (
          <div className="mt-1 text-center">
            <h2 className="text-light juego-finss">¡Juego Terminado!</h2>
            <button onClick={restartGame} className="btn btn-success mt-4">Reiniciar juego</button>
          </div>
        )}
      </div>
    </div>
  );
};
