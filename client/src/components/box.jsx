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
        onClick={handleClick} className="bg-amber-500 border border-orange-300 sm:min-w-32 min-w-24 flex justify-center items-center flex-col active:scale-90 ease-linear duration-100 hover:bg-amber-300 text-orange-900 rounded  sm:px-4 sm:py-4 py-4 px-1 sm:text-md text-xs font-thin cursor-pointer" >
            <div>{logo}</div>
            <p>{title}</p>

        </motion.div>
    </>)
}