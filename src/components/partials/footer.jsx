import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Github} from "lucide-react";
// import Git

export default function Footer() {
  const isLoggedIn = false; // Replace with actual auth state

  const LINKS = [
    {
      title: "Pages",
      items: [
        { name: "Accueil", href: "/" },
        { name: "Explorer", href: "/explore" },
        { name: "Catégories", href: "/categories" },
        { name: "A Propos", href: "/about" },
      ],
    },
    {
      title: "Compte",
      items: isLoggedIn
        ? [
            { name: "Tableau de Bord", href: "/authorpanel/dashboard" },
            { name: "Mon Profile", href: "/authorpanel/profile" },
          ]
        : [
            { name: "Connexion", href: "/login" },
            { name: "Inscription", href: "/register" },
          ],
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="text-2xl font-bold text-foreground">
              Kongo <span className="text-primary">Dev</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Explorez, apprenez et partagez vos connaissances en développement.
            </p>
          </div>
          {LINKS.map(({ title, items }) => (
            <div key={title}>
              <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
              <ul className="space-y-2">
                {items.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {currentYear} Kongo Dev. Tous droits réservés.
          </p>
          <div className="flex space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}