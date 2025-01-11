import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./screens/rootLayout"
import { RecoilRoot } from "recoil"
import LoginScreen from "./LoginScreen"
import SignupScreen from "./signupscreen"
import { ProfileScreen } from "./screens/profileScreen"
import JournalPage from "./screens/journalScreen"
import { FirstAidKit } from "./screens/firstaidkit"
import { Dashboard } from "./screens/Dashboard"



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
      { path: "firstAidKit", element: <FirstAidKit /> }
    ]
  },
])


export default function App() {
  return (<RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>)
}