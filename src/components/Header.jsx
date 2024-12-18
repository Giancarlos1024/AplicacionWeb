import React from 'react';
import { NavLink } from 'react-router';
import '../assets/css/Header.css'

const Header = () => {
  return (
    <nav className='Nav-header'>
      <div className='logo-principal'>
        <img src="img/logo_sitioweb.png" alt="logo" />
        <NavLink to="/" className="titulo-header-principal"><span className='titulo-header'>Aplicación</span> Web Didáctico</NavLink>
      </div>
      <div className='enlaces-pagina'>
        <a href="#juegos-educativos">Juegos Educativos</a>
        <a href="#juegos-memoria">Juegos de Memoria</a>
        <a href="#juegos-didacticos-cognitivos">Juegos Didacticos Cognitivos</a>
        <a href="#juegos-preguntas">Juegos de Preguntas</a>
      </div>
      <div className='Nav-buscador'>
        <img src="img/buscador.png" alt="buscador" />
        <input type="text" name="" id="" placeholder="Buscar" />
      </div>
    </nav>
  );
};

export default Header;
