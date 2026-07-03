import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle2, ShieldCheck, MapPin, Trash2 } from "lucide-react"

export default function Notifications() {
  const notifs = [
    { id: 1, title: "Analyse IA terminée", desc: "Votre signalement (Plastique) a été validé avec 98% de confiance.", time: "Il y a 10 min", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50", read: false },
    { id: 2, title: "Mission Complétée", desc: "Le dépôt Rue de la République a été nettoyé par l'équipe.", time: "Il y a 2h", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50", read: false },
    { id: 3, title: "Nouveau signalement proche", desc: "Un citoyen a signalé des gravats près de votre zone.", time: "Hier", icon: MapPin, color: "text-amber-500", bg: "bg-amber-50", read: true },
    { id: 4, title: "Rapport hebdomadaire", desc: "Votre quartier a amélioré son score de propreté de 12%.", time: "Il y a 3 jours", icon: Bell, color: "text-primary", bg: "bg-primary/10", read: true },
  ]

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground mt-1">Vos alertes et mises à jour récentes.</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 text-muted-foreground">
            <Trash2 className="w-4 h-4" /> Tout marquer comme lu
          </Button>
        </div>

        <div className="space-y-4">
          {notifs.map((n) => (
            <Card key={n.id} className={`transition-colors ${!n.read ? 'border-primary/30 bg-primary/5 shadow-sm' : 'opacity-70'}`}>
              <CardContent className="p-4 flex gap-4 items-start">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.bg} ${n.color}`}>
                  <n.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-semibold ${!n.read ? 'text-foreground' : 'text-muted-foreground'}`}>{n.title}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{n.desc}</p>
                </div>
                {!n.read && (
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
