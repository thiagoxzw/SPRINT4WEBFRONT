import StatCard from './ui/StatCard'

export default function Stats({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      <StatCard value={stats.total} label="Conteúdos ativos" color="blue" />
      <StatCard value={stats.subjects} label="Matérias" color="pink" />
      <StatCard value={stats.favorites} label="Favoritos" color="green" />
      <StatCard value={`${stats.organization}%`} label="Organização" color="teal" />
    </div>
  )
}
