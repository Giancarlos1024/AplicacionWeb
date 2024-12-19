import React, { useState } from 'react';
import JuegoSonidos from '../Juegos_Otros/JuegoSonidos';
import JuegoMatematicas from '../Juegos_Otros/JuegoMatematicas';
import Laberinto from '../Juegos_Didacticos/Laberinto';
import { Memorama } from '../Juegos_Memoria/Memorama';
import { Rompecabezas } from '../Juegos_Didacticos/Rompecabezas';
import Ingles from '../Juegos_Educativos/Ingles';
import { Matematicas } from '../Juegos_Educativos/Matematicas';

// Componentes para los diferentes juegos

const Multijuegos = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameSelection = (game) => {
    setSelectedGame(game);
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 text-primary mb-4">Multijuegos</h1>
      
      {/* Selección de juego */}
      {!selectedGame ? (
        <div>
          <h4>Selecciona un juego para jugar:</h4>
          <div className="row justify-content-center mt-4">
            {/* <button
              className="btn btn-outline-primary m-3"
              onClick={() => handleGameSelection('sonidos')}
            >
              Juego de Sonidos de Animales
            </button>
            <button
              className="btn btn-outline-primary m-3"
              onClick={() => handleGameSelection('matematicas')}
            >
              Juego de Matemáticas
            </button> */}
            {/* Agrega más botones para otros juegos */}
            <button
              className="btn btn-outline-primary m-3"
              onClick={() => handleGameSelection('laberinto')}
            >
              Juego Laberinto
            </button>

            <button
              className="btn btn-outline-primary m-3"
              onClick={() => handleGameSelection('memorama')}
            >
              Juego de Memoria
            </button>
            <button
              className="btn btn-outline-primary m-3"
              onClick={() => handleGameSelection('rompecabezas')}
            >
              Juego de Rompecabezas
            </button>
            <button
              className="btn btn-outline-primary m-3"
              onClick={() => handleGameSelection('ingles')}
            >
              Juego de Ingles
            </button>
            <button
              className="btn btn-outline-primary m-3"
              onClick={() => handleGameSelection('matematicas')}
            >
              Juego de Matematicas
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Mostrar el juego seleccionado */}
          {/* {selectedGame === 'sonidos' && <JuegoSonidos />}
          {selectedGame === 'matematicas' && <JuegoMatematicas />} */}
          {/* Agrega más condicionales para otros juegos */}
          {selectedGame === 'laberinto' && <Laberinto />}
          {selectedGame === 'memorama' && <Memorama />}
          {selectedGame === 'rompecabezas' && <Rompecabezas />}
          {selectedGame === 'ingles' && <Ingles />}
          {selectedGame === 'matematicas' && <Matematicas />}
          
          {/* Botón para volver a la selección de juegos */}
          <button
            className="btn btn-secondary mt-4"
            onClick={() => setSelectedGame(null)}
          >
            Volver a seleccionar otro juego
          </button>
        </div>
      )}
    </div>
  );
};

export default Multijuegos;
