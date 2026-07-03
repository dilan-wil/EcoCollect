import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { mockStats, chartData, mockReports } from "@/data/mockData"
import { KpiCard } from "@/components/ui/KpiCard"
import { FileText, Activity, Users, Truck, BrainCircuit, CheckCircle2 } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportCard } from "@/components/ui/ReportCard"

export default function AdminDashboard() {
  const COLORS = ['#16A34A', '#2563EB', '#F59E0B', '#EF4444', '#8B5CF6', '#64748B']
  const urgentReports = mockReports.filter(r => r.priority === 'Critique' && r.status !== 'Complété')

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mission Control</h1>
        <p className="text-muted-foreground mt-1">Vue d'ensemble en temps réel des opérations de collecte de la ville.</p>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <KpiCard title="Signalements" value={mockStats.totalReports.toLocaleString()} icon={FileText} trend={{value: 12.5, label: "vs mois dernier"}} delay={0} className="lg:col-span-2" />
        <KpiCard title="Taux Complétion" value={`${mockStats.successRate}%`} icon={CheckCircle2} delay={0.1} />
        <KpiCard title="Validation IA" value={`${mockStats.aiValidationRate}%`} icon={BrainCircuit} delay={0.2} />
        <KpiCard title="Agents Actifs" value={mockStats.activeAgents} icon={Users} delay={0.3} />
        <KpiCard title="Véhicules" value={mockStats.activeVehicles} icon={Truck} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 shadow-sm border-border">
          <CardHeader>
            <CardTitle>Évolution des signalements (12 mois)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.monthlyReports} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A34A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: "hsl(var(--muted-foreground))", fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: "hsl(var(--muted-foreground))", fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "8px", border: "1px solid hsl(var(--border))", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    itemStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="reports" stroke="#16A34A" strokeWidth={3} fillOpacity={1} fill="url(#colorReports)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Urgent Actions */}
        <Card className="shadow-sm border-destructive/20 overflow-hidden flex flex-col">
          <div className="h-2 bg-destructive w-full"></div>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Activity className="w-5 h-5" />
              Interventions Urgentes
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto pr-2 pb-6 space-y-4">
            {urgentReports.map((report) => (
              <div key={report.id} className="p-3 border border-destructive/20 bg-destructive/5 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm">{report.wasteType}</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-destructive text-white">{report.priority}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mb-2">{report.address}</p>
                <button className="text-xs text-primary font-medium hover:underline">Assigner d'urgence →</button>
              </div>
            ))}
            {urgentReports.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Aucune urgence en cours.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Répartition par type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.wasteTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.wasteTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {chartData.wasteTypes.slice(0,4).map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Points noirs (Arrondissements)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.districts} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: "hsl(var(--foreground))", fontSize: 12}} />
                  <Tooltip cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }} />
                  <Bar dataKey="count" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm overflow-hidden flex flex-col">
          <div className="h-40 bg-muted/50 p-6 flex flex-col justify-center items-center text-center border-b relative">
            <div className="absolute inset-0 bg-primary/5"></div>
            <BrainCircuit className="w-10 h-10 text-primary mb-3 relative z-10" />
            <h3 className="font-bold text-lg relative z-10">L'IA suggère 3 actions</h3>
          </div>
          <CardContent className="p-0 flex-1">
            <div className="divide-y text-sm">
              <div className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <span className="font-semibold block mb-1">Renforcer la collecte 3ème Arr.</span>
                <span className="text-muted-foreground text-xs">Pic de +15% de signalements détecté depuis 48h.</span>
              </div>
              <div className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <span className="font-semibold block mb-1">Maintenance préventive VEH-002</span>
                <span className="text-muted-foreground text-xs">Le véhicule approche de la limite kilométrique.</span>
              </div>
              <div className="p-4 hover:bg-muted/50 transition-colors cursor-pointer text-primary font-medium text-center">
                Voir toutes les recommandations
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
