import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { mockVehicles } from "@/data/mockData"
import { Input } from "@/components/ui/form-elements"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Truck, Fuel, Wrench, Info } from "lucide-react"

export default function Vehicules() {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Flotte de Véhicules</h1>
        <p className="text-muted-foreground mt-1">Supervision de la flotte, capacités et maintenance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className={`h-2 w-full ${vehicle.status === 'Disponible' ? 'bg-green-500' : vehicle.status === 'En service' ? 'bg-blue-500' : 'bg-destructive'}`}></div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg mb-0.5">{vehicle.registration}</h3>
                  <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-muted`}>
                  <Truck className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-4 text-sm mt-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5" /> Carburant</span>
                    <span className="font-medium">{vehicle.fuelLevel}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${vehicle.fuelLevel > 50 ? 'bg-green-500' : vehicle.fuelLevel > 20 ? 'bg-amber-500' : 'bg-red-500'}`} style={{width: `${vehicle.fuelLevel}%`}}></div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-3">
                  <span className="text-muted-foreground">Capacité</span>
                  <span className="font-semibold">{vehicle.capacity}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Statut</span>
                  <span className={`font-medium ${vehicle.status === 'Disponible' ? 'text-green-600' : vehicle.status === 'En service' ? 'text-blue-600' : 'text-destructive'}`}>
                    {vehicle.status}
                  </span>
                </div>

                <div className="bg-muted/50 p-3 rounded-lg border mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Wrench className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-xs uppercase">Maintenance</span>
                  </div>
                  <p className={`text-xs ${vehicle.maintenanceStatus === 'À jour' ? 'text-green-600' : 'text-amber-600'}`}>
                    {vehicle.maintenanceStatus} (Dernière: {new Date(vehicle.lastMaintenance).toLocaleDateString('fr-FR')})
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  )
}
