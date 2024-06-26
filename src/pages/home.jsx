import React, {useEffect, useState} from "react";
import Hero from "../components/hero";
import CategoryCard from "../components/categoryCard";
import BlogCard from "../components/blogCarg";
import categories from  "../services/api/categories.json";
import { Button } from "@material-tailwind/react";

//Api
import * as api from "../services/api/api";


export default function Home() {

  const [posts, setPosts] = useState(null);
  const [visible, setVisible] =  useState(9);

  function handleLoadMore() {
    setVisible((prevValue) => prevValue + prevValue);
  }

  useEffect(() => {
    api.getAllPosts().then((response) => setPosts(response.posts))
  }, [posts]);
    
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

      <section className="text-gray-600 body-font">
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <div className="flex flex-wrap -m-4">
            {posts?.slice(0, visible).map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                category={post.category}
                summary={post.summary}
                slug={post.slug}
                imageURL={post.imageURL}
                user={post.author.name}
                username={post.author.userName}
                date={post.date}
              />
            ))}
          </div>
          <div className="flex justify-center items-center">
            {posts && visible >= posts.length ? ( 
              <p> ok </p>
            ) : (
              <Button
                size="lg"
                color="white"
                className="flex items-center gap-3"
                onClick={handleLoadMore}
              >
                Voir Plus
              </Button>
            )}
          </div>
        </div>
      </section>
        </>
    )
}