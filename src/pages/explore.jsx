import React, { useEffect, useState } from "react";
import BlogCard from "../components/blogCarg";
import { Button } from "@material-tailwind/react";
import Loader from "../components/loader";

//Api
import * as api from "../services/api/api";

export default function Explore() {
  const [posts, setPosts] = useState(null);
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(true);

  function handleLoadMore() {
    setVisible((prevValue) => prevValue + prevValue);
  }

  useEffect(() => {
    api
      .getAllPosts()
      .then((response) => {
        setPosts(response.posts);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, [posts]);

  return (
    <>
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12 flex justify-start items-center pt-10 pb-10">
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
                key={post._id}
                title={post.title}
                category={post.category}
                summary={post.summary}
                slug={post.slug}
                imageURL={post.imageURL}
                user={post.author.name}
                username={post.author.username}
                date={post.date}
              />
            ))}
          </div>
          <div className="flex justify-center items-center">
            {loading ? (
              <Loader />
            ) : (
              <>
                {!posts ? (
                  <p>Aucun article trouvé</p>
                ) : (
                  <>
                    {visible >= posts?.length ? (
                      <p> Vous avez atteint la fin</p>
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
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
