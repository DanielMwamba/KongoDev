import * as yup from "yup";

export function RegisterSchema(){
    return yup.object({
        name:yup.string().required("Le nom est requis"),
        email:yup.string().email("Entrer une adresse valide").required("L'adresse mail est requise"),
        username:yup.string().required("Le nom d'utilisateur est requis"),
        password:yup.string().min(8,"Le mot de passe doit contenir au moins 8 caractères!")
    }).required()
}