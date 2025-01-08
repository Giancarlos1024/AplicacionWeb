import React from 'react'
import { NavLink } from 'react-router';
import Header from '../components/Header'
import '../assets/css/Home.css'
import { Footer } from '../components/Footer';
export const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <section className="FondoCarrusel-Banner">
        <div>
          <h1>Aplicación Web Didactica</h1>
          <p className='parrafoHome' >
            Es una herramienta educativa diseñada para facilitar el aprendizaje
            mediante la interacción activa del estudiante, utilizando enfoques 
            basados en los principios de la psicología cognitiva. 
            Estas aplicaciones buscan potenciar habilidades como la memoria, la 
            atención, el razonamiento, y la resolución de problemas, adaptándose 
            a las necesidades y niveles del estudiante.
          </p>
        </div>
      </section>
      <section id="juegos-educativos" className='titulo-juego-educativo'>
        <div className='contenedor-titulos'>
          <h1>JUEGOS <span className='seccion-juego'>EDUCATIVOS</span></h1>
        </div>
        <div className='contenedor-juegos-educativos'>
          <div className='juego-div'>
            <img src="img/ciencias_naturales.png" alt="ciencias" />
            <p>CIENCIAS <span className='titulo-juego'>NATURALES</span></p>
            <NavLink to="/ciencias" className="button-jugar-educativos" >Jugar</NavLink>
          </div>
          <div className='juego-div'>
            <img src="img/educacion.png" alt="educacion" />
            <p>EDUCACION <span className='titulo-juego'>ARTISTICA</span></p>
            <NavLink to="/educacion" className="button-jugar-educativos" >Jugar</NavLink>
          </div>
          <div className='juego-div'>
            <img src="img/ingles.png" alt="ingles" />
            <p>INGLES</p>
            <NavLink to="/ingles" className="button-jugar-educativos" >Jugar</NavLink>
          </div>
          <div className='juego-div'>
            <img src="img/estudios.png" alt="estudios" />
            <p>ESTUDIOS <span className='titulo-juego'>SOCIALES</span></p>
            <NavLink to="/estudios" className="button-jugar-educativos" >Jugar</NavLink>
          </div>
          <div className='juego-div'>
            <img src="img/lenguaje.png" alt="lenguaje" />
            <p>LENGUAJE Y <span className='titulo-juego'>COMUNICACION</span></p>
            <NavLink to="/lenguaje" className="button-jugar-educativos" >Jugar</NavLink>
          </div>
          <div className='juego-div'>
            <img src="img/matematicas.png" alt="matematicas" />
            <p>MATEMATICAS </p>
            <NavLink to="/matematicas" className="button-jugar-educativos" >Jugar</NavLink>
          </div>
        </div>
      </section>
      <section id="juegos-memoria">
        
        <div className='contenedor-titulos'>
          <h1>JUEGOS DE <span className='seccion-juego'>MEMORIA</span></h1>
        </div>

        <div className='contenedor-memorama'>
          <div>
            <img src="img/memorama.png" alt="memorama" />
          </div>
          <div className='informacion-memorama'>
            <div className='MemoramaConteiner'>
              <h4>Memorama</h4>
              <p>Es una actividad lúdica diseñada para estimular y desarrollar la capacidad de recordar 
                información, como imágenes, palabras, sonidos o secuencias. Estos juegos suelen implicar 
                la asociación de elementos relacionados, la retención de detalles en un periodo corto o 
                largo de tiempo, y la recuperación de información en el momento adecuado.
              </p>
            </div>
            <div className='subcontenedor-memorama'>
              <img src="img/memorama_vista.png" alt="memorama vista" />
              <div className='contenedor-check'>
                <div>
                  <img src="img/check.png" alt="check" />
                  <p>Ayuda a los niños a recordar las posiciones de las cartas y a entrenar su memoria a corto plazo.</p>
                </div>
                <div>
                  <img src="img/check.png" alt="check" />
                  <p>Prestar atención a los movimientos y ubicaciones, fomenta la capacidad de enfocarse.</p>
                </div>
                <div>
                  <img src="img/check.png" alt="check" />
                  <p>Los niños aprenden a relacionar imágenes y patrones de manera estratégica.</p>
                </div>
              </div>
            </div>
            <NavLink to="/memorama" className="button-jugar-educativos button-memorama">Jugar</NavLink>
          </div>
        </div>
      </section>
      <section id="juegos-didacticos-cognitivos">
        
        <div className='contenedor-titulos'>
          <h1>JUEGOS DIDACTICOS <span className='seccion-juego'>COGNITIVOS</span></h1>
        </div>

        <div className='contenedor-juegos-educativos'>
          <div className='juego-div'>
            <img src="img/sopaletras.png" alt="sopaletras" />
            <p>SOPA DE <span className='titulo-juego'>LETRAS</span></p>
            <NavLink to="/sopaletras" className="button-jugar-educativos" >Jugar</NavLink>
          </div>
          <div className='juego-div'>
            <img src="img/rompecabezas.png" alt="rompecabezas" />
            <p>ROMPECABEZAS </p>
            <NavLink to="/rompecabezas" className="button-jugar-educativos" >Jugar</NavLink>
          </div>
          <div className='juego-div'>
            <img src="img/laberinto.png" alt="laberinto" />
            <p>LABERINTO</p>
            <NavLink to="/laberinto" className="button-jugar-educativos" >Jugar</NavLink>
          </div>
        </div>
      </section>
      <section id="juegos-preguntas">
        
        <div className='contenedor-titulos'>
          <h1>APRENDE CON NUESTROS <span className='seccion-juego'>QUIZ Y DOCUMENTOS</span></h1>
        </div>
        <div className='contenedor-juegos-educativos'>
          <div className='juego-div'>
            <img src="img/preguntas.png" alt="preguntas" />
            <p>JUEGO DE <span className='titulo-juego'>PREGUNTAS</span></p>
            <NavLink to="/preguntas" className="button-jugar-educativos" >Jugar</NavLink>
          </div>
          <div className='juego-div'>
            <img src="img/sonidos.png" alt="sonidos" />
            <p>SONIDOS DE <span className='titulo-juego'>ANIMALES</span></p>
            <NavLink to="/sonidos" className="button-jugar-educativos" >Jugar</NavLink>
          </div>
          <div className='juego-div'>
            <img src="img/multijuegos.png" alt="multijuegos" />
            <p>MULTIJUEGOS</p>
            <NavLink to="/multijuegos" className="button-jugar-educativos" >Jugar</NavLink>
          </div>
        </div>

      </section>
      {/* <Footer /> */}
    </>
  )
}
