import { Edit } from "lucide-react"
import { useRef, useState } from "react"
import { Modal } from "./modal"
import { avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9 } from "@/data/data"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { avatarAtom, LoaderAtom, LoaderMsgAtom, ToastMsgAtom, usernameAtom } from "@/atom/atom"
export const UserSection = () => {
    const [currentAvatar, setCurrentAvatar] = useRecoilState(avatarAtom)
    const [openModal, setOpenModal] = useState(false)
    const [usernameModal, setUsernameModal] = useState(false)
    const avatarArr = [avatar1, avatar2,avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9]
    const [username, setUsername] = useRecoilState(usernameAtom);
    const userNameRef = useRef();
    const setLoadingStatus = useSetRecoilState(LoaderAtom)
    const setLoaderMsg = useSetRecoilState(LoaderMsgAtom)
    const setToastMsg = useSetRecoilState(ToastMsgAtom)

    const handleClickonChibi = (a) => {
        setLoadingStatus(true)
        setLoaderMsg("updating avatar")
        //fetch request
        setLoadingStatus(false)
        setLoaderMsg("")
        setCurrentAvatar(a)
    }

    const handleUsernameUpdate = () => {
        if(userNameRef.current.value.length > 14){
            setToastMsg("username cant be larger than 14 characters!")
            return;
        }
        if(userNameRef.current.value === ""){
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
            <input ref={userNameRef} placeholder="username" className="px-2 text-xl py-1 rounded" />
            <button onClick={handleUsernameUpdate} className="bg-mred px-2 py-1 rounded active:scale-90 duration-75 ease-linear text-stone-700 " >update</button>
        </Modal>
        }
        {openModal && 
        
        <Modal handleClose={() => setOpenModal(false)}>
                <div className="flex justify-start max-w-52 gap-2 flex-wrap">
                    {avatarArr.map((a, i) =>
                        <div onClick={() => handleClickonChibi(a)} className="cursor-pointer hover:scale-105 duration-75 ease-linear active:scale-90"  >
                            <img className="w-16 aspect-square rounded-full object-cover border border-mgreen" src={a} key={i} />
                        </div>
                    )
                        }
                </div>
        </Modal>}

        <div className="flex gap-2 justify-center items-center">
            <div className="rounded-full group relative w-14 aspect-square bg-black" >
                <img className="w-16 aspect-square rounded-full object-cover border border-mgreen" src={currentAvatar} />
                <div onClick={() => setOpenModal(true)} 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer active:scale-95 hover:scale-105 group-hover:opacity-100 opacity-0 ease-linear duration-75 p-1 bg-black rounded bg-opacity-80 ">
                    <Edit size={18} color="yellow" />
                </div>
            </div>
            <div className="flex flex-col h-full justify-center items-center ">
                <div className="items-end text-xl" ><p >{username.slice(0,10) }{username.length > 10 && "..."}</p></div>
                <div className="flex gap-2 items-start">
                    <p className="opacity-80" >xp {"1"}</p>
                    <p className="opacity-80" >level {"1"}</p>
                </div>

            </div>
            <div 
            onClick={() => setUsernameModal(true)}
            className="cursor-pointer active:scale-95 hover:scale-105 ease-linear duration-75" >
                <Edit size={20} />
            </div>
        </div>
    </>)
}

