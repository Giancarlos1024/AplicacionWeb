
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./views/Home"
import { Ciencias } from "./views/Juegos_Educativos/Ciencias"
import { Educacion } from "./views/Juegos_Educativos/Educacion"
import Ingles from "./views/Juegos_Educativos/Ingles"
import { Estudios } from "./views/Juegos_Educativos/Estudios"
import {Lenguaje} from "./views/Juegos_Educativos/Lenguaje"
import { Matematicas } from "./views/Juegos_Educativos/Matematicas"
import Sopaletras from "./views/Juegos_Didacticos/Sopaletras"
import { Rompecabezas } from "./views/Juegos_Didacticos/Rompecabezas"
import Laberinto from "./views/Juegos_Didacticos/Laberinto"
import Juego_Preguntas from "./views/Juegos_Quiz_Documentos/Juego_Preguntas"
import { Sonidos_animales } from "./views/Juegos_Quiz_Documentos/Sonidos_animales"
import Multijuegos from "./views/Juegos_Quiz_Documentos/Multijuegos"
import { Memorama } from "./views/Juegos_Memoria/Memorama"
import Header from "./components/Header"
import { Footer } from "./components/Footer"

function App() {


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ciencias" element={<Ciencias />} />
        <Route path="/educacion" element={<Educacion />} />
        <Route path="/ingles" element={<Ingles/>} />
        <Route path="/estudios" element={<Estudios/>} />
        <Route path="/lenguaje" element={<Lenguaje />} />
        <Route path="/matematicas" element={<Matematicas />} />
        <Route path="/sopaletras" element={<Sopaletras />} />
        <Route path="/rompecabezas" element={<Rompecabezas />} />
        <Route path="/laberinto" element={<Laberinto />} />
        <Route path="/preguntas" element={<Juego_Preguntas />} />
        <Route path="/sonidos" element={<Sonidos_animales />} />
        <Route path="/multijuegos" element={<Multijuegos />} />
        <Route path="/memorama" element={<Memorama />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
