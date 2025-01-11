import {Scan, Tornado, HandHeart, LogIn} from "lucide-react"

export const FirstAidKit = () => {
    return(<div className="flex flex-col gap-2">
            {['3-3-3', "Anxiety-Breathing", "Know your emotion!"].map(t => <Box title={t} />)}
    </div>)
}

const Box = ({title}) => {
    let color;
    let logo;
    switch(title){
        case "3-3-3":
            color = "mred";
            logo=<Scan />
            break;
        case 'Anxiety-Breathing':
            color = 'mblue';
            logo=<Tornado />
            break;
        default:
            color = 'mgreen';
            logo=<HandHeart />
    }
    return (<div className={`p-8 min-w-64 rounded bg-${color} bg-opacity-90 text-mblack hover:bg-opacity-100 duration-70 flex justify-between ease-linear active:scale-90 cursor-pointer`}>
        <span>{title}</span>
        <span>{logo}</span>
    </div>)
}