import { Card, CardContent } from "@/components/ui/card"
import { Flame, Mountain, Waves } from "lucide-react"
import heroImage from "@/assets/hero-disaster-collage.jpg"

const Index = () => {
  const disasters = [
    {
      title: "Fire Safety",
      icon: Flame,
      description: "Learn escape routes and fire suppression",
      color: "text-red-400"
    },
    {
      title: "Earthquake Response", 
      icon: Mountain,
      description: "Drop, cover, and hold techniques",
      color: "text-amber-400"
    },
    {
      title: "Flood Survival",
      icon: Waves,
      description: "Water safety and evacuation protocols", 
      color: "text-blue-400"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div 
        className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-r from-background to-card"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-emergency-warning">LEARN TO</span>
              <br />
              <span className="text-primary">SURVIVE</span>
              <br />
              <span className="text-accent">SMARTER</span>
            </h1>
            <p className="text-xl text-foreground/90 max-w-2xl mx-auto">
              Master disaster survival through immersive simulations and interactive challenges. 
              When chaos strikes, be prepared.
            </p>
          </div>
        </div>
      </div>

      {/* Disaster Categories */}
      <div className="grid md:grid-cols-3 gap-6">
        {disasters.map((disaster, index) => (
          <Card key={disaster.title} className="bg-gradient-card shadow-card hover:shadow-emergency transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                  <disaster.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {disaster.title}
              </h3>
              <p className="text-muted-foreground">
                {disaster.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Get Started
          </h2>
          <p className="text-muted-foreground text-lg">
            Use the sidebar to navigate to different disaster scenarios. 
            Each scenario offers both quizzes to test your knowledge and simulations for hands-on practice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
