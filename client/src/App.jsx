import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./screens/rootLayout"
import { RecoilRoot } from "recoil"

import { ProfileScreen } from "./screens/profileScreen"
import JournalPage from "./screens/journalScreen"
import { Dashboard } from "./screens/Dashboard"
import { GameOne } from "./components/gameOne"
import { BreathingExercise } from "./components/gameTwo"


import SoundPlayer from "./components/SoundPlayer"
import Login from "./components/login"
import Signup from "./components/signup"
import { KnowYourEmotion } from "./components/knowYourEmotion"
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "auth/login", element: <div><Login /></div> },
      { path: "auth/signup", element: <div><Signup /></div> },
      { path: "profile", element: <ProfileScreen /> },
      { path: "journal", element: <><JournalPage /></> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "3-3-3", element: <GameOne /> },
      { path: "Anxiety-Breathing", element: <BreathingExercise /> },
      { path: "Know your emotion!", element: <KnowYourEmotion /> }
    ]
  },
])


export default function App() {
  return (<RecoilRoot>
    <SoundPlayer />
    <RouterProvider router={router} />
  </RecoilRoot>)
}
