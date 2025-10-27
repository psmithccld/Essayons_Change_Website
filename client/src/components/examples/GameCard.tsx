import GameCard from '../GameCard'
import { Gamepad2, Brain, Users } from 'lucide-react'

export default function GameCardExample() {
  return (
    <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto p-6">
      <GameCard
        icon={Gamepad2}
        title="Change Readiness Quiz"
        description="Interactive assessment to evaluate your organization's readiness for transformation."
      />
      <GameCard
        icon={Brain}
        title="Leadership Scenarios"
        description="Gamified scenarios to practice change leadership skills in realistic situations."
      />
      <GameCard
        icon={Users}
        title="Stakeholder Mapping"
        description="Interactive tool to visualize and analyze stakeholder relationships and influence."
      />
    </div>
  )
}
