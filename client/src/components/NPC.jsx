import { NpcAtom } from "@/atom/atom"
import { useRecoilValue } from "recoil"
import { motion } from "framer-motion"

export const NPCDada = () => {
    const npcinfo = useRecoilValue(NpcAtom)
    return (<div className="relative flex">
        <div className="relative group" >
            <motion.img
                initial={{x:-10,y:-10}}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, rotate: [0, -10, 10, -10, 10, 0] }}
                animate={{ y:0, x:0 }}
                transition={{ duration: 0.5}}
                className="sm:h-20 h-14 w-auto" src={npcinfo.image} />
            <div className="bg-orange-100 border border-orange-300 text-orange-900 text-sm opacity-0 absolute group-hover:opacity-100 px-2 py-1 rounded" ><p >{npcinfo.msg}</p> </div>
        </div>
    </div>)
}