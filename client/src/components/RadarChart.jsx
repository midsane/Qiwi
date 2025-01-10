import { TrendingUp } from 'lucide-react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "Extrovert", desktop: 186 },
    { month: "Curious", desktop: 305 },
    { month: "Introvert", desktop: 237 },
    { month: "Indifferent", desktop: 273 },
    { month: "Ambitious", desktop: 209 },
    { month: "Lazy", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
}

export function PersonalityChart() {
    return (
        <Card>
            <CardHeader className="items-center pb-4">
                <CardTitle>Personality Card</CardTitle>
                <CardDescription>
                    Showing predicted Personality 
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px] "
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarGrid radialLines={false} polarRadius={[90]} strokeWidth={1} />
                        <PolarAngleAxis dataKey="month" />
                        <Radar
                            dataKey="desktop"
                            fill="var(--color-desktop)"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    You are very Curious...<TrendingUp className="h-4 w-4" />
                </div>
                
            </CardFooter>
        </Card>
    )
}

