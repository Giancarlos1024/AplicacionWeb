import React, { useState } from 'react';
import '../../assets/css/Multijuegos.css';

const Multijuegos = () => {
  const images = [
    'img/carrusel/foto22.jpeg',
    'img/carrusel/foto1.jpeg',
    'img/carrusel/foto2.jpeg',
    'img/carrusel/foto3.jpeg',
    'img/carrusel/foto4.jpeg',
    'img/carrusel/foto5.jpeg',
    'img/carrusel/foto6.jpeg',
    'img/carrusel/foto7.jpeg',
    'img/carrusel/foto8.jpeg',
    'img/carrusel/foto9.jpeg',
    'img/carrusel/foto10.jpeg',
    'img/carrusel/foto11.jpeg',
    'img/carrusel/foto12.jpeg',
    'img/carrusel/foto13.jpeg',
    'img/carrusel/foto14.jpeg',
    'img/carrusel/foto15.jpeg',
    'img/carrusel/foto16.jpeg',
    'img/carrusel/foto17.jpeg',
    'img/carrusel/foto18.jpeg',
    'img/carrusel/foto19.jpeg',
    'img/carrusel/foto20.jpeg',
    'img/carrusel/foto21.jpeg',
    'img/carrusel/foto23.jpeg',
    'img/carrusel/foto24.jpeg',
    'img/carrusel/foto25.jpeg',
    'img/carrusel/foto26.jpeg',
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image); // Muestra la imagen seleccionada en el modal
  };

  const closeModal = () => {
    setSelectedImage(null); // Cierra el modal
  };

  return (
    <div className="contenedorGaleria">
      <h1 className="tituloGaleria">Galería de Imágenes</h1>
      <div className="galeria">
        {images.map((image, index) => (
          <div
            key={index}
            className="galeria-item"
            onClick={() => openModal(image)}
          >
            <img src={image} alt={`Imagen ${index + 1}`} className="galeria-img" />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <img src={selectedImage} alt="Imagen ampliada" className="modal-img" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Multijuegos;
