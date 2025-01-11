import { useNavigate } from "react-router-dom"

export const Box = ({title, logo}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        switch(title){
            case "Journal":
                navigate('/journal');
                break;
            case "Dashboard":
                navigate("/dashboard");
                break;
            case "First Aid Kit":
                navigate("/firstAidKit")
                
        }
    }

    return(<div onClick={handleClick} className="bg-mblue min-w-32 flex justify-center items-center flex-col active:scale-90 ease-linear duration-100 hover:bg-mgreen rounded p-4 text-slate-100 font-thin cursor-pointer" >
        <div>{logo}</div>
       <p>{title}</p>

    </div>)
}