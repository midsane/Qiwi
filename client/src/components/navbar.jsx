import { Link } from "react-router-dom"
import {LogOut, Bird} from "lucide-react"
export const NavBar = () => {
    return (<div className="flex w-screen h-[7vh] bg-myellow">
        <ul className="w-full flex justify-between px-10" >
            <Link to={"/profile"} >
            <div className="flex gap-2 h-full justify-center items-center">
                    <Bird />
                    Qiwi
            </div>
            </Link>
            <Link to={"/Logout"}>
                <div className="flex h-full justify-center items-center">
                    <LogOut />
                </div>
            </Link>
        </ul>
    </div>)
}