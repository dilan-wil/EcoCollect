import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "./card"
import { StatusBadge } from "./StatusBadge"
import { Badge } from "./badge"
import { MapPin, Calendar, AlertTriangle, ShieldCheck } from "lucide-react"
import { Report } from "@/data/mockData"
import { Link } from "wouter"

interface ReportCardProps {
  report: Report
  role: 'citoyen' | 'admin' | 'agent'
  delay?: number
}

export function ReportCard({ report, role, delay = 0 }: ReportCardProps) {
  const detailPath = role === 'agent'
    ? `/agent/mission/${report.id}`
    : role === 'admin'
    ? `/admin/signalement/${report.id}`
    : `/citoyen/signalement/${report.id}`

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -4 }}
    >
      <Link href={detailPath}>
        <Card className="cursor-pointer h-full hover:shadow-md transition-all duration-300 border-border/50">
          <div className="h-40 bg-muted relative overflow-hidden group">
            {/* Fake placeholder photo based on waste type */}
            <div className={`absolute inset-0 flex items-center justify-center opacity-80 group-hover:scale-105 transition-transform duration-500 ${
              report.wasteType === 'Plastique' ? 'bg-blue-100/50' : 
              report.wasteType === 'Organique' ? 'bg-green-100/50' : 
              report.wasteType === 'Dangereux' ? 'bg-red-100/50' : 
              'bg-amber-100/50'
            }`}>
              <div className="text-muted-foreground/50 text-4xl font-bold uppercase tracking-widest">{report.wasteType.substring(0,2)}</div>
            </div>
            
            <div className="absolute top-3 left-3">
              <StatusBadge status={report.status} />
            </div>
            {role === 'admin' && report.aiConfidence > 0 && (
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur text-xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-primary" />
                  IA {report.aiConfidence}%
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <h4 className="font-semibold text-base mb-1 truncate">{report.wasteType} - {report.volume}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">{report.description}</p>
            
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{report.address}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{new Date(report.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
                {report.priority === 'Critique' && (
                  <div className="flex items-center gap-1 text-destructive font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    Urgent
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
