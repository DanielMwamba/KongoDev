import { BrowserRouter, Route, Routes } from "react-router-dom";

// Partials

//Pages
import Home from "./pages/home";
import Categories from "./pages/categories";
import Login from "./pages/auth/login";

//Wrappers 
import Wrapper from "./components/partials/wrapper";

export default function App() {

    return (
        <>
         <BrowserRouter>
            <Routes>
                <Route path="/" element={<Wrapper><Home/></Wrapper>}/>
                <Route path="/categories" element={<Wrapper><Categories/></Wrapper>}/>

                //AUTH
                <Route path="/login" element={<Login/>}/>

                
            </Routes>
         </BrowserRouter>
        </>
    )
}