import { ToastMsgAtom } from "@/atom/atom"
import {Workflow, Angry, Laugh, Meh, Frown, Skull } from "lucide-react"
import { useRef, useState } from "react"
import { useSetRecoilState } from "recoil"
import { FuturisticLoader } from "./aiLoading"
export const KnowYourEmotion = () => {
    const setToastMsg = useSetRecoilState(ToastMsgAtom)
    const paraRef = useRef()
    const [prediction, setPrediction] = useState("")
    const [loading, setLoading] = useState(false);
    const handleClick = async() => {
        setLoading(true)
        const para = paraRef.current.value 
        if(para.trim() === ""){
            setToastMsg("input cannot be empty! Dont be shy")
            return;
        }
        //api call - joy, fear, anger, neutral, sadnesse
        const response = await fetch("https://model.qiwi.midsane.tech/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({message:  para})
        })

        const data = await response.json()
        setPrediction(data.prediction)
        setLoading(false)
    }
    return (
        <div className="flex flex-col gap-2 mt-10" >
            <div className="bg-purple-50 flex flex-col gap-2 rounded-2xl p-4 mt-6">
                <p className="text-orange-900 font-semibold">
                    Tell us about your day so that we can figure out your mood!
                </p>
                <span>
                    <Workflow color="red" />
                </span>

            </div>

            <textarea ref={paraRef} className="px-10 rounded " rows={8}  placeholder="Anything you wanna share?" >

            </textarea>
            <button
                onClick={handleClick}
                className="mt-6 w-full bg-purple-600 text-white rounded-full py-3 font-semibold hover:bg-purple-700 transition-colors active:scale-95 duration-100 ease-linear"
            >
                submit
            </button>
            {loading && <FuturisticLoader />}
            {prediction !== "" && <Logo prediction={prediction} />}
        </div>
    )
}

const Logo = ({prediction}) => {
    
    let logo;
    switch(prediction){
        case "joy":
            logo = <Laugh />
            break;
        case "sadness":
            logo = <Frown />
            break;
        case "fear":
            logo = <Skull />
            break;
        case 'anger':
            logo = <Angry />
            break;
        default:
            logo = <Meh />
            break;
        
    }
    return (<div className="bg-purple-50 justify-center items-center flex flex-col gap-2 rounded-2xl p-4 mt-6">
        <p className="text-orange-900 font-semibold">
            we predict your mood to be {prediction}!
        </p>
        <div>
            {logo}
        </div>
    </div>)
}