import InfoCard from "./InfoCard"
import { statColor } from "../../utils/statColor"

interface BaseStatsCardProps {
  stats: { name: string; value: number }[]
}

export default function BaseStatsCard({ stats }: BaseStatsCardProps) {
  return (
    <InfoCard title="Base Stats" className="flex-1">
      <div className="flex flex-col gap-3">
        {stats.map(stat => {
          const statName = stat.name.replace("special-", "Sp. ").replace("-", " ")
          const percentage = Math.min((stat.value / 255) * 100, 100)

          return (
            <div key={stat.name} className="flex items-center gap-2 xl:gap-3">
              <span className="w-16 xl:w-20 text-[10px] xl:text-[11px] font-extrabold text-gray-500 uppercase tracking-wider truncate">
                {statName}
              </span>
              <span className="w-7 xl:w-8 text-xs xl:text-sm font-bold text-gray-800 text-right">
                {stat.value}
              </span>
              <div className="flex-1 bg-gray-200 h-2.5 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full rounded-full ${statColor(stat.value)} transition-all duration-1000 ease-out`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </InfoCard>
  )
}