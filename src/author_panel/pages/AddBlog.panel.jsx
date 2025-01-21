import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

import categories from "../../services/api/categories.json";

import CoverImage from "../components/coverImage";
import { BlogSchema } from "../validations/Blog.validation";
import * as api from "../../services/api/api";



export default function AddBlog() {
  const navigate = useNavigate();
  const editorRef = useRef();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState({
    originalImage: null,
    croppedImage: DefaultCoverImg(),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(BlogSchema()),
  });

  const summaryValue = watch("summary", "");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer); // Clean up timeout
  }, []);

  const onSubmit = (data) => {
    setButtonDisabled(true);
    const formattedDate = new Date().toISOString();

    const blogData = {
      ...data,
      imageURL: selectedImage.croppedImage,
      date: formattedDate,
    };

    const response = api.addPost(blogData);

    toast.promise(response, {
      loading: "Veuillez patienter...",
      success: "Article créé avec succès !",
      error: "Une erreur s'est produite.",
    });

    response
      .then(() => {
        setButtonDisabled(false);
        navigate("/authorpanel/blogs");
      })
      .catch(() => setButtonDisabled(false));
  };

  return (
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
          <CardTitle className="text-2xl">Nouvel article de blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <CoverImage
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input id="title" {...register("title")} className={errors.title && "border-red-500"} />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Résumé</Label>
              <Textarea
                id="summary"
                {...register("summary")}
                rows={4}
                className={errors.summary && "border-red-500"}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Un petit résumé de votre article</span>
                <span className={summaryValue.length > 500 ? "text-red-500" : ""}>
                  {summaryValue.length}/500
                </span>
              </div>
              {errors.summary && <p className="text-sm text-red-500">{errors.summary.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className={errors.category && "border-red-500"}>
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Editor
                apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  height: 350,
                  menubar: false,
                  plugins: "link lists media codesample quickbars",
                  toolbar:
                    "undo redo | styles | bold italic underline forecolor backcolor codesample | alignleft aligncenter alignright | bullist numlist | link media quickimage",
                  placeholder: "Écrivez votre article ici...",
                }}
                onEditorChange={(content) => setValue("description", content)}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={buttonDisabled}
            variant="default"
            className="w-full md:w-auto"
          >
            Publier l'article
          </Button>
        </CardFooter>
      </Card>
    </PanelWrapper>
  );
}
