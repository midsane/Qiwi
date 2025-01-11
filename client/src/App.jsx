import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./screens/rootLayout"
import { RecoilRoot } from "recoil"
import LoginScreen from "./LoginScreen"
import SignupScreen from "./signupscreen"
import { ProfileScreen } from "./screens/profileScreen"
import JournalPage from "./screens/journalScreen"
import { FirstAidKit } from "./screens/firstaidkit"
import { Dashboard } from "./screens/Dashboard"
import GameOne from "./gameOne"
import GameTwo from "./gameTwo"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {path: "auth/login", element: <div><LoginScreen /></div>},
      {path: "auth/signup", element: <div><SignupScreen /></div> },
      {path: "profile", element: <ProfileScreen />},
      {path: "journal", element: <><JournalPage /></>},
      {path: "dashboard", element: <Dashboard />},
      { path: "firstAidKit", element: <FirstAidKit /> },
      {path:"game1",element:<GameOne />},
      {path:"game2",element:<GameTwo />}
    ]
  },
])


export default function App() {
  return (<RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>)
}