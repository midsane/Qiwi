import { Edit } from "lucide-react"
import { useState } from "react"
import { Modal } from "./modal"
import { avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9 } from "@/data/data"
export const UserSection = () => {
    const [currentAvatar, setCurrentAvatar] = useState(avatar1)
    const [openModal, setOpenModal] = useState(false)
    const avatarArr = [avatar1, avatar2,avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9]

    return (<>
        {openModal && 
        
        <Modal handleClose={() => setOpenModal(false)}>
                <div className="flex justify-start max-w-52 gap-2 flex-wrap">
                    {avatarArr.map((a, i) =>
                        <div  >
                            <img className="w-16 aspect-square rounded-full object-cover border border-mgreen" src={a} key={i} />
                        </div>
                    )
                        }
                </div>
        </Modal>}

        <div className="flex gap-2 justify-center items-center">
            <div className="rounded-full relative w-14 aspect-square bg-black" >
                <img className="w-16 aspect-square rounded-full object-cover border border-mgreen" src={currentAvatar} />
                <div onClick={() => setOpenModal(true)} className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer active:scale-95 hover:scale-105 ease-linear duration-75 ">
                    <Edit size={18} color="yellow" />
                </div>
            </div>
            <div className="flex flex-col h-full justify-center items-center ">
                <div className="items-end text-xl" ><p >username</p></div>
                <div className="flex gap-2 items-start">
                    <p className="opacity-80" >xp {"1"}</p>
                    <p className="opacity-80" >level {"1"}</p>
                </div>

            </div>
            <div className="cursor-pointer active:scale-95 hover:scale-105 ease-linear duration-75" >
                <Edit size={20} />
            </div>
        </div>
    </>)
}

