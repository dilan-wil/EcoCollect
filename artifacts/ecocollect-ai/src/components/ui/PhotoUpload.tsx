import * as React from "react"
import { UploadCloud, X, FileImage } from "lucide-react"

interface PhotoUploadProps {
  onUpload: (file: File) => void
  isUploading?: boolean
}

export function PhotoUpload({ onUpload, isUploading }: PhotoUploadProps) {
  const [dragActive, setDragActive] = React.useState(false)
  const [preview, setPreview] = React.useState<string | null>(null)
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Fake preview for prototype
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
      onUpload(file)
    }
    reader.readAsDataURL(file)
  }

  if (preview) {
    return (
      <div className="relative w-full h-64 rounded-xl border overflow-hidden group">
        <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            type="button"
            onClick={() => setPreview(null)}
            className="w-10 h-10 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/90 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {isUploading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-medium">Analyse IA en cours...</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div 
      className={`relative w-full h-64 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-6 transition-colors ${
        dragActive ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50 hover:border-primary/50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        accept="image/*" 
        capture="environment"
        onChange={handleChange} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
      />
      
      <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
        <UploadCloud className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold mb-1">Prendre une photo ou importer</h3>
      <p className="text-sm text-muted-foreground text-center">
        Glissez-déposez une image ici ou cliquez pour parcourir.
        <br/>L'IA analysera automatiquement le type et le volume.
      </p>
    </div>
  )
}
