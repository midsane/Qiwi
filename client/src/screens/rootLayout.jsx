import { LoaderAtom, ToastMsgAtom } from "@/atom/atom";
import { QiwiLoader } from "@/components/loader";
import { NavBar } from "@/components/navbar";
import { ToastBar } from "@/components/Toast";
import { Outlet } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
export default function RootLayout() {
  const loader = useRecoilValue(LoaderAtom)
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom)
  return (
    <div className="w-screen flex flex-col gap-2">
      {loader && <QiwiLoader />}
      {toastMsg !== "" && <ToastBar message={toastMsg} onClose={() => setToastMsg("")} /> }
      <NavBar />
      <div className="w-full flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
