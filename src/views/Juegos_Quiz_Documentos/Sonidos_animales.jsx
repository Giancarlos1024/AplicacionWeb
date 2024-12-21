import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/Sonidos.css';


export const Sonidos_animales = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar la música
  const [correctAnswer, setCorrectAnswer] = useState(false); // Estado para verificar si la respuesta es correcta
  const [backgroundMusic, setBackgroundMusic] = useState(null); // Estado para la música de fondo
  const [currentAnimalSound, setCurrentAnimalSound] = useState(null); // Estado para controlar el sonido actual del animal
  const [timeLeft, setTimeLeft] = useState(30); // Estado para el tiempo restante
  const [gameOver, setGameOver] = useState(false); // Estado para determinar si el juego ha terminado

  // Rutas de los sonidos
  const correctSound = new Audio('music/correcto_matematicas.mp3');
  const wrongSound = new Audio('music/incorrecto.mp3');
  const animalSounds = {
    perro: new Audio('music/perro.mp3'),
    gato: new Audio('music/cat.mp3'),
    vaca: new Audio('music/vaca.mp3'),
    oveja: new Audio('music/oveja.mp3'),
    caballo: new Audio('music/caballo.mp3'),
    gallina: new Audio('music/gallina.mp3'),
    pato: new Audio('music/pato.mp3'),
    rana: new Audio('music/rana.mp3'),
    buho: new Audio('music/buho.mp3'),
    pajaro: new Audio('music/pajaro.mp3'),
    rata: new Audio('music/rata.mp3'),
    leon: new Audio('music/leon.mp3'),
    cerdo: new Audio('music/cerdo.mp3'),
    cuervo: new Audio('music/cuervo.mp3'),
    serpiente: new Audio('music/serpiente.mp3'),
    abeja: new Audio('music/abeja.mp3'),
    cabra: new Audio('music/cabra.mp3'),
    cacatua: new Audio('music/cacatua.mp3'),
    coyote: new Audio('music/coyote.mp3'),
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

  // Efecto para controlar el cronómetro
  useEffect(() => {
    if (gameOver || timeLeft === 0 || showScore) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameOver(true); // El juego se acaba cuando se termina el tiempo
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Limpiar el temporizador al desmontarse el componente
  }, [timeLeft, gameOver, showScore]);

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
    // Agregar las 21 preguntas adicionales
    {
      question: '¿Qué animal dice "neigh"?',
      answers: [
        { text: 'Caballo', isCorrect: true, sound: 'caballo' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
      ],
    },
    {
      question: '¿Qué animal dice "cluck"?',
      answers: [
        { text: 'Gallina', isCorrect: true, sound: 'gallina' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Oveja', isCorrect: false, sound: 'oveja' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
      ],
    },
    {
      question: '¿Qué animal dice "quack"?',
      answers: [
        { text: 'Pato', isCorrect: true, sound: 'pato' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
        { text: 'Oveja', isCorrect: false, sound: 'oveja' },
      ],
    },
    {
      question: '¿Qué animal dice "baa"?',
      answers: [
        { text: 'Oveja', isCorrect: true, sound: 'oveja' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
        { text: 'Caballo', isCorrect: false, sound: 'caballo' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
      ],
    },
    {
      question: '¿Qué animal dice "ribbit"?',
      answers: [
        { text: 'Rana', isCorrect: true, sound: 'rana' },
        { text: 'Pato', isCorrect: false, sound: 'pato' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
      ],
    },
    {
      question: '¿Qué animal dice "hoot"?',
      answers: [
        { text: 'Búho', isCorrect: true, sound: 'buho' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
      ],
    },
    {
      question: '¿Qué animal dice "chirp"?',
      answers: [
        { text: 'Pájaro', isCorrect: true, sound: 'pajaro' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
      ],
    },
    {
      question: '¿Qué animal dice "squeak"?',
      answers: [
        { text: 'Rata', isCorrect: true, sound: 'rata' },
        { text: 'Oveja', isCorrect: false, sound: 'oveja' },
        { text: 'Caballo', isCorrect: false, sound: 'caballo' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
      ],
    },
    {
      question: '¿Qué animal dice "growl"?',
      answers: [
        { text: 'León', isCorrect: true, sound: 'leon' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
      ],
    },
    {
      question: '¿Qué animal dice "grunt"?',
      answers: [
        { text: 'Cerdo', isCorrect: true, sound: 'cerdo' },
        { text: 'Caballo', isCorrect: false, sound: 'caballo' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
      ],
    },
    {
      question: '¿Qué animal dice "caw"?',
      answers: [
        { text: 'Cuervo', isCorrect: true, sound: 'cuervo' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
      ],
    },
    {
      question: '¿Qué animal dice "meow"?',
      answers: [
        { text: 'Gato', isCorrect: true, sound: 'gato' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Oveja', isCorrect: false, sound: 'oveja' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
      ],
    },
    {
      question: '¿Qué animal dice "moo"?',
      answers: [
        { text: 'Vaca', isCorrect: true, sound: 'vaca' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Oveja', isCorrect: false, sound: 'oveja' },
      ],
    },
    {
      question: '¿Qué animal dice "hiss"?',
      answers: [
        { text: 'Serpiente', isCorrect: true, sound: 'serpiente' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
      ],
    },
    {
      question: '¿Qué animal dice "buzz"?',
      answers: [
        { text: 'Abeja', isCorrect: true, sound: 'abeja' },
        { text: 'Pato', isCorrect: false, sound: 'pato' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
      ],
    },
    {
      question: '¿Qué animal dice "whinny"?',
      answers: [
        { text: 'Caballo', isCorrect: true, sound: 'caballo' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
      ],
    },
    {
      question: '¿Qué animal dice "bleat"?',
      answers: [
        { text: 'Cabra', isCorrect: true, sound: 'cabra' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Oveja', isCorrect: false, sound: 'oveja' },
      ],
    },
    {
      question: '¿Qué animal dice "squawk"?',
      answers: [
        { text: 'Cacatúa', isCorrect: true, sound: 'cacatua' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
      ],
    },
    {
      question: '¿Qué animal dice "roar"?',
      answers: [
        { text: 'León', isCorrect: true, sound: 'leon' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
      ],
    },
    {
      question: '¿Qué animal dice "yip"?',
      answers: [
        { text: 'Coyote', isCorrect: true, sound: 'coyote' },
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
      ],
    },
    {
      question: '¿Qué animal dice "chirp"?',
      answers: [
        { text: 'Perro', isCorrect: false, sound: 'perro' },
        { text: 'Gato', isCorrect: false, sound: 'gato' },
        { text: 'Vaca', isCorrect: false, sound: 'vaca' },
        { text: 'Pájaro', isCorrect: true, sound: 'pajaro' }, // Agregar sonido de pájaro
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
    setTimeLeft(30); // Reiniciar el tiempo
    setGameOver(false);
    if (backgroundMusic) {
      backgroundMusic.play(); // Reiniciar música de fondo
    }
    setIsPlaying(true); // Asegurar que la música se reanude
  };

  return (
    <div className="container-sonidos mt-0 text-center">
      <h1 className="display-4 text-light mb-4">🦻Juego de Sonidos de Animales</h1>

      {/* Botón para controlar la música de fondo */}
      <button
        className="btn btn-secondary mb-4"
        onClick={toggleBackgroundMusic}
      >
        {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
      </button>

      {/* Mostrar el cronómetro */}
      <h3 className='text-light'>{gameOver || showScore ? 'Tiempo Finalizado' : `Tiempo: ${timeLeft}s`}</h3>

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
            <h4 className='text-light'>
              Pregunta {currentQuestion + 1} de {questions.length}
            </h4>
            <p className='text-light'>{questions[currentQuestion].question}</p>
          </div>

          <div className=" justify-content-center">
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                key={index}
                className="btn btn-outline-primary col-5 m-8 shadow-sm text-light"
                style={{
                  background:"rgb(9, 12, 230)",
                  width:"200px"
                }}
                onClick={() => handleAnswerOptionClick(answer.isCorrect, answer.sound)}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {gameOver && (
        <div className="alert alert-danger mt-4">
          <h3>¡El tiempo se ha agotado!</h3>
          <button className="btn btn-danger mt-3" onClick={restartGame}>
            Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  );
};
