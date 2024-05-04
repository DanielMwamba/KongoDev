import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import { authActions } from "./redux/slices/authSlice";

// Partials

//Pages
import Home from "./pages/home";
import Categories from "./pages/categories";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import About from "./pages/about";


//Api
import { refreshToken } from "./services/api/api"

//Wrappers 
import Wrapper from "./components/partials/wrapper";

const TokenRefreshInterval = 60 * 60 * 1000; 


export default function App() {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        let intervalId;
      
        // Fonction pour rafraîchir le token d'authentification
        const refreshTokenHandler = async () => {
          try {
            // Vérifier si l'utilisateur est connecté
            if (isLoggedIn) {
              // Récupérer le refreshToken depuis le stockage local
              const refreshTokenFromStorage = localStorage.getItem('refreshToken');
              // Appeler la fonction refreshToken avec le refreshToken actuel
              const response = await refreshToken(refreshTokenFromStorage);
      
              // Mettre à jour le token d'accès et le refreshToken dans le stockage local
              localStorage.setItem('token', response.token);
              localStorage.setItem('refreshToken', response.refreshToken);
      
              // Déclencher l'action de connexion dans le store 
              dispatch(authActions.login());
            }
          } catch (error) {
            // En cas d'échec de rafraîchissement du token, gérer l'erreur, par exemple, déconnecter l'utilisateur ou afficher un message d'erreur
            console.error('Échec du rafraîchissement du token :', error.message);
          }
        };
      
        // Appeler la fonction de rafraîchissement du token immédiatement après le montage du composant
        refreshTokenHandler();
      
        // Configurer l'intervalle pour rafraîchir périodiquement le token
        intervalId = setInterval(refreshTokenHandler, TokenRefreshInterval);
      
        // Effacer l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
      }, [dispatch, isLoggedIn]);
      

    return (
        <>
        <Toaster />
        <AuthProvider>
        <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Wrapper><Home/></Wrapper>}/>
                <Route path="/categories" element={<Wrapper><Categories/></Wrapper>}/>
                <Route path="/about" element={<Wrapper><About/></Wrapper>}/>

                //AUTH
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                
            </Routes>
         </BrowserRouter>
        </UserProvider>
        </AuthProvider>
         
        </>
    )
}