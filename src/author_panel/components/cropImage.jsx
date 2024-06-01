// Fonction pour créer un élément Image avec gestion des erreurs
const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
  
      
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
  
      // Définit l'attribut CORS anonyme pour éviter les problèmes d'origine 
      image.setAttribute("crossOrigin", "anonymous");
  
      // Définit l'URL source de l'image
      image.src = url;
    });
  
  // Fonction d'assistance pour convertir des degrés en radians
  function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
  }
  
  /**
   * Fonction pour recadrer et faire pivoter une image
   * Adapté de https://github.com/DominicTobias/react-image-crop
   *
   * @param {string} imageSrc - URL de l'image à recadrer
   * @param {object} pixelCrop - Objet contenant les dimensions de recadrage (largeur et hauteur) et la position (x et y)
   * @param {number} rotation (facultatif) - Angle de rotation en degrés
   *
   * @returns {Promise<string>} - Promesse résolue en une URL de données d'image encodée en Base64
   */
  export default async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
    // Charge l'image en utilisant la fonction createImage
    const image = await createImage(imageSrc);
  
    // Crée un élément canvas pour la manipulation de l'image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    // Calcule la dimension maximale de l'image
    const maxSize = Math.max(image.width, image.height);
  
    // Calcule une zone de sécurité pour accueillir la rotation de l'image sans rognage
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
  
    // Définit les dimensions du canvas pour tenir compte de la zone de sécurité pour la rotation
    canvas.width = safeArea;
    canvas.height = safeArea;
  
    // Translate le contexte du canvas au centre de l'image pour la rotation
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);
  
    // Dessine l'image pivotée sur le canvas
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );
  
    // Extrait les données de l'image du canvas
    const data = ctx.getImageData(0, 0, safeArea, safeArea);
  
    // Définit les dimensions du canvas à la taille de recadrage finale
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  
    // Colle les données de l'image pivotée sur le canvas avec des décalages de recadrage
    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );
  
    // Renvoie l'image recadrée sous forme d'URL de données encodée en Base64
    return canvas.toDataURL('image/jpeg');
  
  }
  