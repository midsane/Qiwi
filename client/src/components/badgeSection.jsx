import { useRecoilState, useRecoilValue } from "recoil";
import GameBadge from "./badge";
import { Award } from "lucide-react";
import { BadgeListAtom } from "@/atom/atom";
import { useEffect, useState } from "react";
import { Modal } from "./modal";

export const BadgeSection = () => {
    const [midBadge, setMidBadge] = useRecoilState(BadgeListAtom)
    const[openModal, setOpenModal] = useState(false)
    const [newBadge, setNewBadge] = useState()
    useEffect(()=> {
        const fetchBadge = async() => {
          //fetch badge
        }
        
        fetchBadge();
    })
    
    
    useEffect(() => {
        if(!midBadge.fetched && midBadge.list.length === 0){

                setOpenModal(true);
                setNewBadge({
                    variant:'bronze',
                    wings: 0,
                    text: "starters"
                })
                //add a noob badge
                
                setMidBadge(prev =>  { 
                    if(prev.fetched) return prev;
                    const newState = { ...prev, list: [...prev.list] };
                    newState.list.push({
                        variant: 'bronze',
                        wings: 0,
                        text: "starters"
                    })
                    newState.fetched = true
                    
                    return newState
                 
                })
                
        }
    })

 
    return (
        <>
            {openModal && <Modal cong={true} minH={80} handleClose={() => setOpenModal(false)} >
                <GameBadge size="lg" variant={newBadge.variant} hasWings={newBadge.wings ? true: false} text={newBadge.text} />

                <br />
                <p className="w-[80%] text-center">Congratulations 🎉! You earned Starters Badge!</p>
                <button onClick={() => setOpenModal(false)} className="py-1 px-8 rounded active:scale-95 ease-linear duration-100 hover:bg-green-300 bg-mgreen " >ok</button>
                </Modal>}
            <div className="flex flex-col gap-5 bg-slate-100 w-full justify-between rounded p-1">
                <div className="flex gap-3">
                    <p>Badges: </p>
                    <Award color="red" />
                </div>
                <div className="flex justify-start w-full items-center">
                    {midBadge.list.map((b, i) => (
                        <div key={i} className="mr-3">
                            <GameBadge variant={b.variant} text={b.text} hasWings={b.wings ? true : false} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
