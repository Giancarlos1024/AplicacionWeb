import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/Juego_preguntas.css';

const Juego_Preguntas = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundMusic, setBackgroundMusic] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Tiempo total en segundos

  const correctSound = new Audio('music/correcto_matematicas.mp3');
  const wrongSound = new Audio('music/incorrecto.mp3');

  useEffect(() => {
    const music = new Audio('music/musica_matematicas.mp3');
    music.loop = true;
    setBackgroundMusic(music);

    return () => {
      music.pause();
    };
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showScore) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowScore(true);
      if (backgroundMusic) {
        backgroundMusic.pause();
      }
    }
  }, [timeLeft, showScore, backgroundMusic]);

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

  const questions = [
    {
      question: '¿Cuántas patas tiene un perro?',
      image: 'img/preguntasJuego/perro.webp',
      answers: [
        { text: '2', isCorrect: false },
        { text: '4', isCorrect: true },
        { text: '6', isCorrect: false },
        { text: '8', isCorrect: false },
      ],
    },
    {
      question: '¿De qué color es el cielo durante un día soleado?',
      // image: 'images/cielo.png',
      answers: [
        { text: 'Rojo', isCorrect: false },
        { text: 'Azul', isCorrect: true },
        { text: 'Verde', isCorrect: false },
        { text: 'Negro', isCorrect: false },
      ],
    },
    {
      question: '¿Cuánto es 2 + 3?',
      // image: 'images/matematicas.png',
      answers: [
        { text: '4', isCorrect: false },
        { text: '5', isCorrect: true },
        { text: '6', isCorrect: false },
        { text: '7', isCorrect: false },
      ],
    },
    {
      question: '¿Quién es el presidente de EE.UU.?',
      // image: 'images/eeuu.png',
      answers: [
        { text: 'Donald Trump', isCorrect: true },
        { text: 'Joe Biden', isCorrect: false },
        { text: 'Barack Obama', isCorrect: false },
        { text: 'George Bush', isCorrect: false },
      ],
    },
    {
      question: '¿Cuál es el continente más grande?',
      // image: 'images/asia.png',
      answers: [
        { text: 'Asia', isCorrect: true },
        { text: 'África', isCorrect: false },
        { text: 'Europa', isCorrect: false },
        { text: 'América', isCorrect: false },
      ],
    },
    {
      question: '¿Cuánto es 10 - 7?',
      // image: 'images/resta.png',
      answers: [
        { text: '2', isCorrect: false },
        { text: '3', isCorrect: true },
        { text: '4', isCorrect: false },
        { text: '5', isCorrect: false },
      ],
    },
    {
      question: '¿Qué animal es conocido como el rey de la selva?',
      image: 'img/preguntasJuego/leon.jpg',
      answers: [
        { text: 'Elefante', isCorrect: false },
        { text: 'León', isCorrect: true },
        { text: 'Tigre', isCorrect: false },
        { text: 'Cebra', isCorrect: false },
      ],
    },
    {
      question: '¿Cuál es la capital de Francia?',
      // image: 'images/paris.png',
      answers: [
        { text: 'Londres', isCorrect: false },
        { text: 'París', isCorrect: true },
        { text: 'Madrid', isCorrect: false },
        { text: 'Roma', isCorrect: false },
      ],
    },
    {
      question: '¿Qué planeta es conocido como el planeta rojo?',
      image: 'img/preguntasJuego/marte.jpg',
      answers: [
        { text: 'Venus', isCorrect: false },
        { text: 'Marte', isCorrect: true },
        { text: 'Júpiter', isCorrect: false },
        { text: 'Saturno', isCorrect: false },
      ],
    },
    {
      question: '¿Cuál es el metal más pesado?',
      // image: 'images/plomo.png',
      answers: [
        { text: 'Oro', isCorrect: false },
        { text: 'Plomo', isCorrect: true },
        { text: 'Hierro', isCorrect: false },
        { text: 'Cobre', isCorrect: false },
      ],
    },
    {
      question: '¿Qué es H2O?',
      // image: 'images/agua.png',
      answers: [
        { text: 'Agua', isCorrect: true },
        { text: 'Hidrógeno', isCorrect: false },
        { text: 'Oxígeno', isCorrect: false },
        { text: 'Ácido', isCorrect: false },
      ],
    },
    {
      question: '¿Qué país tiene forma de bota?',
      // image: 'images/italia.png',
      answers: [
        { text: 'Italia', isCorrect: true },
        { text: 'España', isCorrect: false },
        { text: 'Grecia', isCorrect: false },
        { text: 'Portugal', isCorrect: false },
      ],
    },
    {
      question: '¿Quién pintó la Mona Lisa?',
      // image: 'images/monalisa.png',
      answers: [
        { text: 'Leonardo da Vinci', isCorrect: true },
        { text: 'Pablo Picasso', isCorrect: false },
        { text: 'Van Gogh', isCorrect: false },
        { text: 'Miguel Ángel', isCorrect: false },
      ],
    },
    {
      question: '¿En qué año llegó el hombre a la luna?',
      image: 'img/preguntasJuego/luna.jpg',
      answers: [
        { text: '1969', isCorrect: true },
        { text: '1970', isCorrect: false },
        { text: '1965', isCorrect: false },
        { text: '1975', isCorrect: false },
      ],
    },
    {
      question: '¿Qué instrumento tiene teclas blancas y negras?',
      // image: 'images/piano.png',
      answers: [
        { text: 'Piano', isCorrect: true },
        { text: 'Violín', isCorrect: false },
        { text: 'Flauta', isCorrect: false },
        { text: 'Guitarra', isCorrect: false },
      ],
    },
    {
      question: '¿Qué gas respiramos?',
      // image: 'images/oxigeno.png',
      answers: [
        { text: 'Oxígeno', isCorrect: true },
        { text: 'Nitrógeno', isCorrect: false },
        { text: 'Dióxido de carbono', isCorrect: false },
        { text: 'Helio', isCorrect: false },
      ],
    },
    {
      question: '¿Cuál es el océano más grande del mundo?',
      // image: 'img/pacifico.png',
      answers: [
        { text: 'Atlántico', isCorrect: false },
        { text: 'Pacífico', isCorrect: true },
        { text: 'Índico', isCorrect: false },
        { text: 'Ártico', isCorrect: false },
      ],
    },
    {
      question: '¿Qué idioma se habla en Brasil?',
      // image: 'images/brasil.png',
      answers: [
        { text: 'Español', isCorrect: false },
        { text: 'Portugués', isCorrect: true },
        { text: 'Inglés', isCorrect: false },
        { text: 'Francés', isCorrect: false },
      ],
    },
    {
      question: '¿Qué es un animal vertebrado?',
      // image: 'images/vertebrado.png',
      answers: [
        { text: 'Que tiene columna vertebral', isCorrect: true },
        { text: 'Que vuela', isCorrect: false },
        { text: 'Que nada', isCorrect: false },
        { text: 'Que no tiene huesos', isCorrect: false },
      ],
    },
    {
      question: '¿Qué moneda se utiliza en Japón?',
      // image: 'images/yen.png',
      answers: [
        { text: 'Yen', isCorrect: true },
        { text: 'Dólar', isCorrect: false },
        { text: 'Euro', isCorrect: false },
        { text: 'Won', isCorrect: false },
      ],
    },
    {
      question: '¿Qué es la mitosis?',
      image: 'img/preguntasJuego/mitosis.jpg',
      answers: [
        { text: 'División celular', isCorrect: true },
        { text: 'Fusión celular', isCorrect: false },
        { text: 'Reproducción sexual', isCorrect: false },
        { text: 'Mutación genética', isCorrect: false },
      ],
    },
    {
      question: '¿Quién escribió "Cien años de soledad"?',
      // image: 'images/gabo.png',
      answers: [
        { text: 'Gabriel García Márquez', isCorrect: true },
        { text: 'Mario Vargas Llosa', isCorrect: false },
        { text: 'Julio Cortázar', isCorrect: false },
        { text: 'Carlos Fuentes', isCorrect: false },
      ],
    },
    {
      question: '¿Cuál es el símbolo químico del oro?',
      // image: 'images/oro.png',
      answers: [
        { text: 'Au', isCorrect: true },
        { text: 'Ag', isCorrect: false },
        { text: 'Fe', isCorrect: false },
        { text: 'Pb', isCorrect: false },
      ],
    },
    {
      question: '¿Cuántos planetas hay en el sistema solar?',
      // image: 'images/sistema-solar.png',
      answers: [
        { text: '7', isCorrect: false },
        { text: '8', isCorrect: true },
        { text: '9', isCorrect: false },
        { text: '10', isCorrect: false },
      ],
    },
    {
      question: '¿Qué es el sol?',
      image: 'img/preguntasJuego/sol.jpg',
      answers: [
        { text: 'Un planeta', isCorrect: false },
        { text: 'Una estrella', isCorrect: true },
        { text: 'Una luna', isCorrect: false },
        { text: 'Un cometa', isCorrect: false },
      ],
    }
    
  ];
  
  

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      correctSound.play();
    } else {
      wrongSound.play();
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      if (backgroundMusic) {
        backgroundMusic.pause();
      }

      if (score + 1 === questions.length) {
        setGameWon(true);
      }
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setGameWon(false);
    setTimeLeft(60); // Reiniciar el tiempo
    if (backgroundMusic) {
      backgroundMusic.play();
    }
    setIsPlaying(true);
  };

  return (
    <div className="container-preguntas mt-0 text-center">
      <h1 className="display-4  mb-4">🙈Juego de Preguntas</h1>

      <button
        className="btn btn-secondary mb-1"
        onClick={toggleBackgroundMusic}
      >
        {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
      </button>

      <div className="mb-3 text-light">
        <h4>Tiempo restante: {timeLeft} segundos</h4>
      </div>

      {showScore ? (
        <div className="alert alert-info mt-4 shadow-lg rounded">
          {gameWon ? (
            <h3>
              ¡Felicidades, has ganado el juego! 🎉<br />
              Puntuación: {score} de {questions.length}
            </h3>
          ) : (
            <h3>
              ¡Juego terminado!<br />
              Puntuación: {score} de {questions.length}
            </h3>
          )}
          <button className="btn btn-success mt-3" onClick={restartGame}>
            Jugar de nuevo
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <div className="mb-4 text-light">
            <h4>
              Pregunta {currentQuestion + 1} de {questions.length}
            </h4>
            <div className='fondo-pregunta-juego'>
              <p>{questions[currentQuestion].question}</p>
            </div>
            {questions[currentQuestion].image && (
              <img
                src={questions[currentQuestion].image}
                alt="Imagen de la pregunta"
                className="img-fluid my-1"
                style={{ maxHeight: '150px' }}
              />
            )}
          </div>

          <div className="justify-content-center ">
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                key={index}
                className="btn btn-outline-primary col-5 shadow-sm text-light"
                style={{
                  background:"rgba(17, 124, 230, 0.86)",
                  width:"200px",
                  margin:"10px"
                }}
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
