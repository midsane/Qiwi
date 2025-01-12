import { Link, useNavigate } from "react-router-dom"
import {LogOut, Bird, Meh} from "lucide-react"
import { useState } from "react"
import { Modal } from "./modal";
export const NavBar = () => {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate()
    const handleClick = () => {
        setOpenModal(true)
        setTimeout(() => {
            setOpenModal(false)
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            navigate("/auth/login")
        }, 1000);

    }
    return (<>
        {openModal && <Modal handleClose={() => setOpenModal(false)}  >
                <Meh />
                <p>logging out...</p>
            </Modal>}
        <div className="flex w-screen h-[7vh] bg-myellow border-b border-orange-400">
            <ul className="w-full flex justify-between px-10" >
                <Link to={"/profile"} >
                    <div className="flex gap-2 h-full justify-center items-center">
                        <Bird />
                        Qiwi
                    </div>
                </Link>
                <Link >
                    <div onClick={handleClick} className="flex cursor-pointer h-full justify-center items-center active:scale-90 ease-linear duration-75">
                        <LogOut />
                    </div>
                </Link>
            </ul>
        </div>
    </>)
}