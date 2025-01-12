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

                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎉</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Congratulations!
                </h2>
                <div className="bg-purple-50 rounded-2xl p-4 mt-6">
                    <p className="text-purple-700 font-semibold">
                        You've Earned Starters Badge
                    </p>
                </div>
                <button
                    onClick={() => setOpenModal(false)} 
                    className="w-1/2 bg-purple-600 text-white rounded-full py-3 font-semibold hover:bg-purple-700 transition-colors"
                >
                    Done </button>
                </Modal>}
            <div className="flex flex-col gap-5  bg-orange-100 border border-orange-400 w-full justify-between rounded p-2">
                <div className="flex gap-3">
                    <p className="text-orange-900" >Badges: </p>
                    <Award color="darkOrange" />
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
