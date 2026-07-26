import InfoCard from "./InfoCard"

interface TrainingCardProps {
  baseExp: number
  captureRate: number
}

export default function TrainingCard({ baseExp, captureRate }: TrainingCardProps) {
  return (
    <InfoCard title="Training">
      <div className="flex flex-col gap-3 text-sm font-bold text-gray-700">
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-gray-500">Base EXP</span>
          <span>{baseExp}</span>
        </div>
        <div className="flex justify-between pb-1">
          <span className="text-gray-500">Catch Rate</span>
          <span>
            {captureRate} <span className="text-[10px] text-gray-400 font-normal">/ 255</span>
          </span>
        </div>
      </div>
    </InfoCard>
  )
}