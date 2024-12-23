import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/Matematicas.css"; // Archivo CSS para estilos personalizados

export const Matematicas = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [feedbackClass, setFeedbackClass] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [answerType, setAnswerType] = useState("number");
  const [timeLeft, setTimeLeft] = useState(120); // Tiempo en segundos
  const [gameOver, setGameOver] = useState(false);
  
  const [answeredCorrectly, setAnsweredCorrectly] = useState(0); // Contador de respuestas correctas

  // Referencia para la música de fondo
  const backgroundMusic = React.useRef(new Audio("music/musica_matematicas.mp3"));
  const correctAnswerSound = React.useRef(new Audio("music/correcto_matematicas.mp3"));
  const incorrectAnswerSound = React.useRef(new Audio("music/incorrecto.mp3"));

  // Generar una pregunta de matemáticas aleatoria
  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ["+", "-", "*", "/", "^", "sqrt", "fraction", ".", "()", "compare"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let correctAnswer;

    if (operation === "^") {
      correctAnswer = Math.pow(num1, num2);
      setQuestion(`${num1} ^ ${num2}`);
      setAnswer(correctAnswer.toString());
      setAnswerType("number");
    } else if (operation === "sqrt") {
      correctAnswer = Math.sqrt(num1);
      setQuestion(`√${num1}`);
      setAnswer(correctAnswer.toString());
      setAnswerType("number");
    } else if (operation === "fraction") {
      const num3 = Math.floor(Math.random() * 9) + 1;
      const num4 = Math.floor(Math.random() * 9) + 1;
      correctAnswer = (num1 / num2) + (num3 / num4);
      setQuestion(`${num1}/${num2} + ${num3}/${num4}`);
      setAnswer(correctAnswer.toString());
      setAnswerType("number");
    } else if (operation === ".") {
      const num1Decimal = parseFloat((Math.random() * 10).toFixed(1));
      const num2Decimal = parseFloat((Math.random() * 10).toFixed(1));
      correctAnswer = eval(`${num1Decimal} + ${num2Decimal}`);
      setQuestion(`${num1Decimal} + ${num2Decimal}`);
      setAnswer(correctAnswer.toString());
      setAnswerType("number");
    } else if (operation === "()") {
      correctAnswer = eval(`(${num1} + ${num2}) * ${num1}`);
      setQuestion(`(${num1} + ${num2}) * ${num1}`);
      setAnswer(correctAnswer.toString());
      setAnswerType("number");
    } else if (operation === "compare") {
      let correctComparison = "";
      if (num1 > num2) {
        correctComparison = "Mayor";
      } else if (num1 < num2) {
        correctComparison = "Menor";
      } else {
        correctComparison = "Igual";
      }

      setQuestion(`${num1} > ${num2}`);
      setAnswer(correctComparison);
      setAnswerType("text");
    } else {
      correctAnswer = eval(`${num1} ${operation} ${num2}`);
      setQuestion(`${num1} ${operation} ${num2}`);
      setAnswer(correctAnswer.toString());
      setAnswerType("number");
    }

    setFeedback("");
    setFeedbackClass("");
  };

  // Función para comparar respuestas con tolerancia en decimales
  const areNumbersClose = (num1, num2, tolerance = 0.01) => {
    return Math.abs(num1 - num2) < tolerance;
  };

  // Manejar respuesta del jugador
  const handleAnswer = (event) => {
    event.preventDefault();
    const playerAnswer = answerType === "number"
      ? parseFloat(event.target.elements.playerAnswer.value)
      : event.target.elements.playerAnswer.value.trim().toLowerCase();

    if (
      (answerType === "number" && areNumbersClose(playerAnswer, parseFloat(answer))) ||
      (answerType === "text" && playerAnswer === answer.toLowerCase())
    ) {
      setFeedback("¡Correcto! 🎉 ¡Eres un genio!");
      setFeedbackClass("text-success");
      setScore(score + 1);
      setAnsweredCorrectly(answeredCorrectly + 1); // Incrementar el contador de respuestas correctas
      correctAnswerSound.current.play(); // Reproducir sonido de respuesta correcta
    } else {
      setFeedback(`Incorrecto. La respuesta era ${answer}. ¡Inténtalo de nuevo!`);
      setFeedbackClass("text-danger");
      incorrectAnswerSound.current.play(); // Reproducir sonido de respuesta incorrecta
    }

    setModalVisible(true);
    event.target.reset();
  };

  const handleModalClose = () => {
    setModalVisible(false);
    generateQuestion(); // Generar nueva pregunta
  };

  // Función para iniciar el cronómetro
  useEffect(() => {
    if (gameOver) {
      if (answeredCorrectly < 25) {
        setFeedback(`¡Se acabó el tiempo! Tu puntuación final es ${score}.`);
      }
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer); // Detener el temporizador cuando el tiempo llegue a 0
          setGameOver(true); // Finalizar el juego cuando el tiempo se acaba
          return 0; // Asegurarse de que el tiempo no sea negativo
        }
        return prevTime - 1;
      });
    }, 1000);
    

    return () => clearInterval(timer); // Limpiar intervalo cuando el componente se desmonte
  }, [gameOver]);

  // Verificar si el jugador alcanzó las 25 respuestas correctas
  useEffect(() => {
    if (answeredCorrectly === 25) {
      setFeedback("¡Felicitaciones! Has ganado el juego. 🎉");
      setGameOver(true); // Terminar el juego
    }
  }, [answeredCorrectly]);

  // Manejar música de fondo
  const toggleMusic = () => {
    if (isPlaying) {
      backgroundMusic.current.pause();
    } else {
      backgroundMusic.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  React.useEffect(() => {
    generateQuestion();
    backgroundMusic.current.loop = true;
    backgroundMusic.current.volume = 0.5;
    backgroundMusic.current.play();

    return () => {
      backgroundMusic.current.pause(); // Detener música al desmontar el componente
    };
  }, []);

  const restartGame = () => {
    setScore(0); // Reiniciar la puntuación
    setAnsweredCorrectly(0); // Reiniciar las respuestas correctas
    setGameOver(false); // Restablecer el estado de fin de juego
    setTimeLeft(120); // Restablecer el tiempo
    generateQuestion(); // Generar una nueva pregunta
  };


  return (
    <div className="math-game-container" style={{minHeight: "100vh" }}>
      <div className="container ">
        <h1 className="text-center titulo-mate fw-bold">🧮 Juego de Matemáticas</h1>
        <div className="dsdsds">
         <div>
          <button
              className={`btn ${isPlaying ? "btn-danger" : "btn-success"}`}
              onClick={toggleMusic}
            >
              {isPlaying ? "Pausar Música 🎵" : "Reproducir Música 🎵"}
            </button>
         </div>
          <div className="text-center mt-0">
            <h3 className="fw-bold m-0">
              <span className="badge bg-danger" style={{ fontSize: "1.2rem" }}>Tiempo: {timeLeft} segundos</span>
            </h3>
          </div>
        </div>
        <div className="text-center mt-0">
          <h3 className="fw-bold titulo-mate">
            Puntuación: <span className="badge bg-success" style={{ fontSize: "1.5rem" }}>{score}</span>
          </h3>
        </div>
        <h2 className="text-center titulo-mate fw-bold">¡Responde esta pregunta!</h2>
        <div className="contenedorgeneral-matematicas">
          <div className="p-1 rounded contenedor-matematicas-block">
            
            <h3 className="text-center display-4 my-2" id="text-info">{question}</h3>
            <form onSubmit={handleAnswer} className="mt-0">
              <div className="form-group">
                <label htmlFor="playerAnswer" className="form-label text-light fs-4">Tu respuesta:</label>
                {answerType === "number" ? (
                  <input
                    type="number"
                    step="any"
                    id="playerAnswer"
                    name="playerAnswer"
                    className="form-control border-warning text-center"
                    placeholder="Escribe aquí"
                    required
                    disabled={gameOver} // Deshabilita el input si el juego terminó
                    style={{ fontSize: "1.4rem" }}
                  />
                ) : (
                  <input
                    type="text"
                    id="playerAnswer"
                    name="playerAnswer"
                    className="form-control border-warning text-center"
                    placeholder="Escribe 'Mayor', 'Menor' o 'Igual'"
                    required
                    disabled={gameOver} // Deshabilita el input si el juego terminó
                    style={{ fontSize: "1.5rem" }}
                  />
                )}
              </div>
              <button
                type="submit"
                className="btn btn-success btn-block mt-3"
                style={{ fontSize: "1.25rem", padding: "0.75rem" }}
                disabled={gameOver} // Deshabilita el botón de envío si el juego terminó
              >
                Verificar
              </button>
            </form>

          </div>
        </div>

        {/* Mostrar mensaje de fin de juego */}
        {gameOver && (
          <div className="text-center mt-4">
            <h3 className="fw-bold text-light">{feedback}</h3>
            <button
              className="btn btn-primary mt-3"
              style={{ fontSize: "1.25rem", padding: "0.75rem" }}
              onClick={restartGame} // Reinicia el juego
            >
              Jugar otra vez
            </button>
          </div>
        )}

      </div>

      {/* Modal para retroalimentación */}
      {modalVisible && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className={`modal-header ${feedbackClass}`}>
                <h5 className="modal-title">Resultado</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="fs-4">{feedback}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleModalClose}
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
