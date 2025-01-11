import { NPCDada } from "@/components/NPC"
import { MidTrees } from "@/components/Tree"
import { UserSection } from "@/components/userSection"

export const ProfileScreen = () => {
    return(<div className="h-fit flex" >
     <section className="flex justify-center items-center" >
        <UserSection />
        <NPCDada />
      
     </section>
        
    </div>)
}