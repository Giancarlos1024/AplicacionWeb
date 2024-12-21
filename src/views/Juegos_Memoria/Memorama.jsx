import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/Memorama.css";

export const Memorama = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bestTime, setBestTime] = useState(
    Array(5).fill(null) // Inicializa tiempos récord para 5 niveles
  );
  const [gameOver, setGameOver] = useState(false); // Nuevo estado


  const backgroundMusicRef = useRef(null);
  const correctSoundRef = useRef(null);
  const incorrectSoundRef = useRef(null);
  const timerRef = useRef(null);

  const levels = [
    { pairs: 2, timeLimit: 30 },
    { pairs: 4, timeLimit: 60 },
    { pairs: 6, timeLimit: 70 },
    { pairs: 8, timeLimit: 80 },
    { pairs: 10, timeLimit: 100 },
  ];

  const images = [
    "🐶",
    "🐱",
    "🦄",
    "🐸",
    "🐧",
    "🐢",
    "🦋",
    "🐞",
    "🐙",
    "🦊",
    "🐨",
    "🐯",
  ];

  useEffect(() => {
    startLevel(level);
    return () => clearInterval(timerRef.current); // Limpia el temporizador al desmontar
  }, [level]);

  const startLevel = (level) => {
    const { pairs, timeLimit } = levels[level - 1];
    const levelImages = images.slice(0, pairs);
    const shuffledCards = shuffle([...levelImages, ...levelImages]).map(
      (image, index) => ({
        id: index,
        image,
        flipped: false,
      })
    );
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimeLeft(timeLimit);
    setGameOver(false); // Reinicia el estado del juego
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          clearInterval(timerRef.current);
          alert("⏰ ¡Tiempo agotado! Intenta nuevamente.");
          setGameOver(true); // Indica que el juego terminó
          return 0;
        }
      });
    }, 1000);
  };

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const handleCardClick = (id) => {
    if (gameOver || flippedCards.length >= 2 || flippedCards.includes(id) || matchedCards.includes(id)) return;

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(updatedCards);
    setFlippedCards((prev) => [...prev, id]);
    setMoves((prev) => prev + 1);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      const firstImage = cards.find((card) => card.id === firstCard).image;
      const secondImage = cards.find((card) => card.id === secondCard).image;
  
      if (firstImage === secondImage) {
        // Pareja correcta
        setMatchedCards((prev) => [...prev, firstCard, secondCard]);
  
        if (matchedCards.length + 2 === cards.length) {
          clearInterval(timerRef.current);
          const currentTime = levels[level - 1].timeLimit - timeLeft;
          if (!bestTime[level - 1] || currentTime < bestTime[level - 1]) {
            const newBestTime = [...bestTime];
            newBestTime[level - 1] = currentTime;
            setBestTime(newBestTime);
          }
  
          if (level < levels.length) {
            alert(
              `¡Nivel completado en ${currentTime} segundos! Avanzando al siguiente nivel.`
            );
            setLevel(level + 1);
          } else {
            setGameOver(true);
            alert(
              `🎉 ¡Felicidades! Completaste todos los niveles en el menor tiempo posible.`
            );
          }
        }
      } else {
        // Pareja incorrecta
        correctSoundRef.current.pause();
        correctSoundRef.current.currentTime = 0;
        incorrectSoundRef.current.play();
  
        setTimeout(() => {
          const updatedCards = cards.map((card) =>
            flippedCards.includes(card.id) ? { ...card, flipped: false } : card
          );
          setCards(updatedCards);
        }, 1000);
      }
      setFlippedCards([]);
    }
  }, [flippedCards, cards, matchedCards, level, timeLeft, bestTime]);
  

  const resetGame = () => {
    setLevel(1);
    setBestTime(Array(5).fill(null));
    clearInterval(timerRef.current);
    setGameOver(false);
    startLevel(1);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      alert("⏰ ¡Tiempo agotado! Intenta nuevamente.");
      incorrectSoundRef.current.play();
      const resetCards = cards.map((card) => ({ ...card, flipped: false }));
      setCards(resetCards);
      resetGame();
    }
  }, [timeLeft]);
  const toggleBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      if (isMusicPlaying) {
        backgroundMusicRef.current.pause();
      } else {
        backgroundMusicRef.current.play().catch(() => {
          console.warn("El navegador bloqueó la reproducción automática de audio.");
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div 
    className="container12 py-0"
    style={{
      height: level >= 4 ? "auto" : "100vh", // Cambia la altura para niveles 4 y 5
    }}
    >
      <audio ref={backgroundMusicRef} src="music/musica_matematicas.mp3" />
      <audio ref={correctSoundRef} src="music/correcto_matematicas.mp3" />
      <audio ref={incorrectSoundRef} src="music/incorrecto.mp3" />

      <div className="text-center mb-0">
        <h1 className="text-light">🧠 Juego de Memorama</h1>
        <div className="texto-memorama">
          <div className="text-center mt-0">
          <h4 className="text-info">Movimientos: {moves}</h4>
          <h4 className="text-success">
            Parejas encontradas: {matchedCards.length / 2} /{" "}
            {levels[level - 1].pairs}
          </h4>
        </div>
       </div>
        <button className="btn btn-primary me-2" onClick={toggleBackgroundMusic}>
          {isMusicPlaying ? "Pausar Música 🎵" : "Reproducir Música 🎶"}
        </button>
        <button className="btn btn-success" onClick={resetGame}>
          Reiniciar Juego
        </button>
      </div>

      <div className="text-center mb-3 texto-memorama">
        <div>
          <h4 className="text-lvl">Nivel: {level}</h4>
          <h4 className="text-lvl">Tiempo: {timeLeft} segundos</h4>
        </div>
        {bestTime[level - 1] && (
          <h5 className="text-success">
            Récord de nivel: {bestTime[level - 1]} segundos
          </h5>
        )}
      </div>

      <div className="memorama-grid1">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card1 ${
              card.flipped || matchedCards.includes(card.id) ? "flipped1" : ""
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-front1">{card.image}</div>
            <div className="card-back1">❓</div>
          </div>
        ))}
      </div>

    </div>
  );
};
