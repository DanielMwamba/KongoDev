import { useRef } from "react";
import { PencilIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageCropDialog from "../components/imageCropDialog";
import convertImageToBase64 from "../../helpers/convertImage.helper";
import compressImage from "../../helpers/compressedImage.helper";

const CoverImage = ({ selectedImage, setSelectedImage }) => {
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    event.target.value = null;
    convertImageToBase64(file)
      .then((base64Image) => {
        setSelectedImage((prev) => ({ ...prev, originalImage: base64Image }));
      })
      .catch((error) => console.error("Image conversion failed:", error));
  };

  const onCancel = () =>
    setSelectedImage((prev) => ({ ...prev, originalImage: null }));

  const genCroppedImg = (croppedImageURL) => {
    compressImage(croppedImageURL, 500, 500, 100)
      .then((compressedImage) =>
        setSelectedImage({ originalImage: null, croppedImage: compressedImage })
      )
      .catch((error) => console.error("Image compression failed:", error));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="cover-photo">Photo de couverture</Label>
      <div className="relative aspect-video overflow-hidden rounded-lg border border-dashed border-gray-300">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {selectedImage.originalImage && (
          <ImageCropDialog
            imageURL={selectedImage.originalImage}
            onCancel={onCancel}
            genCroppedImg={genCroppedImg}
            aspectInit={16 / 9}
          />
        )}
        <img
          src={selectedImage.croppedImage}
          alt="Cover Preview"
          className="w-full rounded-lg shadow-md"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Button
            type="button"
            onClick={() => fileInputRef.current.click()}
            variant="secondary"
            className="z-10"
          >
            <PencilIcon className="mr-2 h-4 w-4 text-white" />
            <span className="text-white font-bold">Ajouter une image</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoverImage;