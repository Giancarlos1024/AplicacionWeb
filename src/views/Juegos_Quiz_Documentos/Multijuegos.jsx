import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Multijuegos.css';

const Multijuegos = () => {
  const navigate = useNavigate();

  // Mapa de juegos y sus imágenes
  const gameImages = {
    laberinto: 'img/laberinto.png',
    memorama: 'img/memorama.png',
    rompecabezas: 'img/rompecabezas.png',
    ingles: 'img/ingles.png',
    matematicas: 'img/matematicas.png',
  };

  const handleGameSelection = (game) => {
    navigate(`/${game}`);
  };

  return (
    <div className="container-multijuegos mt-0 text-center">
      <h1 className="display-6 text-primary mb-2 font-weight-bold">MULTIJUEGOS</h1>
      <div>
        <h4 className="mb-4 textmulti">Selecciona un juego para jugar</h4>
        <div className="row justify-content-center multijuego-div">
          {Object.keys(gameImages).map((gameKey) => (
            <div key={gameKey} className="col-md-4 game-button-container mb-4">
              <div className="game-card p-3 text-center contenedorJuegoMulti">
                <img
                  src={gameImages[gameKey]}
                  alt={gameKey}
                  className="game-image mb-3"
                  style={{ maxHeight: '180px', maxWidth: '200px' }}
                />
                <button
                  className="btn btn-outline-primary game-button w-100"
                  style={{
                    color: "#fff",
                    background: "rgb(13, 115, 231)"
                  }}
                  onClick={() => handleGameSelection(gameKey)}
                >
                  {gameKey.charAt(0).toUpperCase() + gameKey.slice(1)} Juego
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Multijuegos;
