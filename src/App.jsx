import { BrowserRouter, Route, Routes } from "react-router-dom";

// Partials

// import Header from "./components/partials/header";
import Home from "./pages/home";
import Wrapper from "./components/partials/wrapper";

//Wrappers 

export default function App() {

    return (
        <>
         <BrowserRouter>
            <Routes>
                <Route path="/" element={<Wrapper> <Home/> </Wrapper>}/>
            </Routes>
         </BrowserRouter>
        </>
    )
}