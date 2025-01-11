import { Box } from "@/components/box"
import { NPCDada } from "@/components/NPC"
import { Notebook, BriefcaseMedical, ChartBarIncreasing } from "lucide-react"
import { UserSection } from "@/components/userSection"
import { HeatMap } from "@/components/Heatmap"
import { BadgeSection } from "@/components/badgeSection"
import { MidTrees } from "@/components/Tree"
import { MoodVal } from "@/components/Moodval"

export const ProfileScreen = () => {
    return(
      <>
        <MoodVal />
        <div className="h-fit flex flex-col gap-10" >
          <section className="flex justify-between items-center gap-10" >
            <UserSection />
            <NPCDada />
            <MidTrees />
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

        </div>
      </>
    )
}