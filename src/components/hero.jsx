import React from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Code, BookOpen, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

const Hero = () => {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-moving-gradient"></div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center text-foreground mb-6 leading-tight animate-fade-in-up">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Codez. Apprenez.
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
            Innovez.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-center text-xl sm:text-2xl md:text-3xl text-muted-foreground animate-fade-in-up animation-delay-300">
          Rejoignez une communauté dynamique de développeurs passionnés. 
          Découvrez, apprenez et partagez vos connaissances pour façonner l'avenir du web.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            size="lg"
            className="text-lg rounded-full animate-bounce-subtle px-8 py-6"
            onClick={() => navigate("/register")}
          >
            Commencer l'aventure <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16">
          <FeatureItem icon={Code} title="Codez" description="Perfectionnez vos compétences avec des défis de codage stimulants" />
          <FeatureItem icon={BookOpen} title="Apprenez" description="Explorez des tutoriels et des ressources de pointe" delay={300} />
          <FeatureItem icon={Share2} title="Partagez" description="Contribuez à la communauté et gagnez en visibilité" delay={600} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  )
}

const FeatureItem = ({ icon: Icon, title, description, delay = 0 }) => (
  <div className={`flex flex-col items-center animate-float animation-delay-${delay}`}>
    <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-center text-muted-foreground">{description}</p>
  </div>
)

export default Hero