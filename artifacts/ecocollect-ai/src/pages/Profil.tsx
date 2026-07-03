import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { useAppStore } from "@/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input, Label } from "@/components/ui/form-elements"
import { Moon, Sun, Bell, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface ProfileForm {
  name: string
  email: string
}

export default function Profil() {
  const { role, darkMode, setDarkMode } = useAppStore()
  
  const profileData = {
    citoyen: { name: "Jean Dupont", email: "jean.d@example.com", initials: "JD" },
    admin: { name: "Admin Ville", email: "admin@lyon.fr", initials: "AD" },
    agent: { name: "Agent Collecte", email: "agent.1@ecocollect.fr", initials: "AG" },
  }

  const current = profileData[role]

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ProfileForm>({
    defaultValues: {
      name: current.name,
      email: current.email
    }
  })

  const onSubmit = async (data: ProfileForm) => {
    return new Promise(resolve => {
      setTimeout(() => {
        toast.success("Profil mis à jour avec succès")
        resolve(true)
      }, 800)
    })
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Mon Profil</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card className="text-center overflow-hidden">
              <div className="h-24 bg-gradient-to-tr from-primary to-secondary"></div>
              <CardContent className="px-6 pb-6 pt-0">
                <div className="w-24 h-24 rounded-full bg-background border-4 border-background mx-auto -mt-12 flex items-center justify-center text-3xl font-bold text-primary shadow-sm">
                  {current.initials}
                </div>
                <h2 className="text-xl font-bold mt-4">{current.name}</h2>
                <p className="text-muted-foreground text-sm uppercase tracking-wider font-medium">{role}</p>
                <p className="text-sm mt-2">{current.email}</p>
              </CardContent>
            </Card>

            <div className="bg-card border rounded-xl overflow-hidden">
              <div className="p-4 border-b bg-muted/30 font-semibold text-sm">Paramètres d'Affichage</div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  Mode Sombre
                </div>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-primary' : 'bg-muted-foreground'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${darkMode ? 'left-6' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" /> Informations Personnelles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" {...register("name", { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" {...register("email", { required: true })} />
                    </div>
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="mt-2">
                    {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" /> Préférences de Notification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Mises à jour de statut de signalement", desc: "Soyez notifié quand vos signalements avancent." },
                  { label: "Alertes d'urgence", desc: "Pour les dépôts critiques nécessitant une action immédiate." },
                  { label: "Rapports hebdomadaires", desc: "Résumé de votre activité sur 7 jours." }
                ].map((pref, i) => (
                  <div key={i} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{pref.label}</p>
                      <p className="text-sm text-muted-foreground">{pref.desc}</p>
                    </div>
                    <button className="w-11 h-6 rounded-full bg-primary relative mt-1">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-6"></div>
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
