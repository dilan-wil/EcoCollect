import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { mockAgents } from "@/data/mockData"
import { AgentCard } from "@/components/ui/AgentCard"
import { Input } from "@/components/ui/form-elements"
import { Search, Filter, Users } from "lucide-react"

export default function Agents() {
  const [search, setSearch] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('Tous')
  
  const filteredAgents = mockAgents.filter(a => {
    if (statusFilter !== 'Tous' && a.status !== statusFilter) return false
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <AppLayout>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agents de Collecte</h1>
          <p className="text-muted-foreground mt-1">Gérez vos effectifs et suivez leurs performances.</p>
        </div>
        <div className="flex items-center gap-2 bg-card border px-4 py-2 rounded-lg shadow-sm">
          <Users className="w-5 h-5 text-primary" />
          <span className="font-semibold text-lg">{mockAgents.length}</span>
          <span className="text-muted-foreground text-sm">Agents totaux</span>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-4 mb-8 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Rechercher un agent..." 
            className="pl-9 bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <div className="flex items-center gap-2 text-sm text-muted-foreground border-r pr-3 shrink-0">
            <Filter className="w-4 h-4" /> Statut
          </div>
          {['Tous', 'Disponible', 'En mission', 'Indisponible'].map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === f 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAgents.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </AppLayout>
  )
}
