import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/Memorama.css";

export const Memorama = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const backgroundMusicRef = useRef(null);
  const correctSoundRef = useRef(null);
  const incorrectSoundRef = useRef(null);

  const images = [
    "🐶",
    "🐱",
    "🦄",
    "🐸",
    "🐧",
    "🐢",
    "🦋",
    "🐞",
  ];

  useEffect(() => {
    const shuffledCards = shuffle([...images, ...images]).map((image, index) => ({
      id: index,
      image,
      flipped: false,
    }));
    setCards(shuffledCards);
  }, []);

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const handleCardClick = (id) => {
    if (flippedCards.length < 2 && !flippedCards.includes(id) && !matchedCards.includes(id)) {
      const updatedCards = cards.map((card) =>
        card.id === id ? { ...card, flipped: true } : card
      );
      setCards(updatedCards);
      setFlippedCards((prev) => [...prev, id]);
      setMoves((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      const firstImage = cards.find((card) => card.id === firstCard).image;
      const secondImage = cards.find((card) => card.id === secondCard).image;

      if (firstImage === secondImage) {
        setMatchedCards((prev) => [...prev, firstCard, secondCard]);

        if (correctSoundRef.current) correctSoundRef.current.play();
      } else {
        setTimeout(() => {
          const updatedCards = cards.map((card) =>
            flippedCards.includes(card.id) ? { ...card, flipped: false } : card
          );
          setCards(updatedCards);

          if (incorrectSoundRef.current) incorrectSoundRef.current.play();
        }, 1000);
      }

      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, cards]);

  const resetGame = () => {
    const shuffledCards = shuffle([...images, ...images]).map((image, index) => ({
      id: index,
      image,
      flipped: false,
    }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

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
    <div className="container py-5">
      <audio ref={backgroundMusicRef} src="music/musica_matematicas.mp3" />
      <audio ref={correctSoundRef} src="music/correcto_matematicas.mp3" />
      <audio ref={incorrectSoundRef} src="music/incorrecto.mp3" />

      <div className="text-center mb-4">
        <h1 className="text-primary">🧠 Juego de Memorama</h1>
        <p>
          Ayuda a los niños a mejorar su memoria, prestar atención y aprender a relacionar imágenes.
        </p>
        <button className="btn btn-primary me-2" onClick={toggleBackgroundMusic}>
          {isMusicPlaying ? "Pausar Música 🎵" : "Reproducir Música 🎶"}
        </button>
        <button className="btn btn-success" onClick={resetGame}>
          Reiniciar Juego
        </button>
      </div>

      <div className="memorama-grid1">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card1 ${card.flipped || matchedCards.includes(card.id) ? "flipped1" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-front1">{card.image}</div>
            <div className="card-back1">❓</div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <h4 className="text-info">Movimientos: {moves}</h4>
        <h4 className="text-success">
          Parejas encontradas: {matchedCards.length / 2} / {images.length}
        </h4>
      </div>
    </div>
  );
};
