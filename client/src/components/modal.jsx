import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { motion } from "framer-motion"
import PartyCongratulation from "./congratulation"

export const Modal = ({ cong=false, children, handleClose, minH=0 }) => {
    return (createPortal(
        <div className="relative">
            {cong && <div className="absolute z-50 top-0 left-0" ><PartyCongratulation /></div>}
            <div className="w-screen h-screen bg-slate-100 bg-opacity-55 fixed top-0 left-0"></div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                className={`flex rounded z-20 bg-myellow p-4 w-fit h-fit flex-col fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] gap-4 justify-start items-center min-w-72 ${minH !== 0 && "min-h-96"}`} >

                <div className="w-full" >
                    <div onClick={handleClose} className="h-fit w-fit p-1 rounded hover:scale-105 active:scale-90 hover:bg-mred cursor-pointer duration-75 ease-linear" >
                        <X />
                    </div>
                </div>
                {children}
            </motion.div></div>, document.getElementById('root')))
}