import Header from "./header";
import Footer from "./footer";




function Wrapper({children}) {

    return (
        <main>
        <Header />
         {children}
        <Footer />
       </main>
    )
   
}

export default Wrapper;
