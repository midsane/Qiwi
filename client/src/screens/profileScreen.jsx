import { Box } from "@/components/box"
import { NPCDada } from "@/components/NPC"
import { Notebook, BriefcaseMedical, ChartBarIncreasing } from "lucide-react"
import { UserSection } from "@/components/userSection"
import { HeatMap } from "@/components/Heatmap"
import { BadgeSection } from "@/components/badgeSection"

export const ProfileScreen = () => {
    return(<div className="h-fit flex flex-col gap-2" >
     <section className="flex justify-center items-center" >
        <UserSection />
        <NPCDada />
     </section>

     <section className="flex gap-5 flex-col justify-center items-center" >
        <div className="w-full flex  justify-between items-center rounded">
          <Box logo={<Notebook />} title="Journal" />
          <Box logo={<ChartBarIncreasing />} title="Dashboard" />
          <Box logo={<BriefcaseMedical />} title="First Aid Kit" />
        </div>
        <BadgeSection />
     </section>

     <section>
        <HeatMap />
     </section>
        
    </div>)
}