import * as yup from "yup";

export function LoginSchema() {
    return yup.object({
        email:yup.string().email("Entrer une adresse valide"),
        password:yup.string().min(8, "Le mot de passe doit contenir au moins 8 caractères!")
    }).required()
}