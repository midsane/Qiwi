import { LoaderAtom, LoaderMsgAtom, moodAtom, moodEnergyScoreAtom, ToastMsgAtom } from "@/atom/atom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { Modal } from "./modal"
import { Angry, Frown, Meh, Smile, Laugh, CircleOff, BatteryWarning, BatteryLow, BatteryMedium, BatteryFull, BatteryCharging } from "lucide-react"
import {AnimatePresence, motion} from "framer-motion";
import { useState } from "react";

export const MoodVal = () => {
    const [moodInfo, setMoodInfo] = useRecoilState(moodAtom)
    const [moodEnergy, setMoodEnergy] = useRecoilState(moodEnergyScoreAtom)
    const setLoader = useSetRecoilState(LoaderAtom);
    const setLoaderMsg = useSetRecoilState(LoaderMsgAtom)
    const setToastMsg = useSetRecoilState(ToastMsgAtom)
    const [openModal, setOpenModal] = useState(false)
    const handleMoodSubmit = () => {
        setLoader(true)
        setLoaderMsg("submitting mood data...")
        //update xp
        //fetch request
        setLoader(false);
        setLoaderMsg("")
        setMoodInfo(prev => {
            const newState = { ...prev };
            newState.responded = true;
            console.log(newState)
            return newState;
        })
        setOpenModal(true)
        
    }

    const handleClick = (score, t) => {
        setMoodEnergy(prev => {
            const newState = { ...prev }
            switch (t) {
                case 1:
                    newState.mood = score;
                    break;
                case 2:
                    newState.energy = score;
                    break;
            }
            return newState
        })
    }
    
    if(moodInfo.responded){
        return(<>
            {openModal && <Modal cong={true}  handleClose={() => setOpenModal(false)} >
                <p className="w-[80%] text-center">Congratulations 🎉! You earned XP!</p>
                <button onClick={() => setOpenModal(false)} className="py-1 px-8 rounded active:scale-95 ease-linear duration-100 hover:bg-green-300 bg-mgreen " >ok</button>
            </Modal>}
        </>)
    }
    
    if (!moodInfo.responded) {
        return (<>
          
            <Modal
                handleClose={() => {
                    setMoodInfo(prev => {
                        const newState = { ...prev };
                        newState.responded = true;
                        console.log(newState)
                        return newState;
                    })
                }}
            >
                <div className="flex flex-col gap-5">
                    <div className="flex gap-10" >
                        <div >
                            <MoodLogo score={moodEnergy.mood} />
                            <p>Mood</p>
                        </div>
                        <div  >
                            <EnergyLogo score={moodEnergy.energy} />
                            <p>logo</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p>Whats your's Mood today!</p>
                        <div className="flex gap-2">
                            {diffMoodsLogo.map((m, i) => {
                                return (<motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i / 10 }}
                                    className="cursor-pointer active:scale-90 ease-linear duration-75"
                                    onClick={() => handleClick(m.score, 1)} >{m.logo}</motion.div>)
                            })}
                        </div>

                        <p>Whats your Energy level today!</p>
                        <div className="flex gap-2">
                            {diffEnergyLogo.map((m, i) => {
                                return (<motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i / 10 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="cursor-pointer active:scale-90 ease-linear duration-75" onClick={() => handleClick(m.score, 2)} >{m.logo}</motion.div>)
                            })}
                        </div>
                    </div>
                </div>

                <button onClick={handleMoodSubmit} className="bg-mgreen px-6 py-1 rounded cursor-pointer active:scale-105 ease-linear duration-75" >ok</button>
            </Modal>
        </>)
    }
}

const diffMoodsLogo = [
    {
        logo: <Angry color="red" />,
        score: 1
    },
    {
        logo: <Frown color="purple" />,
        score: 2
    },
    {
        logo: <Meh color="blue" />,
        score: 3
    },
    {
        logo: <Smile color="brown" />,
        score: 4
    },
    {
        logo: <Laugh color="green" />,
        score: 5
    },
]

const diffEnergyLogo = [
    {
        logo: <BatteryWarning color="red" />,
        score: 1
    },
    {
        logo: <BatteryLow color="brown" />,
        score: 2
    },
    {
        logo: <BatteryMedium color="blue" />,
        score: 3
    },
    {
        logo: <BatteryFull color="purple" />,
        score: 4
    },
    {
        logo: <BatteryCharging color="green" />,
        score: 5
    },
]

export const MoodLogo = ({ score=-1 }) => {
    if(score === -1){
        const moodEnergy = useRecoilValue(moodEnergyScoreAtom)
        score = moodEnergy.mood
    }
    let logo;
    switch (score) {
        case 1:
            logo = <Angry color="red" />
            break;
        case 2:
            logo = <Frown color="purple" />
            break;
        case 3:
            logo = <Meh color="blue" />
            break;
        case 4:
            logo = <Smile  color="brown" />
            break;
        case 5:
            logo = <Laugh color="green" />
            break;
        default:
            logo =<CircleOff />
    }
    return (<AnimatePresence>
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
        >{logo}</motion.div>
    </AnimatePresence>)
}

export const EnergyLogo = ({ score=-1 }) => {
    let logo;
    if (score === -1) {
        const moodEnergy = useRecoilValue(moodEnergyScoreAtom)
        score = moodEnergy.energy
    }
    switch (score) {
        case 1:
            logo = <BatteryWarning color="red" />
            break;
        case 2:
            logo = <BatteryLow color="brown" />
            break;
        case 3:
            logo = <BatteryMedium color="blue" />
            break;
        case 4:
            logo = <BatteryFull color="purple" />
            break;
        case 5:
            logo = <BatteryCharging color="green" />
            break;
        default:
            logo = <CircleOff />
    }
    return <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
    >

        {logo}
        </motion.div>
}