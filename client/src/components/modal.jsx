import { createPortal } from "react-dom"
import { X } from "lucide-react"
import {motion} from "framer-motion"

export const Modal = ({ children, handleClose }) => {
    return (createPortal(<motion.div 
    initial={{opacity: 0, }}
    animate={{opacity: 1, }}
    className="flex rounded bg-myellow p-4 w-fit h-fit flex-col fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] gap-4 justify-center items-center" >
        <div className="w-full" >
            <div onClick={handleClose} className="h-fit w-fit p-1 rounded hover:scale-105 active:scale-90 hover:bg-mred cursor-pointer duration-75 ease-linear" >
                <X />
            </div>
        </div>
        {children}
    </motion.div>, document.getElementById('root')))
}