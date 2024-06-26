
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import BlogCard from "../components/blogCarg";
import { Button } from "@material-tailwind/react";
import Loader from "../components/loader";

//Api
import * as api from "../services/api/api";

export default function Author() {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [visible, setVisible] = useState(9);
  const [loading, setLoading] = useState(true);

  function handleLoadMore() {
    setVisible((prevValue) => prevValue + prevValue);
  }

  useEffect(() => {
    api.getUserByUsername(username).then((response) => {
      setUser(response.user);
      setPosts(response.user.posts);
      setLoading(false);
    });
  }, [user]);

  console.log("voici la reponse:", user)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
            <div className="mt-5 flex flex-wrap justify-center items-center flex-col gap-5">
              <div>
                <Avatar src={user?.profileImageURL} alt="avatar" size="xxl" className="ring-2 ring-purple-800 border border-black-500"/>
              </div>
              <div className="text-center text-black">
                <Typography variant="h3">
                  {user ? user.name : "Utilisateur "}
                </Typography>
                <div className="text-center text-gray-600">
                  <span>
                    {user?.posts.length}{" "}
                    {user?.posts.length === 1 ? "Article" : "Articles"}
                  </span>
                </div>
              </div>
            </div>
            <div className="divider"></div>

            <div className="flex justify-start items-center sm:justify-center">
              <span
                className="text-black text-3xl font-bold"
                style={{ fontFamily: "poppins" }}
              >
                Articles
              </span>
            </div>

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
                    user={user.name}
                    date={post.date}
                  />
                ))}
              </div>
              <div className="flex justify-center items-center">
                {posts?.length === 0 ? (
                  <p>Aucune donnée disponible</p>
                ) : (
                  <>
                    {posts && visible >= posts.length ? (
                       <p>Vous avez atteint la fin</p>
                    ) : (
                      <Button
                        size="lg"
                        color="white"
                        className="flex items-center gap-3"
                        onClick={handleLoadMore}
                      >
                        Voir plus
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
