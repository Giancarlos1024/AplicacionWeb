import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/Ingles.css';

const Ingles = () => {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos
  const [record, setRecord] = useState(localStorage.getItem('record') || 0);

  const backgroundMusic = useRef(new Audio('music/musica_matematicas.mp3'));
  const correctSound = useRef(new Audio('music/correcto_matematicas.mp3'));
  const incorrectSound = useRef(new Audio('music/incorrecto.mp3'));

  const questions = [
    { question: '¿Cómo se escribe "perro" en inglés?', options: ['Cat', 'Dog', 'Bird'], correctAnswer: 'Dog' },
    { question: '¿Cómo se escribe "gato" en inglés?', options: ['Dog', 'Cat', 'Fish'], correctAnswer: 'Cat' },
    { question: '¿Cómo se escribe "manzana" en inglés?', options: ['Banana', 'Apple', 'Grapes'], correctAnswer: 'Apple' },
    { question: '¿Cómo se escribe "feliz" en inglés?', options: ['Sad', 'Happy', 'Angry'], correctAnswer: 'Happy' },
    { question: '¿Cómo se escribe "rojo" en inglés?', options: ['Blue', 'Red', 'Green'], correctAnswer: 'Red' },
    { question: '¿Qué significa "house" en español?', options: ['Casa', 'Perro', 'Mesa'], correctAnswer: 'Casa' },
    { question: '¿Qué significa "book" en español?', options: ['Libro', 'Bolígrafo', 'Escritorio'], correctAnswer: 'Libro' },
    { question: '¿Cómo se escribe "correr" en inglés?', options: ['Run', 'Walk', 'Fly'], correctAnswer: 'Run' },
    { question: '¿Cómo se dice "elefante" en inglés?', options: ['Elephant', 'Lion', 'Tiger'], correctAnswer: 'Elephant' },
    { question: '¿Cómo se escribe "grande" en inglés?', options: ['Big', 'Small', 'Tiny'], correctAnswer: 'Big' },
    { question: '¿Cómo se dice "amigo" en inglés?', options: ['Friend', 'Brother', 'Enemy'], correctAnswer: 'Friend' },
    { question: '¿Qué significa "teacher"?', options: ['Profesor', 'Estudiante', 'Padre'], correctAnswer: 'Profesor' },
    { question: '¿Qué significa "computer"?', options: ['Ordenador', 'Teléfono', 'Ventana'], correctAnswer: 'Ordenador' },
    { question: '¿Cómo se dice "nadar" en inglés?', options: ['Swim', 'Jump', 'Run'], correctAnswer: 'Swim' },
    { question: '¿Qué significa "blue"?', options: ['Azul', 'Rojo', 'Verde'], correctAnswer: 'Azul' },
    { question: '¿Qué significa "yellow"?', options: ['Amarillo', 'Negro', 'Blanco'], correctAnswer: 'Amarillo' },
    { question: '¿Cómo se dice "cielo" en inglés?', options: ['Sky', 'Sun', 'Star'], correctAnswer: 'Sky' },
    { question: '¿Cómo se dice "sol" en inglés?', options: ['Sun', 'Moon', 'Star'], correctAnswer: 'Sun' },
    { question: '¿Cómo se escribe "feliz cumpleaños" en inglés?', options: ['Happy Birthday', 'Merry Christmas', 'Good Morning'], correctAnswer: 'Happy Birthday' },
    { question: '¿Qué significa "table"?', options: ['Mesa', 'Silla', 'Ventana'], correctAnswer: 'Mesa' },
    { question: '¿Cómo se dice "ratón" en inglés?', options: ['Mouse', 'Cat', 'Dog'], correctAnswer: 'Mouse' },
    { question: '¿Qué significa "beautiful"?', options: ['Hermoso', 'Rápido', 'Triste'], correctAnswer: 'Hermoso' },
    { question: '¿Qué significa "cold"?', options: ['Frío', 'Caliente', 'Seco'], correctAnswer: 'Frío' },
    { question: '¿Qué significa "fast"?', options: ['Rápido', 'Lento', 'Pesado'], correctAnswer: 'Rápido' },
    { question: '¿Cómo se escribe "felicidad" en inglés?', options: ['Happiness', 'Sadness', 'Anger'], correctAnswer: 'Happiness' },
  ];
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      handleGameOver();
    }
  }, [timeLeft]);

  const handleAnswer = (answer) => {
    if (answer === questions[questionIndex].correctAnswer) {
      setScore(score + 1);
      correctSound.current.play();
    } else {
      incorrectSound.current.play();
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    alert(`¡Juego terminado! Tu puntuación es: ${score}/${questions.length}`);
    if (score > record) {
      localStorage.setItem('record', score);
      setRecord(score);
      alert('¡Nuevo récord!');
    }
    resetGame();
  };

  const resetGame = () => {
    setScore(0);
    setQuestionIndex(0);
    setTimeLeft(120);
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

  return (
    <div
      className="container text-center p-4 contenedor-ingles"
      id='contenedor-ingles-g'
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className='container-titulo-ingles'>
        <h1 className="mb-4 ingles-texto borde-texto fondo-color">🎮 Juego de Inglés para Niños</h1>
      </div>
      <h3 className="mb-4 ingles-texto">Pregunta {questionIndex + 1} de {questions.length}</h3>
      <h4 className="mb-4 ingles-texto">Tiempo restante: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</h4>
      <h4 className="mb-4 ingles-texto">Récord: {record}</h4>

      <button
        onClick={toggleBackgroundMusic}
        className="btn btn-lg"
        style={{
          backgroundColor: '#FFEB3B',
          fontWeight: 'bold',
          borderRadius: '50px',
          padding: '10px 30px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease',
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        {isPlaying ? 'Pausar Música 🎵' : 'Reproducir Música 🎶'}
      </button>

      <div className="mt-4">
        <div className='texto-preguntas-ingles'>
          <h2 className='ingles-texto'>{questions[questionIndex].question}</h2>
        </div>
        <div className="d-flex justify-content-center flex-wrap mt-3">
          {questions[questionIndex].options.map((option, index) => (
            <button
              key={index}
              className="btn btn-lg m-2"
              onClick={() => handleAnswer(option)}
              style={{
                backgroundColor: '#00BCD4',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '10px',
                width: '180px',
                padding: '10px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0288D1'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#00BCD4'}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className='ingles-texto'>Puntuación: {score}</h4>
      </div>
    </div>
  );
};

export default Ingles;