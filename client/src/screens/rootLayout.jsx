import { ModeToggle, MoodThemeToggle } from "@/components/mode-toggle";
import { MoodThemeProvider, ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router";


export default function RootLayout() {
  return (
    <MoodThemeProvider>
      
      <ThemeProvider><div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className>
          <ModeToggle />
          <MoodThemeToggle />
        </div>
        <Outlet />
      </div></ThemeProvider>
    </MoodThemeProvider>

  );
}
