import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { useLocation, useParams } from "wouter"
import { mockReports } from "@/data/mockData"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PhotoUpload } from "@/components/ui/PhotoUpload"
import { ArrowLeft, MapPin, Navigation, CheckCircle2, AlertTriangle, Camera } from "lucide-react"
import { toast } from "sonner"

export default function MissionDetail() {
  const [, setLocation] = useLocation()
  const params = useParams()
  const id = params.id
  
  const [report, setReport] = React.useState(mockReports.find(r => r.id === id) || mockReports[0])
  const [photoUploaded, setPhotoUploaded] = React.useState(false)

  const handleStart = () => {
    setReport({ ...report, status: 'En cours' })
    toast.info("Mission démarrée")
  }

  const handleComplete = () => {
    if (!photoUploaded) {
      toast.error("Veuillez prendre une photo du site nettoyé")
      return
    }
    setReport({ ...report, status: 'Complété' })
    toast.success("Mission terminée avec succès !")
    setTimeout(() => setLocation('/agent/dashboard'), 1500)
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <Button variant="ghost" onClick={() => setLocation('/agent/dashboard')} className="mb-4 text-muted-foreground -ml-4 hover:bg-transparent hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour à la tournée
        </Button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tight">Mission {report.id}</h1>
              <StatusBadge status={report.status} />
            </div>
            <p className="text-muted-foreground">{report.wasteType} - {report.volume}</p>
          </div>
          
          <Button variant="outline" className="gap-2 shrink-0">
            <Navigation className="w-4 h-4" /> Naviguer vers le lieu
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="bg-muted p-6 border-b">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">{report.address}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{report.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg border">
                    <p className="text-xs text-muted-foreground uppercase mb-1">Priorité</p>
                    <p className={`font-semibold flex items-center gap-1 ${report.priority === 'Critique' ? 'text-destructive' : ''}`}>
                      {report.priority === 'Critique' && <AlertTriangle className="w-3 h-3" />}
                      {report.priority}
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg border">
                    <p className="text-xs text-muted-foreground uppercase mb-1">Objets IA</p>
                    <p className="font-semibold text-sm truncate" title={report.aiObjects.join(', ')}>
                      {report.aiObjects[0]}...
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Camera className="w-4 h-4" /> Preuve de nettoyage
                  </h3>
                  {report.status === 'Complété' ? (
                    <div className="h-40 rounded-xl bg-green-500/10 border border-green-500/20 flex flex-col items-center justify-center text-green-700">
                      <CheckCircle2 className="w-8 h-8 mb-2" />
                      <p className="font-medium">Site nettoyé</p>
                    </div>
                  ) : (
                    <PhotoUpload onUpload={() => setPhotoUploaded(true)} />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="bg-card border rounded-xl p-6 sticky top-24 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Actions de mission</h3>
            
            <div className="space-y-4">
              {report.status === 'Assigné' && (
                <Button className="w-full h-12 text-lg" onClick={handleStart}>
                  Démarrer l'intervention
                </Button>
              )}
              
              {report.status === 'En cours' && (
                <>
                  <Button className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white" onClick={handleComplete}>
                    <CheckCircle2 className="w-5 h-5 mr-2" /> Marquer comme complétée
                  </Button>
                  <Button variant="outline" className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive">
                    Signaler un problème
                  </Button>
                </>
              )}

              {report.status === 'Complété' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg text-green-800 dark:text-green-400 font-medium flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Mission terminée et validée
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
