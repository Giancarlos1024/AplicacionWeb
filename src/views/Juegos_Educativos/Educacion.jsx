import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../assets/css/Educacion.css';

export const Educacion = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null); // Referencia al elemento de audio
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("black");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState("brush"); // brush, pencil, eraser
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [canvasWidth, setCanvasWidth] = useState(800); // Ancho inicial del canvas
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar el audio

  // Ajusta el tamaño del canvas cuando la ventana cambia de tamaño
  useEffect(() => {
    const updateCanvasWidth = () => {
      const width = window.innerWidth > 1000 ? 1000 : window.innerWidth - 20;
      setCanvasWidth(width);
    };

    window.addEventListener("resize", updateCanvasWidth);
    updateCanvasWidth(); // Llamamos la primera vez para ajustarlo al cargar

    return () => {
      window.removeEventListener("resize", updateCanvasWidth);
    };
  }, []);

  // Función para empezar a dibujar
  const startDrawing = (event) => {
    setDrawing(true);
    const { x, y } = getMousePosition(event);
    setLastPosition({ x, y });
  };

  // Función para dejar de dibujar
  const stopDrawing = () => {
    setDrawing(false);
  };

  // Función para obtener la posición del mouse en el canvas
  const getMousePosition = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
  };

  // Función para dibujar en el canvas
  const draw = (event) => {
    if (!drawing) return;

    const { x, y } = getMousePosition(event);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.strokeStyle = color;

    if (tool === "brush" || tool === "pencil") {
      context.beginPath();
      context.moveTo(lastPosition.x, lastPosition.y);
      context.lineTo(x, y);
      context.stroke();
      setLastPosition({ x, y });
    } else if (tool === "eraser") {
      context.clearRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
    }
  };

  // Función para limpiar el lienzo
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Función para guardar el dibujo
  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const imageUrl = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "mi_dibujo.png";
    link.click();
  };

  // Función para pausar/reproducir el sonido
  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Cambiar el estilo del botón de la herramienta activa
  const buttonStyle = (selectedTool) => {
    return tool === selectedTool ? { backgroundColor: "#007bff", color: "white" } : {};
  };

  return (
    <div className="contenedor-educacion" >
      <div className="container  py-5" id="contenedor-educacion-g">
      <h1 className="text-center  mb-4 titulo-educacion">🎨 Crea tu propio dibujo</h1>

      {/* Instrucciones */}
      <div className="text-center mb-4 descripcion-educacion">
        <h4>¡Usa las herramientas para dibujar y crear tu obra de arte!</h4>
      </div>

      {/* Controles para seleccionar color y tamaño del pincel */}
      <div className="text-center mb-4 descripcion-educacion">
        <h4>Elige el color:</h4>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="form-control w-25 mx-auto"
        />
        <h4>Elige el tamaño del pincel:</h4>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(e.target.value)}
          className="form-control w-25 mx-auto"
        />
      </div>

      {/* Herramientas de dibujo */}
      <div className="text-center mb-4 ">
        <button
          onClick={() => setTool("brush")}
          style={buttonStyle("brush")}
          className="btn mx-2 descripcion-educacion"
        >
          <span role="img" aria-label="pincel">🖌️</span> Pincel
        </button>
        <button
          onClick={() => setTool("pencil")}
          style={buttonStyle("pencil")}
          className="btn mx-2 descripcion-educacion"
        >
          <span role="img" aria-label="lapiz">✏️</span> Lápiz
        </button>
      </div>

      {/* Botones de acción */}
      <div className="text-center mt-2">
        <button onClick={clearCanvas} className="btn btn-danger mx-2">
          Limpiar Lienzo
        </button>
        <button onClick={saveDrawing} className="btn btn-success mx-2">
          Guardar Dibujo
        </button>
        <button onClick={toggleAudio} className="btn btn-info mx-2">
          {isPlaying ? "Pausar Música" : "Reproducir Música"}
        </button>
      </div>

      <br />

      {/* Canvas para dibujar */}
      <div className="text-center mb-4">
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height="500"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onMouseMove={draw}
          style={{
            border: "2px solid black",
            backgroundColor: "white",
            maxWidth: "100%",
            height: "auto",
          }}
        ></canvas>
      </div>

      {/* Elemento de audio */}
      <audio ref={audioRef} loop>
        <source src="music/musica_matematicas.mp3" type="audio/mp3" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
    </div>
  );
};
