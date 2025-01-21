import * as yup from "yup";

export function LoginSchema() {
  return yup.object({
    email: yup
      .string()
      .email("Veuillez entrer une adresse email valide.")
      .required("L'adresse email est obligatoire."),
    password: yup
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
      .required("Le mot de passe est obligatoire."),
  });
}
