import { avatarAtom, LoaderAtom, LoaderMsgAtom, ToastMsgAtom, userGrowthAtom, usernameAtom } from "@/atom/atom";
import { GradientBackground } from "@/components/Gradient";
import { QiwiLoader } from "@/components/loader";
import { NavBar } from "@/components/navbar";
import { ToastBar } from "@/components/Toast";
import { avatarArr } from "@/components/userSection";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useRecoilState,  useSetRecoilState } from "recoil";
export default function RootLayout() {
  const [loader, setLoader] = useRecoilState(LoaderAtom)
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom)
  const setLoaderMsg = useSetRecoilState(LoaderMsgAtom)
  const setUserGrowth = useSetRecoilState(userGrowthAtom);
  const setUsername = useSetRecoilState(usernameAtom)
  const setAvatar = useSetRecoilState(avatarAtom)
  const navigate = useNavigate()

  useEffect(() => {
    const email = localStorage.getItem('email')
    if(!email){
      setToastMsg("login to visit profile")
      navigate("/auth/login")
    }
  }, [])

  useEffect(() => {
    setLoader(true)
    setLoaderMsg("loading user data")
    const email = localStorage.getItem('email')
    fetch(import.meta.env.VITE_BACKEND_URL + "userDetails", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({email}),
    })
      .then(response => response.json())
      .then(data => {
      console.log(data);
      setUserGrowth({xp: data.xp, level: data.level});
      setUsername(data.username);
        console.log(data)
      setAvatar(avatarArr[data.imageUrl])
        
        setToastMsg("Successfully fetched user's data")
      })
      .catch(error => {
        console.log(error)
        setToastMsg("Error fetching user details")
      });
      setLoader(false)
      setLoaderMsg("")
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
