import { LoaderAtom, ToastMsgAtom } from "@/atom/atom";
import { GradientBackground } from "@/components/Gradient";
import { QiwiLoader } from "@/components/loader";
import { NavBar } from "@/components/navbar";
import { ToastBar } from "@/components/Toast";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useRecoilState,  useRecoilValue } from "recoil";
export default function RootLayout() {
  const loader = useRecoilValue(LoaderAtom)
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom)
  const navigate = useNavigate()

  useEffect(() => {
    const email = localStorage.getItem('email')
    if(!email){
      setToastMsg("login to visit profile")
      navigate("/auth/login")
    }
  }, [])


  return (
    <div className="w-screen flex flex-col gap-2">
      {loader && <QiwiLoader />}
      <GradientBackground/>
      {toastMsg !== "" && <ToastBar message={toastMsg} onClose={() => setToastMsg("")} /> }
      <NavBar />
      <div className="w-full relative flex flex-col justify-center items-center">
        <Outlet />
      
      </div>
    </div>
  );
}
