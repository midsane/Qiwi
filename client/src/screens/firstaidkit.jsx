import {Scan, Tornado, HandHeart, LogIn} from "lucide-react"
import { useNavigate } from "react-router-dom"

export const FirstAidKit = () => {
    return(<div className="flex flex-col gap-2">
            {['3-3-3', "Anxiety-Breathing", "Know your emotion!"].map(t => <Box title={t} />)}
    </div>)
}

const Box = ({title}) => {
    const navigate = useNavigate()
    let color;
    let logo;
    switch(title){
        case "3-3-3":
            color = "bg-red-400";
            logo=<Scan />
            break;
        case 'Anxiety-Breathing':
            color = 'bg-blue-300';
            logo=<Tornado />
            break;
        default:
            color = 'bg-green-400';
            logo=<HandHeart />
    }
    return (<div onClick={() => navigate("/"+title)} className={`p-8 min-w-64 rounded ${color} bg-opacity-90  text-mblack hover:bg-opacity-100 duration-70 flex justify-between ease-linear active:scale-90 cursor-pointer`}>
        <span>{title}</span>
        <span>{logo}</span>
    </div>)
}