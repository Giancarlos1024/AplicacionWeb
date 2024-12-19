import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Ciencias = () => {
  const questions = [
    {
      question: "¿Cuál es el planeta más cercano al sol?",
      options: ["Venus", "Mercurio", "Marte", "Tierra"],
      correctAnswer: "Mercurio",
    },
    {
      question: "¿Qué gas necesitamos para respirar?",
      options: ["Oxígeno", "Dióxido de carbono", "Nitrógeno", "Metano"],
      correctAnswer: "Oxígeno",
    },
    {
      question: "¿Qué organelo celular se encarga de la producción de energía?",
      options: ["Núcleo", "Mitocondria", "Ribosoma", "Membrana celular"],
      correctAnswer: "Mitocondria",
    },
    {
      question: "¿Cuál es el líquido que cubre la mayor parte de la Tierra?",
      options: ["Agua", "Sangre", "Ácido", "Lava"],
      correctAnswer: "Agua",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isMusicPlaying, setIsMusicPlaying] = useState(true); // Estado para controlar la música

  // Rutas de los archivos de sonido
  const correctSound = new Audio("music/correcto_matematicas.mp3");
  const incorrectSound = new Audio("music/incorrecto.mp3");
  const backgroundMusic = new Audio("music/musica_matematicas.mp3");

  // Iniciar la música de fondo en bucle cuando el componente se monte
  useEffect(() => {
    backgroundMusic.loop = true;
    if (isMusicPlaying) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }

    return () => {
      backgroundMusic.pause(); // Detener la música cuando se desmonte el componente
    };
  }, [isMusicPlaying]); // Dependencia del estado isMusicPlaying

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (selectedOption === correctAnswer) {
      setFeedback("¡Correcto! 🎉");
      setScore(score + 1);
      correctSound.play(); // Reproducir sonido correcto
    } else {
      setFeedback(`Incorrecto. La respuesta correcta era: ${correctAnswer}.`);
      incorrectSound.play(); // Reproducir sonido incorrecto
    }

    // Avanzar a la siguiente pregunta
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setFeedback("");
        setSelectedOption("");
      } else {
        setFeedback(`¡Juego terminado! Tu puntaje es ${score + 1}`);
        setSelectedOption("");
      }
    }, 1500); // Espera 1.5 segundos antes de mostrar la siguiente pregunta o el puntaje final
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying); // Alternar entre reproducir y pausar la música
  };

  return (
    <div className="container py-5" style={{ backgroundColor: "#f0f8ff" }}>
      <h1 className="text-center text-primary mb-4">🎓 Juego de Ciencias Naturales</h1>

      {/* Botón para pausar o reproducir la música */}
      <div className="text-center mb-4">
        <button
          onClick={toggleMusic}
          className="btn btn-warning"
        >
          {isMusicPlaying ? "Pausar Música" : "Reproducir Música"}
        </button>
      </div>

      {currentQuestionIndex < questions.length ? (
        <div className="card p-4 shadow-lg rounded" style={{ backgroundColor: "#fef5e6" }}>
          <h2 className="text-center text-info">{questions[currentQuestionIndex].question}</h2>
          <form onSubmit={handleSubmit}>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="option"
                  id={`option-${index}`}
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  required
                />
                <label className="form-check-label" htmlFor={`option-${index}`}>
                  {option}
                </label>
              </div>
            ))}
            <button type="submit" className="btn btn-success mt-3 w-100">
              Verificar Respuesta
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-success">{feedback}</h2>
          <button
            onClick={() => {
              setScore(0);
              setCurrentQuestionIndex(0);
            }}
            className="btn btn-primary mt-3"
          >
            Volver a jugar
          </button>
        </div>
      )}

      {feedback && (
        <div className="text-center mt-3">
          <h4>{feedback}</h4>
          <h3>Puntaje: {score}</h3>
        </div>
      )}
    </div>
  );
};


