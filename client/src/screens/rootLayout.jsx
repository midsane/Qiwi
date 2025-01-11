import { NavBar } from "@/components/navbar";
import { Outlet } from "react-router";
export default function RootLayout() {
  return (
    <div className="w-screen flex flex-col gap-2">
      <NavBar />
      <div className="w-full flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
