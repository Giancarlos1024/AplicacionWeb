import React, { useState } from "react";
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

  // Referencia para la música de fondo
  const backgroundMusic = React.useRef(new Audio("music/musica_matematicas.mp3"));
  // Referencia para el sonido de respuesta correcta
  const correctAnswerSound = React.useRef(new Audio("music/correcto_matematicas.mp3"));
  // Referencia para el sonido de error
  const incorrectAnswerSound = React.useRef(new Audio("music/incorrecto.mp3"));

  // Generar una pregunta de matemáticas aleatoria
  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1; // Generar números aleatorios
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ["+", "-", "*", "/"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let correctAnswer;

    if (operation === "/") {
      // Asegurarse de que la división es exacta
      correctAnswer = Math.floor(num1 / num2); // Resultado entero
      setQuestion(`${correctAnswer * num2} ÷ ${num2}`); // Modificar la pregunta para que sea consistente
      setAnswer(correctAnswer.toString()); // Guardar respuesta correcta como string
    } else {
      correctAnswer = eval(`${num1} ${operation} ${num2}`);
      setQuestion(`${num1} ${operation} ${num2}`);
      setAnswer(correctAnswer.toString());
    }

    setFeedback("");
    setFeedbackClass("");
  };

  // Manejar respuesta del jugador
  const handleAnswer = (event) => {
    event.preventDefault();
    const playerAnswer = event.target.elements.playerAnswer.value;

    if (playerAnswer === answer) {
      setFeedback("¡Correcto! 🎉 ¡Eres un genio!");
      setFeedbackClass("text-success");
      setScore(score + 1);
      correctAnswerSound.current.play(); // Reproducir sonido de respuesta correcta
    } else {
      setFeedback(`Incorrecto. La respuesta era ${answer}. ¡Inténtalo de nuevo!`);
      setFeedbackClass("text-danger");
      incorrectAnswerSound.current.play(); // Reproducir sonido de respuesta incorrecta
    }

    setModalVisible(true); // Mostrar el modal
    event.target.reset();
  };

  const handleModalClose = () => {
    setModalVisible(false);
    generateQuestion(); // Generar nueva pregunta
  };

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
    backgroundMusic.current.loop = true; // Repetir música en bucle
    backgroundMusic.current.volume = 0.5; // Ajustar volumen
    backgroundMusic.current.play();

    return () => {
      backgroundMusic.current.pause(); // Detener música al desmontar el componente
    };
  }, []);

  return (
    <div className="math-game-container" style={{ background: "#f0f8ff", minHeight: "100vh" }}>
      <div className="container py-5">
        <h1 className="text-center text-primary fw-bold">🧮 Juego de Matemáticas</h1>
        <button
          className={`btn ${isPlaying ? "btn-danger" : "btn-success"} mb-4`}
          onClick={toggleMusic}
        >
          {isPlaying ? "Pausar Música 🎵" : "Reproducir Música 🎵"}
        </button>
        <div className="card p-4 shadow-lg rounded" style={{ background: "#fef5e6" }}>
          <h2 className="text-center fw-bold" style={{ color: "#ff6347" }}>¡Responde esta pregunta!</h2>
          <h3 className="text-center text-info display-4 my-4">{question}</h3>
          <form onSubmit={handleAnswer} className="mt-1">
            <div className="form-group">
              <label htmlFor="playerAnswer" className="form-label fs-4">Tu respuesta:</label>
              <input
                type="number"
                id="playerAnswer"
                name="playerAnswer"
                className="form-control border-warning text-center"
                placeholder="Escribe aquí"
                required
                style={{ fontSize: "1.5rem" }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block mt-3"
              style={{ fontSize: "1.25rem", padding: "0.75rem" }}
            >
              Verificar
            </button>
          </form>
        </div>
        <div className="text-center mt-4">
          <h3 className="fw-bold">
            Puntaje: <span className="badge bg-success" style={{ fontSize: "1.5rem" }}>{score}</span>
          </h3>
        </div>
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
