import { useParams, NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

const SimulationPage = () => {
  const { disaster } = useParams()
  
  const getDisasterTitle = (disaster: string | undefined) => {
    switch (disaster) {
      case 'fire': return 'Fire Safety'
      case 'earthquake': return 'Earthquake Response'  
      case 'flood': return 'Flood Survival'
      default: return 'Disaster'
    }
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-background to-card rounded-lg">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">
          {getDisasterTitle(disaster)} Simulation
        </h1>
        <p className="text-xl text-muted-foreground">
          Simulation environment loading...
        </p>
        <div className="pt-8">
          <Button asChild variant="outline" size="lg">
            <NavLink to="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Return Home
            </NavLink>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SimulationPage