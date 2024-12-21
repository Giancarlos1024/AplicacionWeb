import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../assets/css/Estudios.css';

export const Estudios = () => {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [timer, setTimer] = useState(120);  // Cronómetro de 60 segundos
  const [highScore, setHighScore] = useState(localStorage.getItem("highScore") || 0);  // Guardar mejor puntaje
  const [isGameOver, setIsGameOver] = useState(false);  // Estado para controlar el modal de fin de juego

  // Referencias de audio
  const backgroundMusic = useRef(null);
  const correctSound = useRef(null);
  const incorrectSound = useRef(null);

  // Cronómetro
  useEffect(() => {
    if (timer > 0 && questionIndex < questions.length) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      // Si el tiempo se acaba, muestra el modal
      setIsGameOver(true);
    }
  }, [timer, questionIndex]);

  // Inicializar audios
  useEffect(() => {
    backgroundMusic.current = new Audio("music/musica_matematicas.mp3");
    backgroundMusic.current.loop = true;
    correctSound.current = new Audio("music/correcto_matematicas.mp3");
    incorrectSound.current = new Audio("music/incorrecto.mp3");

    return () => {
      if (backgroundMusic.current) {
        backgroundMusic.current.pause();
      }
    };
  }, []);

  const questions = [
    {
      question: "¿Quién fue el primer presidente de los Estados Unidos?",
      options: [
        { text: "Abraham Lincoln", img: "img/leo.jpg" },
        { text: "George Washington", img: "img/washington.jpg" },
        { text: "Thomas Jefferson", img: "img/jefferson.jpg" },
      ],
      correctAnswer: "George Washington",
    },
    {
      question: "¿En qué año llegó Cristóbal Colón a América?",
      options: [
        { text: "1492", img: "img/1492.jpg" },
        { text: "1500", img: "img/1500.jpg" },
        { text: "1480", img: "img/1480.jpg" },
      ],
      correctAnswer: "1492",
    },
    {
      question: "¿Qué continente está al sur de América?",
      options: [
        { text: "Asia", img: "img/asia.jpg" },
        { text: "Antártida", img: "img/antarctica.jpg" },
        { text: "África", img: "img/africa.jpg" },
      ],
      correctAnswer: "Antártida",
    },
    {
      question: "¿Cómo se llama el océano que está al este de América?",
      options: [
        { text: "Océano Pacífico", img: "img/pacifico.jpg" },
        { text: "Océano Atlántico", img: "img/atlantico.jpg" },
        { text: "Océano Índico", img: "img/indico.jpg" },
      ],
      correctAnswer: "Océano Atlántico",
    },
    {
      question: "¿Qué país tiene la ciudad de El Cairo?",
      options: [
        { text: "Arabia Saudita", img: "img/arabia.jpg" },
        { text: "Egipto", img: "img/egipto.jpg" },
        { text: "Irak", img: "img/irak.jpg" },
      ],
      correctAnswer: "Egipto",
    },
    // Nuevas preguntas difíciles e intermedias
    {
      question: "¿En qué año se fundó la ciudad de Roma?",
      options: [
        { text: "753 a.C.", img: "img/roma.jpg" },
        { text: "500 a.C.", img: "img/roma.jpg" },
        { text: "1000 d.C.", img: "img/roma.jpg" },
      ],
      correctAnswer: "753 a.C.",
    },
    {
      question: "¿Quién fue el líder de la Revolución Francesa?",
      options: [
        { text: "Napoleón Bonaparte", img: "img/napoleon.jpg" },
        { text: "Maximilien Robespierre", img: "img/robespierre.jpg" },
        { text: "Luis XVI", img: "img/luis16.jpg" },
      ],
      correctAnswer: "Maximilien Robespierre",
    },
    {
      question: "¿Cuál es el río más largo del mundo?",
      options: [
        { text: "Río Amazonas", img: "img/amazonas.jpg" },
        { text: "Río Nilo", img: "img/nilo.jpg" },
        { text: "Río Yangtsé", img: "img/yangtse.jpg" },
      ],
      correctAnswer: "Río Amazonas",
    },
    {
      question: "¿Qué país fue el primero en dar el voto a las mujeres?",
      options: [
        { text: "Nueva Zelanda", img: "img/nueva_zelanda.jpg" },
        { text: "Estados Unidos", img: "img/estados_unidos.jpg" },
        { text: "Reino Unido", img: "img/reino_unido.jpg" },
      ],
      correctAnswer: "Nueva Zelanda",
    },
    {
      question: "¿Quién escribió la Declaración de Independencia de los Estados Unidos?",
      options: [
        { text: "Thomas Jefferson", img: "img/jefferson.jpg" },
        { text: "Abraham Lincoln", img: "img/lincoln.jpg" },
        { text: "George Washington", img: "img/washington.jpg" },
      ],
      correctAnswer: "Thomas Jefferson",
    },
    {
      question: "¿En qué continente se encuentra el desierto del Sahara?",
      options: [
        { text: "Asia", img: "img/asia.jpg" },
        { text: "África", img: "img/africa.jpg" },
        { text: "América", img: "img/america.jpg" },
      ],
      correctAnswer: "África",
    },
    {
      question: "¿Quién fue el emperador de la China durante la dinastía Qing?",
      options: [
        { text: "Kangxi", img: "img/kangxi.jpg" },
        { text: "Qianlong", img: "img/qianlong.jpg" },
        { text: "Cixi", img: "img/cixi.jpg" },
      ],
      correctAnswer: "Qianlong",
    },
    {
      question: "¿Qué antigua civilización construyó las pirámides de Giza?",
      options: [
        { text: "Egipcios", img: "img/piramides.jpg" },
        { text: "Mayas", img: "img/mayas.jpg" },
        { text: "Aztecas", img: "img/aztecas.jpg" },
      ],
      correctAnswer: "Egipcios",
    },
    {
      question: "¿Qué guerra terminó con la firma del Tratado de Versalles en 1919?",
      options: [
        { text: "Primera Guerra Mundial", img: "img/primera_guerra.jpg" },
        { text: "Segunda Guerra Mundial", img: "img/segunda_guerra.jpg" },
        { text: "Guerra de Vietnam", img: "img/vietnam.jpg" },
      ],
      correctAnswer: "Primera Guerra Mundial",
    },
    {
      question: "¿En qué país se originó la civilización maya?",
      options: [
        { text: "México", img: "img/mexico.jpg" },
        { text: "Guatemala", img: "img/guatemala.jpg" },
        { text: "Perú", img: "img/peru.jpg" },
      ],
      correctAnswer: "Guatemala",
    },
    {
      question: "¿Cuál es la capital de Australia?",
      options: [
        { text: "Sídney", img: "img/sidney.jpg" },
        { text: "Melbourne", img: "img/melbourne.jpg" },
        { text: "Canberra", img: "img/canberra.jpg" },
      ],
      correctAnswer: "Canberra",
    },
    {
      question: "¿En qué año terminó la Segunda Guerra Mundial?",
      options: [
        { text: "1945", img: "img/1945.jpg" },
        { text: "1940", img: "img/1940.jpg" },
        { text: "1950", img: "img/1950.jpg" },
      ],
      correctAnswer: "1945",
    },
    {
      question: "¿Cuál es la ciudad más antigua de América?",
      options: [
        { text: "Ciudad de México", img: "img/ciudad_mexico.jpg" },
        { text: "Santiago", img: "img/santiago.jpg" },
        { text: "La Habana", img: "img/habana.jpg" },
      ],
      correctAnswer: "La Habana",
    },
    {
      question: "¿Qué civilización construyó Machu Picchu?",
      options: [
        { text: "Incas", img: "img/incas.jpg" },
        { text: "Aztecas", img: "img/aztecas.jpg" },
        { text: "Mayas", img: "img/mayas.jpg" },
      ],
      correctAnswer: "Incas",
    },
    {
      question: "¿Qué importante figura histórica luchó por la independencia de la India?",
      options: [
        { text: "Mahatma Gandhi", img: "img/gandhi.jpg" },
        { text: "Jawaharlal Nehru", img: "img/nehru.jpg" },
        { text: "Indira Gandhi", img: "img/indira.jpg" },
      ],
      correctAnswer: "Mahatma Gandhi",
    },
    {
      question: "¿Quién fue el líder del Imperio Mongol?",
      options: [
        { text: "Genghis Khan", img: "img/genghis.jpg" },
        { text: "Kublai Khan", img: "img/kublai.jpg" },
        { text: "Tamerlán", img: "img/tamerlan.jpg" },
      ],
      correctAnswer: "Genghis Khan",
    },
    {
      question: "¿Qué imperio construyó el Taj Mahal?",
      options: [
        { text: "Imperio Mughal", img: "img/mughal.jpg" },
        { text: "Imperio Otomano", img: "img/otomano.jpg" },
        { text: "Imperio Romano", img: "img/romano.jpg" },
      ],
      correctAnswer: "Imperio Mughal",
    },
    {
      question: "¿Cuál fue la primera civilización en desarrollar la escritura?",
      options: [
        { text: "Sumerios", img: "img/sumerios.jpg" },
        { text: "Egipcios", img: "img/egipcios.jpg" },
        { text: "Mayas", img: "img/mayas.jpg" },
      ],
      correctAnswer: "Sumerios",
    },
    {
      question: "¿Qué civilización construyó la Muralla China?",
      options: [
        { text: "China", img: "img/muralla_china.jpg" },
        { text: "Mongoles", img: "img/mongoles.jpg" },
        { text: "Japón", img: "img/japon.jpg" },
      ],
      correctAnswer: "China",
    },
    {
      question: "¿Cuál fue el último estado en unirse a los Estados Unidos?",
      options: [
        { text: "Hawái", img: "img/hawai.jpg" },
        { text: "Alaska", img: "img/alaska.jpg" },
        { text: "California", img: "img/california.jpg" },
      ],
      correctAnswer: "Hawái",
    }
  
  ];
  


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
        if (score > highScore) {
          localStorage.setItem("highScore", score);
          setHighScore(score);
        }
        alert(`¡Juego terminado! Tu puntuación es: ${score + 1}/${questions.length}`);
        setScore(0);
        setQuestionIndex(0);
        setTimer(10);
      }, 500);
    }
  };

  const toggleBackgroundMusic = () => {
    if (isMusicPlaying) {
      backgroundMusic.current.pause();
    } else {
      backgroundMusic.current.play();
    }
    setIsMusicPlaying((prevState) => !prevState);
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionIndex(0);
    setTimer(10);
    setIsGameOver(false);
  };

  return (
    <div className="container py-2 contenedor-estudios-fondo">
      <div className="p-1">
        <div className="texto-titulo-estudios">
          <h1 className="text-center text-light font-weight-bold  animate-fadeIn">
            🌎 Juego de Estudios Sociales
          </h1>
        </div>

        {/* Música de fondo */}
        <div className="text-center mb-2">
          <button
            onClick={toggleBackgroundMusic}
            className="btn btn-lg btn-info boton-reproduccion"
            style={{ fontSize: "1.2rem" }}
          >
            {isMusicPlaying ? "Pausar Música" : "Reproducir Música"}
          </button>
        </div>

        {/* Cronómetro */}
        <div className="text-center mb-4 tiempo-estudios">
          <h3 className="text-light font-weight-bold ">Tiempo restante: {timer}s</h3>
          <h5 className=" text-light">Mejor Puntaje: {highScore}</h5>
        </div>
        
        {/* Pregunta */}
        <div className="question-container animate-slideInUp">
          <h2 className="text-center text-light mb-4">{questions[questionIndex].question}</h2>
        </div>

        {/* Opciones */}
        <div className="d-flex justify-content-center flex-wrap mt-3">
          {questions[questionIndex].options.map((option, index) => (
            <button
              key={index}
              className="btn btn-lg btn-outline-primary m-2 px-4 py-2 question-option"
              id="opcionboton"
              onClick={() => handleAnswer(option.text)}
              style={{
                fontSize: "1.2rem",
                backgroundImage: `url(${option.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                color:"#fff",
                background:"rgba(231, 219, 219, 0.18)",
                boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                animation: "fadeInOption 0.5s ease-in-out",
              }}
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* Puntuación */}
        <div className="mt-4 text-center">
          <h4 className="font-weight-bold text-light">Puntuación: {score}</h4>
        </div>
      </div>

      {/* Modal de Fin de Juego */}
      {isGameOver && (
        <div className="modal show d-block" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">¡Juego Terminado!</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setIsGameOver(false)}
                  style={{ position: "absolute", top: "-10px", right: "10px", color: "white", background:"none", border:"none", fontSize:"30px" }}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="text-center">¡Excelente trabajo!</p>
                <p className="text-center">Tu puntuación final es: <strong>{score}</strong></p>
                <div className="text-center">
                  <button className="btn btn-primary" onClick={handleRestart}>
                    Volver a jugar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
