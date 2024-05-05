import React, { useState } from 'react';
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage"; // Fonction pour recadrer et faire pivoter une image
import './css/ImageCropDialog.css'; // Importer les styles pour le composant

export default function ImageCropDialog({
  imageURL, // URL de l'image à recadrer
  cropInit = { x: 0, y: 0 }, // Position initiale de recadrage (facultatif)
  zoomInit = 1, // Niveau de zoom initial (facultatif)
  aspectInit = 16 / 9, // Rapport d'aspect initial (facultatif)
  onCancel, // Fonction pour gérer le clic sur le bouton Annuler
  genCroppedImg, // Fonction pour gérer les données de l'image recadrée
}) {

  // Variables d'état pour le zoom, la sélection de recadrage, le rapport d'aspect et les données de l'image recadrée
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Fonction pour mettre à jour l'état de la sélection de recadrage lors d'un changement de recadrage
  const onCropChange = (crop) => {
    setCrop(crop);
  };

  // Fonction pour mettre à jour l'état du zoom lors d'un changement de zoom
  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  // Fonction pour mettre à jour l'état des données de l'image recadrée une fois le recadrage terminé
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // Fonction pour gérer le clic sur le bouton "Recadrer"
  const onCropHandle = async () => {
    // Obtenir l'URL de l'image recadrée en utilisant la fonction getCroppedImg
    const croppedImageURL = await getCroppedImg(imageURL, croppedAreaPixels);

    // Appeler la fonction genCroppedImg fournie pour gérer les données de l'image recadrée
    genCroppedImg(croppedImageURL);
  };

  return (
    <div className='fixed' style={{zIndex:'999999'}}>
      <div className="backdrop"></div>
      <div className="crop-container">
        {/* Composant Cropper pour le recadrage d'image */}
        <Cropper
          image={imageURL}
          zoom={zoom}
          crop={crop}
          aspect={aspect}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="controls">
        <div className="controls-upper-area">
          {/* Curseur de zoom */}
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => onZoomChange(e.target.value)}
            className="slider"
          />
        </div>
        <div className="button-area">
          {/* Boutons Annuler et Recadrer */}
          <button className="button-18 bg-[#0A66C2]" role="button" type="button" onClick={onCancel}>Annuler</button>
          <button className="button-18 bg-[#0A66C2]" role="button" type="button" onClick={onCropHandle}>Recadrer</button>
        </div>
      </div>
    </div>
  );
}