import Hero from "../components/hero";
import { Button } from "@material-tailwind/react";

export default function Home() {
    
    return(
        <>
         <Hero/>
         <div className="flex justify-center items-center pt-20 pb-10">
        <span
          className="text-black text-3xl font-bold font-poppins"
        >
          Explorer les Catégories
        </span>
      </div>


      <div className="flex justify-center items-center pt-20 pb-10">
        <span
          className="text-black text-3xl font-bold"
          style={{ fontFamily: "poppins" }}
        >
          Explorer les Articles
        </span>
      </div>
        </>
    )
}