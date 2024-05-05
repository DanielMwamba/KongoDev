import React, { useState, createRef, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PanelWrapper from "../partials/panelWrapper.panel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Editor } from "@tinymce/tinymce-react";
import { PencilIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import DefaultCoverImg from "../components/DefaultCoverImg.panel";
import ImageCropDialog from "../components/imageCropDialog";
import toast from "react-hot-toast";
import categories from "../../services/api/categories.json";
import Loader from "../../components/loader";

//Helper Functions
import convertImageToBase64 from "../../helpers/convertImage.helper";
import compressImage from "../../helpers/compressedImage.helper";


//Validation
import { BlogSchema } from "../validations/Blog.validation";

//Api
import * as api from "../../services/api/api";

export default function AddBlog() {
  const navigate = useNavigate();
  const editorRef = createRef();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(BlogSchema()),
  });

  const summaryValue = watch("summary", "");

  //COVER IMAGE START

  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const initData = {
    originalImage: null,
    croppedImage: DefaultCoverImg(),
  };

  const [selectedImage, setSelectedImage] = useState(initData);

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
        console.error("Error converting image to base64:", error);
      });
  };

  function onCancel() {
    setSelectedImage((prevValue) => {
      return { ...prevValue, originalImage: null };
    });
  }

  function genCroppedImg(croppedImageURL) {
    compressImage(croppedImageURL, 500, 500, 100)
      .then((compressedImage) => {
        setSelectedImage({
          originalImage: null,
          croppedImage: compressedImage,
        });
        // Handle the compressed image here
      })
      .catch((error) => {
        console.error(error);
      });
  }
  //COVER IMAGE ENDS

  const onSubmit = (data) => {
    setButtonDisabled(true);

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    data = {
      ...data,
      imageURL: selectedImage.croppedImage,
      date: formattedDate,
    };

    const response = api.addPost(data);

    toast.promise(
      response,
      {
        loading: "Veillez patientez",
        success: (data) => data.msg,
        error: (err) => err.msg,
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
            <main className="flex-1">
              <div className="py-6">
                <div className="mx-auto flex items-center gap-4 max-w-7xl px-4 sm:px-6 md:px-8">
                  <button
                    type="button"
                    className="text-black rounded-full cursor-pointer hover:bg-gray-400 focus:bg-gray-500 hover:text-gray-800"
                    onClick={() => navigate("/authorpanel/blogs")}
                  >
                    <ChevronLeftIcon
                      className="h-10 w-10 p-2  "
                      aria-hidden="true"
                    />
                  </button>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Nouvel article de blog
                  </h1>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  {/* Replace with your content */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-7 text-black rounded-md shadow-md space-y-8 divide-y p-4 bg-white divide-gray-200"
                  >
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                      <div className="space-y-6 sm:space-y-5">
                        <div className="space-y-6 sm:space-y-5">
                          {/* COVER IMAGE START */}
                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
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

                            <label
                              htmlFor="cover-photo"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Photo de couverture
                            </label>

                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={handleFileButtonClick}
                                  className="absolute top-[-10px] right-[-10px] ml-3 inline-flex justify-center rounded-full border border-transparent bg-indigo-600 py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                                >
                                  <PencilIcon
                                    className="h-6 w-4 text-white"
                                    aria-hidden="true"
                                  />
                                </button>

                                <img
                                  className="border rounded-lg shadow-md shadow-blue-gray-100 w-full"
                                  src={selectedImage.croppedImage}
                                />
                              </div>
                            </div>
                          </div>
                          {/* COVER IMAGE END */}

                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4  sm:pt-3">
                            <label
                              htmlFor="title"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Titre
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                              <input
                                type="text"
                                {...register("title")}
                                id="title"
                                autoComplete="off"
                                className={`${
                                  errors.title
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                } block w-full  rounded-md shadow-sm sm:text-sm`}
                              />

                              {errors.title && (
                                <p
                                  className="mt-2 text-sm text-red-600"
                                  id="email-error"
                                >
                                  {errors.title.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4  sm:pt-3">
                            <label
                              htmlFor="summary"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Résumé
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                              <textarea
                                id="summary"
                                rows={4}
                                className={`${
                                  errors.summary
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                } block w-full  rounded-md shadow-sm sm:text-sm`}
                                {...register("summary")}
                              />
                              <div className="flex justify-between">
                                {errors.summary ? (
                                  <p
                                    className="mt-2 text-sm text-red-600"
                                    id="email-error"
                                  >
                                    {errors.summary.message}
                                  </p>
                                ) : (
                                  <p className="mt-2 text-sm text-gray-500">
                                    
                                    Écrivez quelques phrases sur votre blog.
                                  </p>
                                )}
                                <span
                                  className={`${
                                    errors.summary
                                      ? "text-red-600"
                                      : "text-gray-500"
                                  } mt-2 text-sm`}
                                >
                                  {summaryValue.length}/94
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                            <label
                              htmlFor="category"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Catégories
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                              <select
                                id="category"
                                className={`${
                                  errors.category
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                } block w-full max-w-lg rounded-md  shadow-sm sm:max-w-xs sm:text-sm`}
                                {...register("category")}
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Choisir une catégorie
                                </option>

                                {categories.map((category) => {
                                  return (
                                    <option
                                      key={category.id}
                                      value={category.name}
                                    >
                                      {category.name}
                                    </option>
                                  );
                                })}
                              </select>

                              {errors.category && (
                                <p
                                  className="mt-2 text-sm text-red-600"
                                  id="email-error"
                                >
                                  {errors.category.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                            <label
                              htmlFor="cover-photo"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Description
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                              <Editor
                                ref={editorRef}
                                apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
                                initialValue=""
                                init={{
                                  height: 350,
                                  menubar: false,
                                  plugins:
                                    " link lists media codesample quickbars",
                                  toolbar:
                                    "undo redo | styles | bold italic underline forecolor backcolor codesample | alignleft aligncenter alignright | bullist numlist | link media quickimage",
                                  placeholder: "Ecrivez votre article de blog ici...",
                                }}
                                onEditorChange={(content) => {
                                  setValue("description", content);
                                }}
                              />

                              {errors.description && (
                                <p
                                  className="mt-2 text-sm text-red-600"
                                  id="email-error"
                                >
                                  {errors.description.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-5">
                      <div className="flex justify-end">
                        <button
                          disabled={buttonDisabled}
                          type="submit"
                          className={`${
                            buttonDisabled
                              ? "bg-indigo-300 cursor-not-allowed hover:bg-indigo-300"
                              : "bg-indigo-600 hover:bg-indigo-700"
                          } ml-3 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                        >
                          Creér un Post
                        </button>
                      </div>
                    </div>
                  </form>
                  {/* /End replace */}
                </div>
              </div>
            </main>
          </PanelWrapper>
        </>
      )}
    </>
  );
}