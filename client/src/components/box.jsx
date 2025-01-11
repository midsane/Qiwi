import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Modal } from "./modal"
import { FirstAidKit } from "@/screens/firstaidkit"
import {motion} from "framer-motion"

export const Box = ({title, logo}) => {
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const handleClick = () => {
        switch(title){
            case "Journal":
                navigate('/journal');
                break;
            case "Dashboard":
                navigate("/dashboard");
                break;
            case "First Aid Kit":
                setOpenModal(true)
                
        }
    }

    return(<>
        {openModal && <Modal handleClose={() => setOpenModal(false)} >
             <FirstAidKit />
            
            </Modal>}
        <motion.div 
        initial={{ opacity: 0, scale: 0.9,y:-10 }}
        animate={{ opacity: 1, scale: 1, y:0 }}
        transition={{ duration: 0.5 }}
        onClick={handleClick} className="bg-mblue min-w-32 flex justify-center items-center flex-col active:scale-90 ease-linear duration-100 hover:bg-mgreen rounded p-4 text-slate-100 font-thin cursor-pointer" >
            <div>{logo}</div>
            <p>{title}</p>

        </motion.div>
    </>)
}