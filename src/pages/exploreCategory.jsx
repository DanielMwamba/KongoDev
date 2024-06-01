import { useEffect, useState } from "react";
import BlogCard from "../components/blogCarg";
import { Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";

//Api
import * as api from "../services/api/api";

export default function ExploreCategory() {
    const {category} = useParams();

    const [posts, setPosts] = useState(null);
    const [visible, setVisible] = useState(2)

    const [loading, setLoading] = useState(true);

    function handleLoadMore() {
        setVisible((preValue) => preValue + preValue);
    }

    useEffect(() => {
        api.getPostsByCategory(category).then((response) => {
            setPosts(response.posts);
            setLoading(false);
        }).catch(err => setLoading(false));
    }, [posts]);

    return (
        <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12 flex justify-start items-center pt-10 pb-10">
              <span
                className="text-black text-3xl font-bold"
                style={{ fontFamily: "poppins" }}
              >
                Explorer Catégories {category}
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
                  {posts?.length === 0 ? (
                    <p>Aucun Article trouvé</p>
                  ) : (
                    <>
                      {visible >= posts?.length ? (
                        <p>Vous avez atteint la fin</p>
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
                </div>
              </div>
            </section>
          </>
        )}
      </>
    );
  }
    