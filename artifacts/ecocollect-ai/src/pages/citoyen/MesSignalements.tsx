import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { mockReports } from "@/data/mockData"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/form-elements"
import { Link } from "wouter"
import { motion } from "framer-motion"

export default function MesSignalements() {
  const myReports = mockReports.filter(r => r.citizenId === "CIT-001")
  const [filter, setFilter] = React.useState('Tous')
  const [search, setSearch] = React.useState('')

  const tabs = ['Tous', 'En attente', 'Validés', 'Assignés', 'En cours', 'Complétés', 'Rejetés']

  // Map plural display labels to singular internal status values
  const tabStatusMap: Record<string, string | null> = {
    'Tous': null,
    'En attente': 'En attente',
    'Validés': 'Validé',
    'Assignés': 'Assigné',
    'En cours': 'En cours',
    'Complétés': 'Complété',
    'Rejetés': 'Rejeté',
  }

  const filteredReports = myReports.filter(r => {
    const mapped = tabStatusMap[filter]
    if (mapped && r.status !== mapped) return false
    if (search && !r.address.toLowerCase().includes(search.toLowerCase()) && !r.wasteType.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mes Signalements</h1>
        <p className="text-muted-foreground mt-1">Suivez l'état d'avancement de vos contributions.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
        <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto gap-2 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                filter === tab 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Rechercher..." 
            className="pl-9 bg-card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-b uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Photo</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Lieu & Type</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-center">IA</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredReports.map((report, i) => (
                <motion.tr 
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-muted/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xs uppercase ${
                      report.wasteType === 'Plastique' ? 'bg-blue-100 text-blue-700' : 
                      report.wasteType === 'Organique' ? 'bg-green-100 text-green-700' : 
                      report.wasteType === 'Construction' ? 'bg-amber-100 text-amber-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {report.wasteType.substring(0,3)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(report.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold">{report.wasteType}</p>
                    <p className="text-muted-foreground text-xs truncate max-w-[200px]">{report.address}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={report.status} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    {report.aiConfidence > 0 ? (
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">{report.aiConfidence}%</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/citoyen/signalement/${report.id}`}>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                    </Link>
                  </td>
                </motion.tr>
              ))}
              
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Aucun signalement trouvé pour ces critères.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}
