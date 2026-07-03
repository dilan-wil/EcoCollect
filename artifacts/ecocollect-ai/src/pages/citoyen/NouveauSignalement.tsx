import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PhotoUpload } from "@/components/ui/PhotoUpload"
import { AIResultCard } from "@/components/ui/AIResultCard"
import { Button } from "@/components/ui/button"
import { Input, Textarea, Label } from "@/components/ui/form-elements"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Navigation, Send } from "lucide-react"
import { toast } from "sonner"
import { useLocation } from "wouter"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"

interface FormValues {
  address: string
  lat: string
  lng: string
  description: string
  wasteType: string
  volume: string
}

export default function NouveauSignalement() {
  const [, setLocation] = useLocation()
  const [isUploading, setIsUploading] = React.useState(false)
  const [aiResult, setAiResult] = React.useState<any>(null)
  
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      address: "Rue de la République, 69001 Lyon",
      lat: "45.7640",
      lng: "4.8357",
      description: "",
      wasteType: "Ménager",
      volume: "Moyen"
    }
  })

  const handleUpload = (file: File) => {
    setIsUploading(true)
    
    // Simulate AI processing
    setTimeout(() => {
      setIsUploading(false)
      const result = {
        confidence: 97,
        objects: ['Sacs plastiques', 'Cartons', 'Déchets ménagers'],
        accumulationLevel: 'Moyen',
        decision: 'Validé',
        reason: 'Type de déchet clairement identifiable',
        estimatedTime: '45 min'
      }
      setAiResult(result)
      setValue('wasteType', 'Plastique')
      setValue('volume', 'Moyen')
      toast.success('Image analysée avec succès par l\'IA')
    }, 2000)
  }

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success('Signalement envoyé avec succès !', {
          description: 'Une équipe sera assignée prochainement.'
        })
        setLocation('/citoyen/mes-signalements')
        resolve(true)
      }, 1500)
    })
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Nouveau Signalement</h1>
          <p className="text-muted-foreground mt-1">Aidez-nous à garder la ville propre en signalant un dépôt sauvage.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">1. Photo du dépôt</h3>
              <PhotoUpload onUpload={handleUpload} isUploading={isUploading} />
            </CardContent>
          </Card>

          <AnimatePresence>
            {aiResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <AIResultCard {...aiResult} />
              </motion.div>
            )}
          </AnimatePresence>

          <Card>
            <CardContent className="p-6 space-y-6">
              <h3 className="font-semibold text-lg">2. Localisation & Détails</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Adresse approximative</Label>
                  <div className="flex gap-2 mt-1">
                    <Input id="address" {...register("address", { required: true })} />
                    <Button type="button" variant="outline" size="icon" className="shrink-0" title="Utiliser ma position">
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lat">Latitude</Label>
                    <Input id="lat" readOnly {...register("lat")} className="mt-1 bg-muted/50" />
                  </div>
                  <div>
                    <Label htmlFor="lng">Longitude</Label>
                    <Input id="lng" readOnly {...register("lng")} className="mt-1 bg-muted/50" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="wasteType">Type de déchet</Label>
                    <select 
                      id="wasteType" 
                      {...register("wasteType")} 
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors mt-1"
                    >
                      <option value="Ménager">Ménager</option>
                      <option value="Plastique">Plastique</option>
                      <option value="Organique">Organique</option>
                      <option value="Construction">Construction</option>
                      <option value="Électronique">Électronique</option>
                      <option value="Dangereux">Dangereux</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="volume">Volume estimé</Label>
                    <select 
                      id="volume" 
                      {...register("volume")} 
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors mt-1"
                    >
                      <option value="Petit">Petit</option>
                      <option value="Moyen">Moyen</option>
                      <option value="Grand">Grand</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description (Optionnel)</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Précisions utiles pour les agents de collecte..." 
                    className="mt-1"
                    rows={3}
                    {...register("description")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => setLocation('/citoyen/dashboard')}>
              Annuler
            </Button>
            <Button type="submit" disabled={!aiResult || isSubmitting} className="gap-2 px-8">
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isSubmitting ? 'Envoi...' : 'Envoyer le signalement'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
