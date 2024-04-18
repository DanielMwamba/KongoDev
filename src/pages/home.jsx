import Hero from "../components/hero";
import CategoryCard from "../components/categoryCard";
import categories from  "../services/api/categories.json";
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

      <section className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
         <div className="grid grid-cols-2 grid-rows-2 gap-5 sm:grid-cols-3 sm:grid-rows-2">
          {categories.slice(0,5).map(category=>{
            return <CategoryCard
            key= {category.id}
            name={category.name}
            image={category.imageURL}
            link={`/categories/${category.name}`}
          />

          })}
          <CategoryCard
                name="Tout explorer"
                image="https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                link="/categories/"
              />
         </div>
      </section>

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