import { Edit, Smile } from "lucide-react"
import { useRef, useState } from "react"
import { Modal } from "./modal"
import { avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9 } from "@/data/data"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { avatarAtom, LoaderAtom, LoaderMsgAtom, ToastMsgAtom, userGrowthAtom, usernameAtom } from "@/atom/atom"
import { EnergyLogo, MoodLogo } from "./Moodval"
import { motion } from "framer-motion"

export const avatarArr = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9]

export const UserSection = () => {
    const [currentAvatar, setCurrentAvatar] = useRecoilState(avatarAtom)
    const [openModal, setOpenModal] = useState(false)
    const [usernameModal, setUsernameModal] = useState(false)

    const [username, setUsername] = useRecoilState(usernameAtom);
    const userNameRef = useRef();
    const setLoadingStatus = useSetRecoilState(LoaderAtom)
    const setLoaderMsg = useSetRecoilState(LoaderMsgAtom)
    const setToastMsg = useSetRecoilState(ToastMsgAtom)

    const growth = useRecoilValue(userGrowthAtom);
    

    const handleClickonChibi = (a) => {
        setLoadingStatus(true)
        setLoaderMsg("updating avatar")
        //fetch request
        setLoadingStatus(false)
        setLoaderMsg("")
        setCurrentAvatar(a)
    }

    const handleUsernameUpdate = () => {
        if (userNameRef.current.value.length > 14) {
            setToastMsg("username cant be larger than 14 characters!")
            return;
        }
        if (userNameRef.current.value === "") {
            setToastMsg("username cannot be empty!")
        }
        setLoadingStatus(true)
        setLoaderMsg("updating username")
        //fetch request
        setLoadingStatus(false)
        setLoaderMsg("")
        setUsername(userNameRef.current.value)
    }

    return (<>
        {usernameModal &&
            <Modal handleClose={() => setUsernameModal(false)}>
                <div className="bg-purple-50 rounded-lg p-3  mt-2 flex justify-between">
                    <p className="text-orange-900 font-semibold">
                        update your Username:
                    </p>
                    <Smile color="purple" />
                </div>
                <input ref={userNameRef} placeholder="username" className="px-2 text-xl py-1 rounded" />

                <button
                    onClick={handleUsernameUpdate}
                    className="w-1/2 bg-mgreen text-white rounded-full py-2 font-semibold hover:bg-mblue transition-colors"
                >
                    update </button>
            </Modal>
        }
        {openModal &&

            <Modal handleClose={() => setOpenModal(false)}>
                <div className="flex justify-start max-w-52 gap-2 flex-wrap">

                    <div className="bg-purple-50 rounded-2xl p-2 mb-4">
                        <p className="text-orange-900 font-semibold">
                            Choose your Avatar:
                        </p>
                    </div>
                    
                    {avatarArr.map((a, i) =>
                        <motion.div
                            key={i}
                            onClick={() => handleClickonChibi(a)}
                            className="cursor-pointer hover:scale-105 duration-75 ease-linear active:scale-90"
                            initial={{ opacity: 0, scale: 0.8, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.4, type: "spring" }}

                        >
                            <motion.img
                                initial={{ opacity: 0.8 }}
                                animate={{ opacity: 1 }}
                                className="w-16 hover:scale-105 duration-75 aspect-square rounded-full object-cover border border-orange-900"
                                src={a}
                            />
                        </motion.div>
                    )}
                </div>
            </Modal>}

        <div className="flex gap-0 px-1 sm:gap-2 justify-center items-center">
            <div className="rounded-full group relative sm:w-20 w-14 aspect-square bg-black" >
                <img className="w-14 sm:w-20 aspect-square rounded-full object-cover border border-orange-900" src={currentAvatar} />
                <div onClick={() => setOpenModal(true)}
                    className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer active:scale-95 hover:scale-105 group-hover:opacity-100 opacity-0 ease-linear duration-75 p-1 bg-black rounded bg-opacity-80 ">
                    <Edit size={18} color="yellow" />
                </div>
            </div>
            <div className="flex flex-col h-full justify-center items-center ">
                <div className="flex gap-2">
                    <MoodLogo circle={false}/>
                    <EnergyLogo circle={false} />
                </div>
                <div className="items-end text-md sm:text-xl text-orange-600" ><p >{username?.slice(0, 10)}{username?.length > 10 && "..."}</p></div>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex gap-2 items-start">
                    <motion.p
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: 3, duration: 2 }}
                        className="opacity-80 text-sm sm:text-md text-orange-900" >xp {growth.xp}</motion.p>
                    <motion.p
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: 3, duration: 2 }}
                        className="opacity-80  text-sm sm:text-md text-orange-900" >level {growth.level}</motion.p>
                </motion.div>

            </div>
            <div
                onClick={() => setUsernameModal(true)}
                className="cursor-pointer active:scale-95 hover:scale-105 ease-linear duration-75" >
                <Edit color="red" size={20} />
            </div>
        </div>
    </>)
}

