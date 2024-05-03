import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { UserProvider } from "./context/userContext";
import {Toaster} from "react-hot-toast"

// Partials

//Pages
import Home from "./pages/home";
import Categories from "./pages/categories";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import About from "./pages/about";

//Wrappers 
import Wrapper from "./components/partials/wrapper";

export default function App() {

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