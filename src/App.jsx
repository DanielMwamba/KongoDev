import { BrowserRouter, Route, Routes } from "react-router-dom";

// Partials

// import Header from "./components/partials/header";
// import Footer from "./components/partials/footer";
import Wrapper from "./components/partials/wrapper";

//Wrappers 

export default function App() {

    return (
        <>
         <BrowserRouter>
            <Routes>
                <Route path="/" element={<Wrapper> </Wrapper>}/>
            </Routes>
         </BrowserRouter>
        </>
    )
}