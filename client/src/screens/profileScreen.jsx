import { AvatarDemo } from "@/components/avatar"
import { MoodBarChart } from "@/components/Barchart"
import { PurpleDistributionHeatmap } from "@/components/HeatMap"
import { PersonalityChart } from "@/components/RadarChart"


export const ProfileScreen = () => {
    return(<div>
        ProfileScreen
        <div className="flex flex-col gap-20 " >
            <div>
                <AvatarDemo />
                <br />
                <p>username</p>
            </div>
           <div className="flex gap-10">
                <div className="">
                    <PurpleDistributionHeatmap />
                </div>
                <PersonalityChart />
                <MoodBarChart />
           </div>
        </div>
        
    </div>)
}