import { Box } from "@/components/box"
import { NPCDada } from "@/components/NPC"
import { Notebook, BriefcaseMedical, ChartBarIncreasing } from "lucide-react"
import { UserSection } from "@/components/userSection"
import { HeatMap } from "@/components/Heatmap"
import { BadgeSection } from "@/components/badgeSection"
import { MidTrees } from "@/components/Tree"
import { MoodVal } from "@/components/Moodval"
import { useSetRecoilState } from "recoil"
import { avatarAtom, LoaderAtom, LoaderMsgAtom, ToastMsgAtom, userGrowthAtom, usernameAtom } from "@/atom/atom"
import { useEffect } from "react"

export const ProfileScreen = () => {
  const setLoader = useSetRecoilState(LoaderAtom)
  const setToastMsg = useSetRecoilState(ToastMsgAtom)
  const setLoaderMsg = useSetRecoilState(LoaderMsgAtom)
  const setUserGrowth = useSetRecoilState(userGrowthAtom);
  const setUsername = useSetRecoilState(usernameAtom)
  const setAvatar = useSetRecoilState(avatarAtom)

      useEffect(() => {
        setLoader(true)
        setLoaderMsg("loading user data")
        const email = localStorage.getItem('email')
        fetch(import.meta.env.VITE_BACKEND_URL + "userDetails", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify({email}),
        })
          .then(response => response.json())
          .then(data => {
          console.log(data);
          setUserGrowth({xp: data.xp, level: data.level});
          setUsername(data.username);
            console.log(data)
          setAvatar(avatarArr[data.imageUrl])
            
            setToastMsg("Successfully fetched user's data")
          })
          .catch(error => {
            console.log(error)
            setToastMsg("Error fetching user details")
          });
          setLoader(false)
          setLoaderMsg("")
      }, [])

    return(
      <>
       <br />
        <MoodVal />
        <div className="h-fit flex flex-col gap-10 justify-center items-center" >
          <section className="flex max-w-[80%] sm:max-w-screen justify-between items-center gap-10" >
            <UserSection />
            <NPCDada />
            <MidTrees />
          </section>

          <section className="flex gap-5 max-w-[80%] sm:max-w-screen flex-col justify-center items-center" >
            <div className="w-full flex  justify-between items-center rounded">
              <Box logo={<Notebook />} title="Journal" />
              <Box logo={<ChartBarIncreasing />} title="Dashboard" />
              <Box logo={<BriefcaseMedical />} title="First Aid Kit" />
            </div>
            <BadgeSection />
          </section>

          <section className="max-w-[80%]" >
            <HeatMap />
          </section>

        </div>
      </>
    )
}