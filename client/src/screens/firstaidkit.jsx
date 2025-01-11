export const FirstAidKit = () => {
    return(<div className="flex flex-col gap-2">
            {['3-3-3', "Anxiety-Breathing", "Know your emotion!"].map(t => <Box title={t} />)}
    </div>)
}

const Box = ({title}) => {
    let color;
    switch(title){
        case "3-3-3":
            color = "mred";
            break;
        case 'Anxiety-Breathing':
            color = 'mblue';
            break;
        default:
            color = 'mgreen';
    }
    return (<div className={`p-8 rounded bg-${color} bg-opacity-90 text-mblack hover:bg-opacity-100 duration-70 ease-linear active:scale-90 cursor-pointer`}>
        {title}
    </div>)
}