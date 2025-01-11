import { NpcAtom } from "@/atom/atom"
import { useRecoilValue } from "recoil"

export const NPCDada = () => {
    const npcinfo = useRecoilValue(NpcAtom)
    return (<div className="relative">
        <div className="relative group" >
            <img className="w-20" src={npcinfo.image} />
            <div className="bg-stone-300 opacity-0 group-hover:opacity-100 px-2 py-1 rounded" ><p >{npcinfo.msg}</p> </div>
        </div>
    </div>)
}