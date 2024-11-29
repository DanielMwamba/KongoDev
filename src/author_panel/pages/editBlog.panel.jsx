import React, { useState, createRef, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Editor } from "@tinymce/tinymce-react";
import { PencilIcon, ChevronLeftIcon } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PanelWrapper from "../partials/panelWrapper.panel";
import DefaultCoverImg from "../components/defaultCoverImg";
import ImageCropDialog from "../components/imageCropDialog";
import Loader from "../../components/loader";
import categories from "../../services/api/categories.json";

import convertImageToBase64 from "../../helpers/convertImage.helper";
import cloudinaryUrlToBase64 from "../../helpers/cloudinaryUrlToBase64.helper";
import compressImage from "../../helpers/compressedImage.helper";
import { BlogSchema } from "../validations/Blog.validation";
import * as api from "../../services/api/api";

const EditBlog = () => {
  const navigate = useNavigate();
  const editorRef = useRef();
  const { id } = useParams();

  // Gestion de l'état
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  // Gestion du formulaire avec react-hook-form et validation Yup
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(BlogSchema()),
  });

  const summaryValue = watch("summary", "");

  const [descriptionValue, setDescriptionValue] = useState({});

  // useEffect pour récupérer les données du post lors du montage du composant
  useEffect(() => {
    getPostData();
  }, []);

  // Fonction pour récupérer les données du post et initialiser les valeurs du formulaire
  const getPostData = async () => {
    let response = await api.getUserPosts(id);

    if (response && response.posts && response.posts.length > 0) {
      const post = response.posts[0];
      reset(post);
      setDescriptionValue({ description: post.description });
      if (post.imageURL) {
        cloudinaryUrlToBase64(post.imageURL).then((result) => {
          if (result) {
            setSelectedImage((prevValue) => ({
              ...prevValue,
              croppedImage: result,
            }));
          }
          setLoading(false);
        });
      } else {
        console.error("Image URL is missing in the response post:", post);
        setLoading(false);
      }
    } else {
      console.error("Invalid response:", response);
      setLoading(false);
    }
  };

  const fileInputRef = useRef(null);
  const initData = {
    originalImage: null,
    croppedImage: null,
  };
  const [selectedImage, setSelectedImage] = useState(initData);

  // Fonction pour gérer le clic sur le bouton de fichier
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  // Fonction pour gérer le changement de fichier et convertir l'image en base64
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    event.target.value = null;
    convertImageToBase64(file)
      .then((base64Image) => {
        setSelectedImage((prevValue) => {
          return { ...prevValue, originalImage: base64Image };
        });
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la conversion de l'image en base64:",
          error
        );
      });
  };

  // Fonction pour annuler la sélection de l'image
  const onCancel = () => {
    setSelectedImage((prevValue) => {
      return { ...prevValue, originalImage: null };
    });
  };

  // Fonction pour générer l'image recadrée et la compresser
  const genCroppedImg = (croppedImageURL) => {
    compressImage(croppedImageURL, 500, 500, 100)
      .then((compressedImage) => {
        setSelectedImage({
          originalImage: null,
          croppedImage: compressedImage,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Fonction pour gérer la soumission du formulaire
  const onSubmit = (data) => {
    setButtonDisabled(true);

    data = { ...data, imageURL: selectedImage.croppedImage };
    const response = api.updatePost(id, data);

    toast.promise(
      response,
      {
        loading: "Veuillez patienter...",
        success: (data) => data.msg,
        error: (err) => console.log(err.msg),
      },
      {
        success: {
          duration: 2000,
        },
        error: {
          duration: 1000,
        },
      }
    );

    response
      .then(() => {
        setButtonDisabled(false);
        navigate("/authorpanel/blogs");
      })
      .catch((err) => err);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PanelWrapper>
            <Card className="max-w-4xl mx-auto my-8">
              <CardHeader className="flex flex-row items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/authorpanel/blogs")}
                  className="mr-4"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </Button>
                <CardTitle className="text-2xl">
                  Nouvel article de blog
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                          cropInit={selectedImage.crop}
                          zoomInit={selectedImage.zoom}
                          aspectInit={16 / 9}
                          onCancel={onCancel}
                          genCroppedImg={genCroppedImg}
                        />
                      )}
                      <img
                        className="border rounded-lg shadow-md shadow-blue-gray-100 w-full"
                        src={selectedImage.croppedImage}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Button
                          type="button"
                          onClick={handleFileButtonClick}
                          variant="secondary"
                          className="z-10"
                        >
                          <PencilIcon className="mr-2 h-4 w-4" />
                          Changer l'image
                        </Button>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Titre</Label>
                    <Input
                      id="title"
                      {...register("title")}
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary">Résumé</Label>
                    <Textarea
                      id="summary"
                      {...register("summary")}
                      className={errors.summary ? "border-red-500" : ""}
                      rows={4}
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Écrivez quelques phrases sur votre blog.</span>
                      <span
                        className={
                          summaryValue.length > 94 ? "text-red-500" : ""
                        }
                      >
                        {summaryValue.length}/94
                      </span>
                    </div>
                    {errors.summary && (
                      <p className="text-sm text-red-500">
                        {errors.summary.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger
                            className={errors.category ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Choisir une catégorie" />
                          </SelectTrigger>
                          <SelectContent className="w-full bg-white">
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.name}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.category && (
                      <p className="text-sm text-red-500">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Editor
                      apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
                      initialValue={descriptionValue?.description}
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      init={{
                        height: 350,
                        menubar: false,
                        plugins: "link lists media codesample quickbars",
                        toolbar:
                          "undo redo | styles | bold italic underline forecolor backcolor codesample | alignleft aligncenter alignright | bullist numlist | link media quickimage",
                        placeholder: "Écrivez votre article de blog ici...",
                      }}
                      onEditorChange={(content) => {
                        setValue("description", content);
                      }}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  disabled={buttonDisabled}
                >
                  {buttonDisabled ? "Mise à jour en cours..." : "Mettre à jour le post"}
                </Button>
              </CardFooter>
            </Card>
          </PanelWrapper>
        </>
      )}
    </>
  );
};

export default EditBlog;
