import React, { useState, useEffect } from "react";
import { Button, Typography, Card, Container } from "@mui/material";
// import "bootstrap/dist/css/bootstrap.min.css";
import '../../assets/css/Ciencias.css';

export const Ciencias = () => {
  const questions = [
    {
      question: "¿Qué animal es conocido por su capacidad para volar?",
      options: [
        { image: "https://www.superprof.pe/blog/wp-content/uploads/2022/01/pajaros-canto.jpg", text: "Pájaro", isCorrect: true },
        { image: "https://cdn0.bioenciclopedia.com/es/posts/1/7/1/pez_payaso_171_600.jpg", text: "Pez", isCorrect: false },
        { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ6efrr_QP5JT2SoMzRiH5hbDNWw1plryNoQ&s", text: "Serpiente", isCorrect: false },
        { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpl_py9kq0hv38tOK4mznhptBSNOAI-s8S7g&s", text: "Mono", isCorrect: false }
      ],
      correctAnswer: "Pájaro",
    },
    {
      question: "¿Cuál es el planeta más cercano al sol?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Mercurio", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Venus", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Marte", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Tierra", isCorrect: false }
      ],
      correctAnswer: "Mercurio",
    },
    //Preguntas adicionales (15 a 25)
    {
      question: "¿Cómo se llama la capa externa de la Tierra?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Corteza", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Manto", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Núcleo", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Atmósfera", isCorrect: false }
      ],
      correctAnswer: "Corteza",
    },
    {
      question: "¿Qué gas es más abundante en la atmósfera terrestre?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Nitrógeno", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Oxígeno", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Dióxido de carbono", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Helio", isCorrect: false }
      ],
      correctAnswer: "Nitrógeno",
    },
    {
      question: "¿Qué tipo de energía es la que se obtiene a partir del viento?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Energía eólica", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Energía solar", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Energía hidráulica", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Energía geotérmica", isCorrect: false }
      ],
      correctAnswer: "Energía eólica",
    },
    {
      question: "¿Qué continente tiene más especies de animales endémicos?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "África", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Asia", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Oceanía", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "América", isCorrect: false }
      ],
      correctAnswer: "África",
    },
    {
      question: "¿Cuál es el órgano responsable de la circulación de la sangre en el cuerpo humano?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Corazón", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Pulmones", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Riñones", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Hígado", isCorrect: false }
      ],
      correctAnswer: "Corazón",
    },
    {
      question: "¿Quién formuló la teoría de la relatividad?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Albert Einstein", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Nikola Tesla", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Isaac Newton", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Galileo Galilei", isCorrect: false }
      ],
      correctAnswer: "Albert Einstein",
    },
    {
      question: "¿Qué elemento químico tiene el símbolo O?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Oxígeno", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Oro", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Ozono", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Odinio", isCorrect: false }
      ],
      correctAnswer: "Oxígeno",
    },
    {
      question: "¿En qué capa de la atmósfera se encuentra la capa de ozono?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Estratosfera", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Termosfera", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Troposfera", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Exosfera", isCorrect: false }
      ],
      correctAnswer: "Estratosfera",
    },
    {
      question: "¿Qué fenómeno es responsable de la aurora boreal?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Interacción de partículas solares con la atmósfera", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Terremotos", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Huracanes", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Tsunamis", isCorrect: false }
      ],
      correctAnswer: "Interacción de partículas solares con la atmósfera",
    },
    {
      question: "¿Qué es el ADN?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Ácido desoxirribonucleico", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Ácido ribonucleico", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Proteína", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Célula", isCorrect: false }
      ],
      correctAnswer: "Ácido desoxirribonucleico",
    },
    {
      question: "¿En qué año fue lanzada la misión Apolo 11 a la Luna?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "1969", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "1971", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "1973", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "1975", isCorrect: false }
      ],
      correctAnswer: "1969",
    },
    {
      question: "¿Qué científico desarrolló la teoría de la evolución?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Charles Darwin", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Jean-Baptiste Lamarck", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Marie Curie", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Niels Bohr", isCorrect: false }
      ],
      correctAnswer: "Charles Darwin",
    },
    {
      question: "¿Qué gas provoca el efecto invernadero?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Dióxido de carbono", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Oxígeno", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Nitrógeno", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Metano", isCorrect: false }
      ],
      correctAnswer: "Dióxido de carbono",
    },
    {
      question: "¿Qué tipo de rocas se forman a partir de la solidificación de magma?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Rocas ígneas", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Rocas metamórficas", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Rocas sedimentarias", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Rocas carbonatadas", isCorrect: false }
      ],
      correctAnswer: "Rocas ígneas",
    },
    {
      question: "¿Qué planeta es conocido como el planeta rojo?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Marte", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Júpiter", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Tierra", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Venus", isCorrect: false }
      ],
      correctAnswer: "Marte",
    },
    {
      question: "¿Qué animal es conocido por ser el mamífero más grande del mundo?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Ballena azul", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Elefante", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Jirafa", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "León", isCorrect: false }
      ],
      correctAnswer: "Ballena azul",
    },
    {
      question: "¿Cuál es el órgano más grande del cuerpo humano?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Piel", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Hígado", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Cerebro", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Corazón", isCorrect: false }
      ],
      correctAnswer: "Piel",
    },
    {
      question: "¿Qué tipo de animal es una rana?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Anfibio", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Mamífero", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Reptil", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Ave", isCorrect: false }
      ],
      correctAnswer: "Anfibio",
    },
    {
      question: "¿Qué mineral es necesario para la formación de huesos?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Calcio", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Hierro", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Potasio", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Magnesio", isCorrect: false }
      ],
      correctAnswer: "Calcio",
    },
    {
      question: "¿Qué instrumento se utiliza para medir la presión atmosférica?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Barómetro", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Termómetro", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Anemómetro", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Hidrómetro", isCorrect: false }
      ],
      correctAnswer: "Barómetro",
    },
    {
      question: "¿Qué nombre recibe la unidad básica de la vida?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Célula", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Molécula", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Átomo", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Órgano", isCorrect: false }
      ],
      correctAnswer: "Célula",
    },
    {
      question: "¿Qué parte de la planta se encarga de realizar la fotosíntesis?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "Hojas", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "Raíces", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Tallo", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Flores", isCorrect: false }
      ],
      correctAnswer: "Hojas",
    },
    {
      question: "¿Qué provoca las mareas en la Tierra?",
      options: [
        { image: "img/ciencias/anonimo.jpg", text: "La Luna", isCorrect: true },
        { image: "img/ciencias/anonimo.jpg", text: "El Sol", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "El viento", isCorrect: false },
        { image: "img/ciencias/anonimo.jpg", text: "Terremotos", isCorrect: false }
      ],
      correctAnswer: "La Luna",
    }
  ];
  

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // 2 minutos en segundos
  const [gameEnded, setGameEnded] = useState(false);
  

  const correctSound = new Audio("music/correcto_matematicas.mp3");
  const incorrectSound = new Audio("music/incorrecto.mp3");
  const backgroundMusic = new Audio("music/musica_matematicas.mp3");

  useEffect(() => {
    backgroundMusic.loop = true;
    if (isMusicPlaying) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }

    return () => {
      backgroundMusic.pause();
    };
  }, [isMusicPlaying]);

  useEffect(() => {
    if (gameEnded === false) {
      setGameStartTime(new Date());
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setGameEnded(true);
            setFeedback("¡Tiempo agotado! Has perdido.");
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameEnded]);

  const handleOptionChange = (option) => {
    console.log("Option selected:", option); // Esto funcionará correctamente.
    setSelectedOption(option);
  };
  
  useEffect(() => {
    console.log("Selected option state updated:", selectedOption);
  }, [selectedOption]);
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Submit called. Current question index:", currentQuestionIndex);

    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (selectedOption && selectedOption.isCorrect) {
      setFeedback("¡Correcto! 🎉");
      setScore(score + 1);
      correctSound.play();
    } else {
      setFeedback(`Incorrecto. La respuesta correcta era: ${correctAnswer}.`);
      incorrectSound.play();
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1 && !gameEnded) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setFeedback("");
        setSelectedOption(null); // Reset option for the next question
      } else {
        setFeedback(`¡Juego terminado! Tu puntaje es ${score + 1}`);
        setGameEnded(true);
      }
    }, 1500);
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setTimeLeft(60);
    setGameEnded(false);
    setFeedback("");
    setGameStartTime(new Date());
  };

  return (
    <div className="contenedorGlobalCiencia">
      <Container className="contenedor-general"  style={{ padding: "1rem", borderRadius: "15px" }}>
      <Typography id="tituloJuego" variant="h3" align="center" color="primary" gutterBottom style={{ fontFamily: "Comic Sans MS", fontWeight: "bold" }}>
        🎓 ¡Juego de Ciencias Naturales!
      </Typography>

      <div className="text-center mb-4">
        <Button onClick={toggleMusic} variant="contained" color="warning" style={{ fontFamily: "Comic Sans MS", fontSize: "16px", padding: "10px 20px" }}>
          {isMusicPlaying ? "Pausar Música" : "Reproducir Música"}
        </Button>
      </div>

      {!gameEnded ? (
        <div className="contenedorDatos">
          <Typography id="tiempo-juego" variant="h5" align="center" color="error">
            ⏳ Tiempo restante: {timeLeft} segundos
          </Typography>

          <Typography id="preguntas-ciencia" variant="h4" align="center" color="primary" style={{ fontFamily: "Comic Sans MS" }}>
              {questions[currentQuestionIndex].question}
            </Typography>
          <Card style={{ padding: "1rem 0rem", display:"flex" ,boxShadow:"none", justifyContent:"center" , borderRadius: "10px"}}>
            
          {questions[currentQuestionIndex].options.map((option, index) => (
 
 
            <div
              key={index}
              onClick={() => handleOptionChange(option)}
              className="contenedor-img"
              style={{
                cursor: "pointer",
                margin: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                transform: selectedOption === option ? "scale(1.1)" : "scale(1)",
               
                background: selectedOption && selectedOption.text === option.text ? "yellow" : ""

              }}
            >
              <img
                src={option.image}
                alt={option.text}
                className="img-fluid"
                id="img-preguntas"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "5px",
                  
                }}
              />
              {selectedOption === option && (
                <div
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    color: "#4CAF50",
                    fontSize: "20px",
                  }}
                >
                  ✔
                </div>
              )}
              <Typography variant="body1" align="center" style={{ fontFamily: "Comic Sans MS" ,fontWeight: "bold" }}>
                {option.text}
              </Typography>
            </div>
          ))}

  


          </Card>
          <Button id="botton-Verificar" onClick={handleSubmit} variant="contained" color="success" fullWidth style={{ padding: "10px" }}>
              Verificar Respuesta
            </Button>
        </div>
      ) : (
        <div className="text-center">
          <Typography id="juego-terminado-texto" variant="h4" style={{ fontFamily: "Comic Sans MS", fontWeight: "bold" }}>
            {feedback}
          </Typography>
          <Button onClick={handleRestart} variant="contained" color="primary" style={{ marginTop: "1rem", padding: "10px 20px", fontFamily: "Comic Sans MS" }}>
            Volver a jugar
          </Button>
        </div>
      )}

      {feedback && !gameEnded && (
        <div className="text-center mt-3" >
          <Typography variant="h6" id="texto-informacion" style={{ fontFamily: "Comic Sans MS" }}>
            {feedback}
          </Typography>
          <Typography variant="h4" id="texto-informacion" style={{ fontFamily: "Comic Sans MS", fontWeight: "bold" }}>
            Puntaje: {score}
          </Typography>
        </div>
      )}
    </Container>
    </div>
  );
};
