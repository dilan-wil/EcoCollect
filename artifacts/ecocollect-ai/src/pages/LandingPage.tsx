import * as React from "react"
import { Link } from "wouter"
import { useAppStore } from "@/store"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MapComponent } from "@/components/ui/MapComponent"
import { mockReports } from "@/data/mockData"
import { ShieldCheck, MapPin, Leaf, Zap, BarChart3, ChevronRight, BrainCircuit, Truck } from "lucide-react"

export default function LandingPage() {
  const { setRole } = useAppStore()

  const mapMarkers = mockReports.slice(0, 15).map(r => ({
    id: r.id,
    lat: r.lat,
    lng: r.lng,
    color: r.status === 'Complété' ? '#16A34A' : r.status === 'En attente' ? '#F59E0B' : '#3B82F6'
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Public Navbar */}
      <header className="h-20 glass fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Leaf className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">EcoCollect<span className="text-primary">.ai</span></span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 text-sm font-medium mr-4">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Fonctionnalités</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">Comment ça marche</a>
          </div>
          <Link href="/login">
            <Button variant="ghost" className="rounded-full px-5 hidden md:flex">
              Connexion
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="default" className="rounded-full px-6">
              Créer un compte
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10"></div>
          
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" /> Plateforme de nouvelle génération
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
                La collecte intelligente des déchets, <span className="text-primary">propulsée par l'IA.</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Transformez la gestion de la propreté urbaine. Détection IA, routage optimisé et participation citoyenne réunis dans une plateforme de contrôle centralisée.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link href="/citoyen/dashboard" onClick={() => setRole('citoyen')}>
                  <Button size="lg" className="rounded-full h-14 px-8 text-base">
                    Portail Citoyen <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/admin/dashboard" onClick={() => setRole('admin')}>
                  <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base">
                    Mission Control (Admin)
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="border border-white/10 dark:border-white/5 bg-background/50 backdrop-blur-xl rounded-3xl p-4 shadow-2xl">
                <MapComponent 
                  markers={mapMarkers} 
                  height="450px" 
                  className="rounded-2xl"
                  interactive={false}
                />
                
                {/* Floating stat cards */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -bottom-6 -left-6 bg-card border rounded-2xl p-4 shadow-xl flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Validation IA</p>
                    <p className="text-2xl font-bold">98.4%</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="border-y bg-muted/30">
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x border-border">
            <div className="text-center px-4">
              <h4 className="text-4xl font-bold text-foreground mb-2">12k+</h4>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Signalements</p>
            </div>
            <div className="text-center px-4">
              <h4 className="text-4xl font-bold text-foreground mb-2">87%</h4>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Traités par IA</p>
            </div>
            <div className="text-center px-4">
              <h4 className="text-4xl font-bold text-foreground mb-2">48h</h4>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Temps Moyen</p>
            </div>
            <div className="text-center px-4">
              <h4 className="text-4xl font-bold text-foreground mb-2">93%</h4>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Taux de Succès</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche ?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Un processus fluide de bout en bout, de la découverte à la résolution.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Citoyen", desc: "Un citoyen repère un dépôt sauvage, prend une photo et la signale via l'application avec ses coordonnées GPS.", icon: MapPin },
                { step: "02", title: "Analyse IA", desc: "Notre modèle d'Intelligence Artificielle analyse l'image, catégorise les déchets et évalue le volume en temps réel.", icon: BrainCircuit },
                { step: "03", title: "Intervention", desc: "Une mission est automatiquement assignée à l'agent le plus proche avec le véhicule approprié.", icon: Truck }
              ].map((item, i) => (
                <div key={i} className="relative p-8 rounded-3xl bg-card border hover:shadow-xl transition-shadow group">
                  <div className="text-6xl font-black text-muted/50 absolute top-4 right-6 group-hover:text-primary/10 transition-colors">{item.step}</div>
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">EcoCollect<span className="text-primary">.ai</span></span>
          </div>
          <p className="text-background/60 text-sm text-center md:text-left">
            © 2024 EcoCollect AI. Prototype de démonstration SaaS.
          </p>
          <div className="flex gap-4">
            <Link href="/agent/dashboard" onClick={() => setRole('agent')} className="text-sm text-background/60 hover:text-white transition-colors">Accès Agent</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
