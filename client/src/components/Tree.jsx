import { tree1 } from "@/data/data"
import {motion} from "framer-motion"
export const MidTrees = () => {
    return(<>
        <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: [0, -10, 10, -10, 10, 0] }}
            initial={{ scale: 1, rotate: 0 }}
            animate={{ scale: 1, rotate: [0, -5, 5, -5, 5, 0] }}
        className="relative group" >
            <motion.img 
       
            className="h-20" src={tree1} />
            <div className="bg-stone-300 text-sm opacity-0 absolute group-hover:opacity-100 px-2 py-1 rounded" ><p >{"keep growing"}</p> </div>
        </motion.div>
   
    </>)
}