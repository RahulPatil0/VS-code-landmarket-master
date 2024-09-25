import React from 'react';
import './ImageModal.css'; // Make sure this path is correct

const ImageModal = ({ isOpen, onClose, images, currentIndex, onNext, onPrev }) => {
  if (!isOpen) return null; // Don't render if the modal is closed

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <div className="modal-image-container">
          <button className="modal-nav" onClick={onPrev} disabled={currentIndex === 0}>❮</button>
          <img src={images[currentIndex].url} alt={`Property Image ${currentIndex + 1}`} className="modal-image" />
          <button className="modal-nav" onClick={onNext} disabled={currentIndex === images.length - 1}>❯</button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
