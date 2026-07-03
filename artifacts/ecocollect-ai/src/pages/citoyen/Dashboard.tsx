import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { useAppStore } from "@/store"
import { KpiCard } from "@/components/ui/KpiCard"
import { ReportCard } from "@/components/ui/ReportCard"
import { FileText, Clock, CheckCircle2, MapPin } from "lucide-react"
import { mockReports } from "@/data/mockData"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { MapComponent } from "@/components/ui/MapComponent"
import { motion } from "framer-motion"

export default function CitizenDashboard() {
  const myReports = mockReports.filter(r => r.citizenId === "CIT-001")
  const pendingCount = myReports.filter(r => r.status === 'En attente').length
  const validatedCount = myReports.filter(r => r.status === 'Validé' || r.status === 'Assigné' || r.status === 'En cours').length
  const completedCount = myReports.filter(r => r.status === 'Complété').length

  const recentReports = myReports.slice(0, 3)
  
  const mapMarkers = myReports.map(r => ({
    id: r.id,
    lat: r.lat,
    lng: r.lng,
    color: r.status === 'Complété' ? '#16A34A' : r.status === 'En attente' ? '#F59E0B' : '#3B82F6',
    popup: (
      <div className="p-1">
        <p className="font-semibold text-sm mb-1">{r.wasteType}</p>
        <p className="text-xs text-muted-foreground">{r.address}</p>
      </div>
    )
  }))

  return (
    <AppLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bonjour, Jean</h1>
          <p className="text-muted-foreground mt-1">Voici le résumé de vos contributions à la propreté de la ville.</p>
        </div>
        <Link href="/citoyen/nouveau-signalement">
          <Button className="rounded-full shadow-md gap-2 h-11 px-6">
            <MapPin className="w-4 h-4" />
            Signaler un dépôt
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard title="Total Signalements" value={myReports.length} icon={FileText} delay={0} />
        <KpiCard title="En attente IA" value={pendingCount} icon={Clock} delay={0.1} />
        <KpiCard title="En cours de traitement" value={validatedCount} icon={MapPin} delay={0.2} />
        <KpiCard title="Collectés" value={completedCount} icon={CheckCircle2} delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Signalements récents</h2>
            <Link href="/citoyen/mes-signalements">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">Voir tout</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentReports.map((report, index) => (
              <ReportCard key={report.id} report={report} role="citoyen" delay={0.1 * index} />
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-primary text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative mt-8"
          >
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative z-10 max-w-md">
              <h3 className="text-xl font-bold mb-2">Vous êtes un Super Citoyen !</h3>
              <p className="text-primary-foreground/80 text-sm">
                Vos 12 signalements ce mois-ci ont permis d'améliorer la propreté de votre quartier. L'IA a validé 98% de vos photos.
              </p>
            </div>
            <div className="w-24 h-24 rounded-full border-4 border-primary-foreground/20 flex items-center justify-center shrink-0 relative z-10 bg-primary-foreground/10 backdrop-blur-sm">
              <span className="text-3xl font-black">12</span>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Carte de vos signalements</h2>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <MapComponent markers={mapMarkers} height="400px" />
          </motion.div>
          
          <div className="bg-card border rounded-xl p-5 shadow-sm mt-6">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Impact Écologique Estimé</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Plastique recyclé</span>
                  <span className="font-bold">45 kg</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[60%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Déchets organiques</span>
                  <span className="font-bold">120 kg</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
