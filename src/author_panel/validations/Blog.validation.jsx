import * as yup from "yup";

export function BlogSchema() {
  return yup.object({
    title:yup.string().required("Le titre est requis!"),
    category:yup.string().required("Selectionner une catégorie!"),
    summary:yup.string().required("Le sommaire est requis!").max(94,"94 Characters are Maximum!"),
    description:yup.string().required("La déscription du post est requis!")
  }).required()
}