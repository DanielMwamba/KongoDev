import React from "react";
import { Link } from "react-router-dom";

const getColorClasses = (color) => {
  const baseClasses = "transition-all duration-200 hover:shadow-md";
  switch (color) {
    case "yellow":
      return `${baseClasses} bg-yellow-100 hover:bg-yellow-200 text-yellow-800`;
    case "cyan":
      return `${baseClasses} bg-cyan-100 hover:bg-cyan-200 text-cyan-800`;
    case "blue":
      return `${baseClasses} bg-blue-100 hover:bg-blue-200 text-blue-800`;
    case "orange":
      return `${baseClasses} bg-orange-100 hover:bg-orange-200 text-orange-800`;
    case "red":
      return `${baseClasses} bg-red-100 hover:bg-red-200 text-red-800`;
    case "purple":
      return `${baseClasses} bg-purple-100 hover:bg-purple-200 text-purple-800`;
    case "pink":
      return `${baseClasses} bg-pink-100 hover:bg-pink-200 text-pink-800`;
    case "green":
      return `${baseClasses} bg-green-100 hover:bg-green-200 text-green-800`;
    case "slate":
      return `${baseClasses} bg-slate-100 hover:bg-slate-200 text-slate-800`;
    case "indigo":
      return `${baseClasses} bg-indigo-100 hover:bg-indigo-200 text-indigo-800`;
    default:
      return `${baseClasses} bg-gray-100 hover:bg-gray-200 text-gray-800`;
  }
};

const CategoryCard = ({ name, color, link, description }) => {
  return (
    <Link 
      to={link}
      className={`block p-4 rounded-lg ${getColorClasses(color)} group`}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm opacity-75 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;