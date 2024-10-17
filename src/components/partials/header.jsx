import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Menu, X, Search } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`)
    return (
      <Link
        to={to}
        className={`text-sm font-medium transition-colors hover:text-primary ${
          isActive ? 'text-primary' : 'text-foreground'
        }`}
      >
        {children}
      </Link>
    )
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">Kongo Dev</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/explore">Explorer</NavLink>
            <NavLink to="/categories">Catégories</NavLink>
            <NavLink to="/about">À Propos</NavLink>
          </nav>
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-secondary transition-colors mr-2">
              <Search className="h-5 w-5 text-foreground" />
            </button>
            {isLoggedIn ? (
              <button
                className="btn-primary"
                onClick={() => navigate("/authorpanel/dashboard")}
              >
                Tableau de Bord
              </button>
            ) : (
              <>
                <button
                  className="btn-secondary mr-2"
                  onClick={() => navigate("/login")}
                >
                  Connexion
                </button>
                <button
                  className="btn-primary"
                  onClick={() => navigate("/register")}
                >
                  Commencer
                </button>
              </>
            )}
            <button
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors ml-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/explore">Explorer</NavLink>
            <NavLink to="/categories">Catégories</NavLink>
            <NavLink to="/about">À Propos</NavLink>
          </div>
        </div>
      )}
    </header>
  )
}