import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import "../pages/css/blogStyle.css"

//helper
import formatDate from "../helpers/formatDate.helper";

//Api
import * as api from "../services/api/api";

export default function Blog() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    api.getPost(slug).then((response) => {
      setBlogData(response.posts);
      setLoading(false);
    });
  }, [blogData]);

  return (
    <>
    {loading ? (
              <Loader />
            ) : (
              <>
    <article
      className="container max-w-3xl p-2 mx-auto space-y-6 sm:space-y-12 font-outfit"
      itemProp="blogPost"
      itemScope=""
      itemType="http://schema.org/BlogPosting"
    >
      <meta itemProp="image" content={blogData?.imageURL} />
      <div className="flex justify-between items-center sm:px-6">
        <button
          className="!text-gray-500 text-sm no-underline"
          onClick={() => navigate(-1)}
        >
          ← Retour à la page précédente
        </button>
       
      </div>
      <div>
        <img
          className="mb-2 w-full rounded-xl"
          src={blogData?.imageURL}
        />
      </div>
      <div className="sm:px-6">
        <div className="mb-6 text-sm">
          <div className="flex justify-between sm:flex-row flex-col gap-4">
            <div className="flex justify-center items-center gap-2">
              <Link itemProp="url" to={`/blog/author/${blogData?.author.userName}/`}>
                <img
                  src={blogData?.author.profileImageURL}
                  alt={blogData?.author.name}
                  loading="lazy"
                  className="flex h-[32px] w-[32px] rounded-full object-cover"
                />
              </Link>
              <Link
                itemProp="url"
                className="flex-1 text-gray-900 dark:text-gray-200 text-sm no-underline hover:no-underline"
                to={`/blog/author/${blogData?.author.userName}/`}
              >
                {blogData?.author.name}
              </Link>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 ">
              <time
                dateTime="2023-05-18T00:00:00.000Z"
                itemProp="datePublished"
              >
                {blogData && formatDate(blogData.date)}
              </time>
            </div>
          </div>
        </div>
        <h1
          className="text-xl text-black mt-10 mb-2 family-poppins font-bold md:text-4xl"
          itemProp="headline"
        >
          {blogData?.title}
        </h1>
        {blogData && (
          <div
            id="post-content"
            className="markdown text-black"
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: blogData.description }}
          ></div>
        )}
      </div>
    </article>
    </>
            )}
    </>
  );
}