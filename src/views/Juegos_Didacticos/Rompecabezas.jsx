import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/Rompecabezas.css';
import { Modal, Button } from 'react-bootstrap';

export const Rompecabezas = () => {
  const [pieces, setPieces] = useState([]);
  const [board, setBoard] = useState([]);
  const [previousBoard, setPreviousBoard] = useState([]);
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // Temporizador de 2 minutos
  const [gameOver, setGameOver] = useState(false);

  const defaultImages = [
    'img/preguntasJuego/marte.jpg',
    'img/preguntasJuego/leon.jpg',
    'img/preguntasJuego/luna.jpg',
    'img/preguntasJuego/perro.webp',
    'img/preguntasJuego/sol.jpg',
    'img/fondos/fondo-rompe2.jpg',
    'img/fondos/fondoingles.jpg',
    'img/fondos/fondo2.jpg',
    'img/fondos/fondoespacio.jpg',
    'img/preguntasJuego/mitosis.jpg',
  ]; // Rutas de las imágenes predeterminadas

  const audioRef = useRef(new Audio('music/musica_matematicas.mp3'));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      startGame(imageUrl);
    }
  };

  const selectDefaultImage = (imageUrl) => {
    startGame(imageUrl);
  };

  const startGame = (imageUrl) => {
    setImage(imageUrl);
    const generatedPieces = generatePuzzlePieces();
    setPieces(generatedPieces);
    setBoard(new Array(generatedPieces.length).fill(null));
    setTimeLeft(120);
    setGameOver(false);
  };

  const generatePuzzlePieces = () => {
    const rows = 3;
    const cols = 3;
    const pieces = [];
    let id = 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        pieces.push({
          id: id++,
          xOffset: -col * 100,
          yOffset: -row * 100,
          placed: false,
        });
      }
    }
    return pieces.sort(() => Math.random() - 0.5);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('pieceId', id);
  };

  const handleDrop = (e, index) => {
    const pieceId = parseInt(e.dataTransfer.getData('pieceId'), 10);
    const pieceIndex = pieces.findIndex((p) => p.id === pieceId);

    if (board[index] === null && !pieces[pieceIndex].placed) {
      setPreviousBoard([...board]);

      const updatedBoard = [...board];
      updatedBoard[index] = pieces[pieceIndex];

      const updatedPieces = [...pieces];
      updatedPieces[pieceIndex].placed = true;

      setBoard(updatedBoard);
      setPieces(updatedPieces);

      if (checkWin(updatedBoard)) {
        setShowModal(true);
      }
    } else {
      audioRef.current.play();
    }
  };

  const undoMove = () => {
    if (previousBoard.length > 0) {
      setBoard(previousBoard);
      setPreviousBoard([]);

      const updatedPieces = [...pieces].map((piece) => {
        if (previousBoard.every((slot) => slot?.id !== piece.id)) {
          return { ...piece, placed: false };
        }
        return piece;
      });
      setPieces(updatedPieces);
    }
  };

  const checkWin = (currentBoard) => {
    return (
      currentBoard.length > 0 &&
      currentBoard.every((piece, index) => piece && piece.id === index + 1)
    );
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (timeLeft > 0 && !showModal && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, showModal, gameOver]);

  return (
    <div className="container-rompecabezas text-center mt-0">
      
      <div>
      <h1 className='text-light'>Rompecabezas</h1>
        <div className="mb-2 bloque-imagenes-rompecabeza">
          <div className="mb-4 text-data">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="form-control"
            />
          </div>
          <div className="justify-content-center">
            {defaultImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Default ${idx + 1}`}
                className="default-image mx-1 mb-2 imagenes-defecto"
                onClick={() => selectDefaultImage(img)}
              />
            ))}
          </div>
        </div>

        <div className='reproductor-movimiento'>
          <div className='tiempo-rompe'>
            <h5>Tiempo restante: {timeLeft} segundos</h5>
          </div>
          <div className="mb-0">
            <button className="btn btn-primary" onClick={toggleMusic}>
              {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
            </button>
          </div>

          <div className="mb-0">
            <button
              className="btn btn-warning"
              onClick={undoMove}
              disabled={previousBoard.length === 0}
            >
              Deshacer Movimiento
            </button>
          </div>
          
        </div>
      </div>

      {image && (
        <div className='dsdsds'>
          <div className="contenedor-rompecabeza-item justify-content-around align-items-start">
            <div>
              <h5 className='text-light'>Imagen de Referencia</h5>
              <img src={image} alt="Imagen de referencia" className="reference-image" />
              {gameOver && <h3 className="text-light">¡Se acabó el tiempo!</h3>}
            </div>

            <div className='cuadros-imagen'>
              <div className="puzzle-board">
                {board.map((slot, index) => (
                  <div
                    key={index}
                    className="puzzle-slot"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    {slot && (
                      <div
                        className="puzzle-piece"
                        style={{
                          backgroundImage: `url('${image}')`,
                          backgroundPosition: `${slot.xOffset}px ${slot.yOffset}px`,
                          backgroundSize: '300px 300px',
                        }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pieces-container mt-1">
                {pieces.map((piece) =>
                  !piece.placed ? (
                    <div
                      key={piece.id}
                      className="puzzle-piece"
                      draggable
                      onDragStart={(e) => handleDragStart(e, piece.id)}
                      style={{
                        backgroundImage: `url('${image}')`,
                        backgroundPosition: `${piece.xOffset}px ${piece.yOffset}px`,
                        backgroundSize: '300px 300px',
                      }}
                    ></div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>¡Felicidades!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Has completado el rompecabezas correctamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
