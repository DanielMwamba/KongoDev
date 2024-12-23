import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"

const CategoryCard = ({ image, link, name }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(link)
  }

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={handleClick}
    >
      <CardContent className="p-0 relative aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <h3 className="text-white text-lg font-semibold">{name}</h3>
        </div>
      </CardContent>
    </Card>
  )
}

export default CategoryCard