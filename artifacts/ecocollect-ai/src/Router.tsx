import * as React from "react"
import { Route, Switch, Router as WouterRouter } from "wouter"
import { useLocation } from "wouter"

// Pages
import LandingPage from "./pages/LandingPage"
import CitizenDashboard from "./pages/citoyen/Dashboard"
import NouveauSignalement from "./pages/citoyen/NouveauSignalement"
import MesSignalements from "./pages/citoyen/MesSignalements"
import SignalementDetail from "./pages/citoyen/SignalementDetail"

import AdminDashboard from "./pages/admin/Dashboard"
import SignalementsAdmin from "./pages/admin/Signalements"
import SignalementDetailAdmin from "./pages/admin/SignalementDetail"
import Agents from "./pages/admin/Agents"
import Vehicules from "./pages/admin/Vehicules"
import CarteAdmin from "./pages/admin/Carte"
import ValidationIA from "./pages/admin/ValidationIA"
import Missions from "./pages/admin/Missions"
import Analytiques from "./pages/admin/Analytiques"
import Clustering from "./pages/admin/Clustering"

import AgentDashboard from "./pages/agent/Dashboard"
import MissionDetail from "./pages/agent/MissionDetail"

import Profil from "./pages/Profil"
import Notifications from "./pages/Notifications"

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <h1 className="text-8xl font-black text-primary mb-4 opacity-20">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page introuvable</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <a href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">Retour à l'accueil</a>
    </div>
  )
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      
      {/* Citizen Routes */}
      <Route path="/citoyen/dashboard" component={CitizenDashboard} />
      <Route path="/citoyen/nouveau-signalement" component={NouveauSignalement} />
      <Route path="/citoyen/mes-signalements" component={MesSignalements} />
      <Route path="/citoyen/signalement/:id" component={SignalementDetail} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/signalements" component={SignalementsAdmin} />
      <Route path="/admin/signalement/:id" component={SignalementDetailAdmin} />
      <Route path="/admin/agents" component={Agents} />
      <Route path="/admin/vehicules" component={Vehicules} />
      <Route path="/admin/carte" component={CarteAdmin} />
      <Route path="/admin/validation-ia" component={ValidationIA} />
      <Route path="/admin/missions" component={Missions} />
      <Route path="/admin/analytiques" component={Analytiques} />
      <Route path="/admin/clustering" component={Clustering} />

      {/* Agent Routes */}
      <Route path="/agent/dashboard" component={AgentDashboard} />
      <Route path="/agent/mission/:id" component={MissionDetail} />

      {/* Shared Routes */}
      <Route path="/profil" component={Profil} />
      <Route path="/notifications" component={Notifications} />

      <Route component={NotFound} />
    </Switch>
  )
}

export default Router
