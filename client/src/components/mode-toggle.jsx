import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMoodTheme, useTheme } from "@/components/theme-provider"
import { createPortal } from "react-dom"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export const MoodThemeToggle = () => {
    const { theme, setTheme } = useMoodTheme()
    const toggleTheme = () => {
        setTheme((prevTheme) => {
            let newTheme;
            switch(prevTheme){
                case "themeRed": 
                    newTheme = "themeBlue";
                    break;
                case "themeBlue": 
                    newTheme = "themeGreen";
                    break;
                case "themeGreen": 
                    newTheme = "themeViolet";
                    break;
                case "themeViolet": 
                    newTheme = "themeYellow";
                    break;
                default:
                    newTheme = "themeRed";
                    
            }
            return newTheme
        }
         
        );
    };

    return (
        createPortal(<div className="fixed z-10 top-0 right-0" ><button
            onClick={toggleTheme}
            className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
        >
            Switch to next theme
        </button></div>, document.getElementById('root'))
    );
}