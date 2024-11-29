import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Search } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

import PanelWrapper from "../partials/panelWrapper.panel"
import Loader from "../../components/loader"
import EmptyPostState from "../components/emptyPostState.panel"
import BlogCard from "../components/blogCard.panel"

import * as api from "../../services/api/api"

export default function Blogs() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  useEffect(() => {
    getPosts()
  }, [])

  async function getPosts() {
    try {
      setLoading(true)
      const data = await api.getUserPosts()
      setPosts(data.posts)
    } catch (err) {
      setError("Failed to load posts. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  function onPostDelete() {
    getPosts()
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) return <Loader />

  if (error) {
    return (
      <PanelWrapper>
        <Card className="mx-auto max-w-2xl mt-8">
          <CardContent className="pt-6">
            <p className="text-center text-red-500">{error}</p>
            <Button onClick={getPosts} className="mt-4 mx-auto block">
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </PanelWrapper>
    )
  }

  return (
    <PanelWrapper>
      <Card className="mx-auto max-w-7xl mt-8">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <CardTitle className="text-3xl font-bold">Mes Articles</CardTitle>
          <Link to="/authorpanel/blogs/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nouveau post
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Rechercher des articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
              icon={<Search className="mr-2 h-4 w-4" />}
            />
          </div>
          {currentPosts.length === 0 ? (
            <EmptyPostState />
          ) : (
            <>
              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BlogCard
                        id={post.id}
                        title={post.title}
                        image={post.imageURL}
                        category={post.category}
                        user_name={post.author.name}
                        date={post.date}
                        onPostDelete={onPostDelete}
                      />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => paginate(index + 1)}
                        isActive={currentPage === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </CardContent>
      </Card>
    </PanelWrapper>
  )
}