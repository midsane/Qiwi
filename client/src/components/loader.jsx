import { useRecoilValue } from "recoil"

import {  LoaderMsgAtom } from "@/atom/atom";
import { createPortal } from "react-dom";


export const QiwiLoader = () => {
    const loaderMsg = useRecoilValue(LoaderMsgAtom);
    

    return (createPortal(
        <div className="w-screen bg-slate-300 z-10 bg-opacity-70 h-screen top-0 left-0 justify-center items-center flex fixed">
            <div>
              
            </div>
            <p>
                {loaderMsg}
            </p>
        </div>,
        document.getElementById('root')))
}