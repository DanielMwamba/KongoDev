import { BrowserRouter, Route, Routes } from "react-router-dom";

// Partials

//Pages
import Home from "./pages/home";
import Categories from "./pages/categories";

//Wrappers 
import Wrapper from "./components/partials/wrapper";

export default function App() {

    return (
        <>
         <BrowserRouter>
            <Routes>
                <Route path="/" element={<Wrapper><Home/></Wrapper>}/>
                <Route path="/categories" element={<Wrapper><Categories/></Wrapper>}/>
            </Routes>
         </BrowserRouter>
        </>
    )
}