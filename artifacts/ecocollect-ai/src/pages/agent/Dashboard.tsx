import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { mockReports } from "@/data/mockData"
import { MapComponent } from "@/components/ui/MapComponent"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, CheckCircle2, Clock } from "lucide-react"
import { Link } from "wouter"

export default function AgentDashboard() {
  // Mock agent: AGT-001
  const myMissions = mockReports.filter(r => r.agentId === "AGT-001" && r.status !== 'Rejeté')
  const completed = myMissions.filter(r => r.status === 'Complété').length
  const pending = myMissions.length - completed

  const mapMarkers = myMissions.filter(r => r.status !== 'Complété').map(r => ({
    id: r.id,
    lat: r.lat,
    lng: r.lng,
    color: r.status === 'En cours' ? '#3B82F6' : '#F59E0B'
  }))

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Ma Tournée</h1>
        <p className="text-muted-foreground mt-1">Véhicule: Camion Benne (AB-123-CD)</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-primary font-bold uppercase mb-1">Missions</p>
            <p className="text-3xl font-black text-primary">{myMissions.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Complétées</p>
            <p className="text-3xl font-black text-green-600">{completed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Restantes</p>
            <p className="text-3xl font-black text-amber-500">{pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Distance</p>
            <p className="text-3xl font-black">14 km</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="order-2 lg:order-1">
          <h2 className="text-xl font-bold mb-4">Itinéraire Optimisé</h2>
          <div className="space-y-4">
            {myMissions.map((mission, idx) => (
              <Card key={mission.id} className={`overflow-hidden transition-all ${mission.status === 'Complété' ? 'opacity-60 bg-muted/50' : 'hover:shadow-md'}`}>
                <div className={`h-1 w-full ${mission.status === 'Complété' ? 'bg-green-500' : mission.status === 'En cours' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                          <span className="font-bold">{mission.wasteType}</span>
                        </div>
                        <StatusBadge status={mission.status} />
                      </div>
                      <p className="text-sm text-muted-foreground flex items-start gap-1.5 mb-2">
                        <MapPin className="w-4 h-4 shrink-0 text-muted-foreground" />
                        <span>{mission.address}</span>
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 border-t sm:border-t-0 sm:border-l flex flex-col justify-center gap-2 min-w-[140px]">
                      {mission.status === 'Complété' ? (
                        <div className="flex items-center justify-center gap-1.5 text-green-600 font-medium">
                          <CheckCircle2 className="w-5 h-5" /> Fait
                        </div>
                      ) : (
                        <>
                          <Button variant="default" className="w-full text-xs h-8" asChild>
                            <Link href={`/agent/mission/${mission.id}`}>Détails</Link>
                          </Button>
                          <Button variant="outline" className="w-full text-xs h-8 gap-1.5">
                            <Navigation className="w-3.5 h-3.5" /> Y aller
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="order-1 lg:order-2">
          <div className="sticky top-24">
             <h2 className="text-xl font-bold mb-4">Carte de la tournée</h2>
             <div className="rounded-xl border shadow-sm overflow-hidden h-[400px] lg:h-[600px]">
               <MapComponent markers={mapMarkers} height="100%" />
             </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
