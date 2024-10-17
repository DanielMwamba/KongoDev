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
              <span className="text-2xl font-bold text-foreground">
                Kongo <span className="text-primary font-extrabold">Dev</span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/explore">Explorer</NavLink>
            <NavLink to="/categories">Catégories</NavLink>
            <NavLink to="/about">À Propos</NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-secondary transition-colors">
              <Search className="h-5 w-5 text-foreground" />
            </button>
            {isLoggedIn ? (
              <button
                className="hidden md:block btn-primary"
                onClick={() => navigate("/authorpanel/dashboard")}
              >
                Tableau de Bord
              </button>
            ) : (
              <>
                <button
                  className="hidden md:block btn-secondary"
                  onClick={() => navigate("/login")}
                >
                  Connexion
                </button>
                <button
                  className="hidden md:block btn-primary"
                  onClick={() => navigate("/register")}
                >
                  Commencer
                </button>
              </>
            )}
            <button
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
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
      <div 
        className={`md:hidden bg-background/95 backdrop-blur shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/explore">Explorer</NavLink>
          <NavLink to="/categories">Catégories</NavLink>
          <NavLink to="/about">À Propos</NavLink>
          {isLoggedIn ? (
            <button
              className="w-full text-left btn-primary mt-4"
              onClick={() => {
                navigate("/authorpanel/dashboard")
                setIsOpen(false)
              }}
            >
              Tableau de Bord
            </button>
          ) : (
            <>
              <button
                className="w-full text-left btn-secondary mt-4"
                onClick={() => {
                  navigate("/login")
                  setIsOpen(false)
                }}
              >
                Connexion
              </button>
              <button
                className="w-full text-left btn-primary mt-2"
                onClick={() => {
                  navigate("/register")
                  setIsOpen(false)
                }}
              >
                Commencer
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}