import { createPortal } from "react-dom"
import { X } from "lucide-react"

export const Modal = ({ children, handleClose }) => {
    return (createPortal(<div className="flex rounded bg-myellow p-4 w-fit h-fit flex-col fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] gap-4 justify-center items-center" >
        <div onClick={handleClose} className="h-4 w-full cursor-pointer duration-75 ease-linear" >
            <X />
        </div>
        {children}
    </div>, document.getElementById('root')))
}