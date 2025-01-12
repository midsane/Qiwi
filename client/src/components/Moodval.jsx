import { LoaderAtom, LoaderMsgAtom, moodAtom, moodEnergyScoreAtom, ToastMsgAtom, userGrowthAtom } from "@/atom/atom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { Modal } from "./modal"
import { Angry, Frown, Meh, Smile, Laugh, CircleOff, BatteryWarning, BatteryLow, BatteryMedium, BatteryFull, BatteryCharging } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { updateXp } from "@/http/http";

export const MoodVal = () => {
    const [moodInfo, setMoodInfo] = useRecoilState(moodAtom)
    const [moodEnergy, setMoodEnergy] = useRecoilState(moodEnergyScoreAtom)
    const setLoader = useSetRecoilState(LoaderAtom);
    const setLoaderMsg = useSetRecoilState(LoaderMsgAtom)
    const setToastMsg = useSetRecoilState(ToastMsgAtom)
    const setGrowth = useSetRecoilState(userGrowthAtom)
    const [openModal, setOpenModal] = useState(false)
    const handleMoodSubmit = async() => {
        setLoader(true)
        setLoaderMsg("submitting mood data...")
        const xpResponse = await updateXp()
        console.log(xpResponse)
        if(xpResponse){
            console.log("xpresponse", xpResponse)
            setGrowth({xp: xpResponse.xp, level: xpResponse.level})
        }
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

    if (moodInfo.responded) {
        return (<>
            {openModal && <Modal cong={true} handleClose={() => setOpenModal(false)} >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎉</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                    Great job!
                </h2>
                <div className="bg-purple-50 rounded-2xl p-4 mt-2">
                    <p className="text-orange-900 font-semibold">
                        You earned +1 xp points
                    </p>
                </div>


                <button
                    onClick={() => setOpenModal(false)}
                    className="w-1/2 bg-purple-600 text-white rounded-full py-3 font-semibold hover:bg-purple-700 transition-colors"
                >
                    ok </button>
                    

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
                            <p className="text-center">Mood</p>
                        </div>
                        <div  >
                            <EnergyLogo score={moodEnergy.energy} />
                            <p className="text-center" >logo</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="bg-purple-50 rounded-2xl p-3 mt-6">
                            <p className="text-orange-900 font-semibold">
                                Whats your mood today!
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {diffMoodsLogo.map((m, i) => {
                                return (<div key={i} className="cursor-pointer active:scale-75 hover:scale-105 
                                    ease-linear duration-75">
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i / 10 }}
                                        className="cursor-pointer active:scale-75 hover:scale-105 
                                    ease-linear duration-75"
                                        onClick={() => handleClick(m.score, 1)} >{m.logo}</motion.div>
                                </div>)
                            })}
                        </div>
                        <div className="bg-purple-50 rounded-2xl p-3 mt-6">
                            <p className="text-orange-900 font-semibold">
                                Whats your Energy level today!
                            </p>
                        </div>

                        <div className="flex gap-2">
                            {diffEnergyLogo.map((m, i) => {
                                return (<div  key={i} className="cursor-pointer active:scale-75 hover:scale-110
                                    ease-linear duration-75" >
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i / 10 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="cursor-pointer active:scale-75 hover:scale-105 
                                    ease-linear duration-75" onClick={() => handleClick(m.score, 2)} >{m.logo}
                                    </motion.div>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>

                
                <button
                    onClick={handleMoodSubmit}
                    className="w-1/2 bg-purple-600 text-white rounded-full py-3 font-semibold hover:bg-purple-700 transition-colors"
                >
                    ok </button>
                    
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

export const MoodLogo = ({ score = -1, circle = true }) => {
    if (score === -1) {
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
            logo = <Smile color="brown" />
            break;
        case 5:
            logo = <Laugh color="green" />
            break;
        default:
            logo = <CircleOff />
    }
    return (<AnimatePresence>
        {circle ? <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
            >{logo}</motion.div>
        </div> : <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
        >{logo}</motion.div>
        }


    </AnimatePresence>)
}

export const EnergyLogo = ({ score = -1, circle = true }) => {
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
    return (<AnimatePresence>
        {circle ? <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
            >{logo}</motion.div>
        </div> : <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
        >{logo}</motion.div>}
    </AnimatePresence>)
}