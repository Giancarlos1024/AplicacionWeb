import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/Rompecabezas.css';
import { Modal, Button } from 'react-bootstrap';

export const Rompecabezas = () => {
  const [pieces, setPieces] = useState([]);
  const [board, setBoard] = useState([]);
  const [previousBoard, setPreviousBoard] = useState([]); // Almacena el estado anterior del tablero
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(new Audio('music/musica_matematicas.mp3'));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      const generatedPieces = generatePuzzlePieces();
      setPieces(generatedPieces);
      setBoard(new Array(generatedPieces.length).fill(null));
    }
  };

  const generatePuzzlePieces = () => {
    const rows = 3; // Número de filas
    const cols = 3; // Número de columnas
    const pieces = [];
    let id = 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        pieces.push({
          id: id++,
          xOffset: -col * 100, // Ajustar según el tamaño de la imagen
          yOffset: -row * 100,
          placed: false,
        });
      }
    }
    return pieces.sort(() => Math.random() - 0.5); // Mezclar las piezas
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('pieceId', id);
  };

  const handleDrop = (e, index) => {
    const pieceId = parseInt(e.dataTransfer.getData('pieceId'), 10);
    const pieceIndex = pieces.findIndex((p) => p.id === pieceId);

    if (board[index] === null && !pieces[pieceIndex].placed) {
      setPreviousBoard([...board]); // Guarda el estado anterior

      const updatedBoard = [...board];
      updatedBoard[index] = pieces[pieceIndex];

      const updatedPieces = [...pieces];
      updatedPieces[pieceIndex].placed = true;

      setBoard(updatedBoard);
      setPieces(updatedPieces);

      if (checkWin(updatedBoard)) {
        setShowModal(true); // Mostrar el modal si el rompecabezas está completo
      }
    } else {
      audioRef.current.play(); // Reproducir sonido de error
    }
  };

  const undoMove = () => {
    if (previousBoard.length > 0) {
      setBoard(previousBoard); // Restaura el tablero anterior
      setPreviousBoard([]); // Limpia el estado anterior para evitar múltiples "deshacer"

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
    // Verificar si las piezas están en el orden correcto
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

  return (
    <div className="container text-center mt-5">
      <h1>Rompecabezas</h1>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="form-control"
        />
      </div>

      {/* Botón para reproducir/pausar música */}
      <div className="mb-4">
        <button className="btn btn-primary" onClick={toggleMusic}>
          {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
        </button>
      </div>

      {/* Botón para deshacer movimiento */}
      <div className="mb-4">
        <button
          className="btn btn-warning"
          onClick={undoMove}
          disabled={previousBoard.length === 0} // Deshabilitar si no hay movimientos para deshacer
        >
          Deshacer Movimiento
        </button>
      </div>

      {image && (
        <div className="d-flex justify-content-around align-items-start">
          {/* Imagen de referencia */}
          <div>
            <h5>Imagen de Referencia</h5>
            <img src={image} alt="Imagen de referencia" className="reference-image" />
          </div>

          {/* Tablero del rompecabezas */}
          <div>
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

            <div className="pieces-container mt-4">
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
      )}

      {/* Modal de Felicitaciones */}
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
