import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const isLoggedIn = false; // Replace with actual auth state

  const LINKS = [
    {
      title: "Découvrir",
      items: [
        { name: "Accueil", href: "/" },
        { name: "Articles", href: "/explore" },
        { name: "Catégories", href: "/categories" },
        { name: "À Propos", href: "/about" },
      ],
    },
    {
      title: "Communauté",
      items: [
        { name: "Forum", href: "/" },
        { name: "Événements", href: "/" },
        { name: "Contribuer", href: "/" },
      ],
    },
    {
      title: "Compte",
      items: isLoggedIn
        ? [
            { name: "Tableau de Bord", href: "/dashboard" },
            { name: "Mes Articles", href: "/dashboard/articles" },
            { name: "Paramètres", href: "/settings" },
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
            <span className="text-2xl font-bold text-foreground">
                  <span className="text-primary">
                    {"<"}{" "}
                    <span className="text-primary font-extrabold">DEV</span>
                  </span>
                  Sphere
                  <span className="text-primary">{"/> "}</span>
                </span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Explorez, apprenez et partagez vos connaissances avec une communauté de développeurs passionnés.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/articlesphere"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://github.com/articlesphere"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/company/articlesphere"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          {LINKS.map(({ title, items }) => (
            <div key={title}>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {title}
              </h3>
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
            &copy; {currentYear} DEVSphere. Tous droits réservés.
          </p>
          <div className="flex space-x-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}