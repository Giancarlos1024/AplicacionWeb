// Header.js
import React, { useState } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import '../assets/css/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Obtén la ubicación actual

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      switch (searchQuery.toLowerCase()) {
        case 'ciencias':
          navigate('/ciencias');
          break;
        case 'educacion':
          navigate('/educacion');
          break;
        case 'ingles':
          navigate('/ingles');
          break;
        case 'estudios':
          navigate('/estudios');
          break;
        case 'lenguaje':
          navigate('/lenguaje');
          break;
        case 'matematicas':
          navigate('/matematicas');
          break;
        case 'sopaletras':
          navigate('/sopaletras');
          break;
        case 'rompecabezas':
          navigate('/rompecabezas');
          break;
        case 'laberinto':
          navigate('/laberinto');
          break;
        case 'preguntas':
          navigate('/preguntas');
          break;
        case 'sonidos':
          navigate('/sonidos');
          break;
        case 'multijuegos':
          navigate('/multijuegos');
          break;
        case 'memorama':
          navigate('/memorama');
          break;
        default:
          alert('Juego no encontrado');
      }
    }
};


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Detectar si estás en la página principal o en un juego
  const isHomePage = location.pathname === '/';

  return (
    <nav className="Nav-header">
      <div className="logo-principal">
        <img src="img/LogoE.png" alt="logo" />
        <NavLink to="/" className="titulo-header-principal">
          <span className="titulo-header">ACADEMIA REPÚBLICA DEL ECUADOR</span>
        </NavLink>
      </div>
      <button className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`enlaces-pagina ${menuOpen ? 'open' : ''}`}>
        {isHomePage ? (
          <>
            <a href="#juegos-educativos">Juegos Educativos</a>
            <a href="#juegos-memoria">Juegos de Memoria</a>
            <a href="#juegos-didacticos-cognitivos">Juegos Didácticos Cognitivos</a>
            <a href="#juegos-preguntas">Juegos de Preguntas</a>
          </>
        ) : (
          <>
            <NavLink to="/">Volver al Inicio</NavLink>
            <NavLink to="/multijuegos">Otros Juegos</NavLink>
          </>
        )}
        <div className="Nav-buscador">
          <img src="img/buscador.png" alt="buscador" />
          <input
            type="text"
            placeholder="Buscar"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
