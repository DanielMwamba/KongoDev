import * as yup from "yup";

export function BlogSchema() {
  return yup.object({
    title:yup.string().required("Le titre est requis!"),
    category:yup.string().required("Selectionner une catégorie!"),
    summary:yup.string().required("Le sommaire est requis!").max(94,"94 Characters are Maximum!"),
    description:yup.string().required("La déscription du post est requis!")
  }).required()
}

export function ProfileSchema() {
  return yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email address"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Confirm Password is required"),
    newPassword: yup
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmNewPassword: yup.string().oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });
}

