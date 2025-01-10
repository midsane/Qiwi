import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Generate sample data for the heatmap
const generateData = () => {
    const data = {}
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']

    months.forEach(month => {
        data[month] = Array.from({ length: 8 }, () =>
            Math.random() > 0.6 ? Math.floor(Math.random() * 4) : 0
        )
    })
    return data
}

const getColor = (value) => {
    const colors = [
        'bg-white border border-gray-200',
        'bg-blue-200',
        'bg-blue-400',
        'bg-blue-600'
    ]
    return colors[value] || colors[0]
}

export function PurpleDistributionHeatmap() {
    const data = generateData()
    const months = Object.keys(data)

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle className="text-lg font-medium">Distribution Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Month labels */}
                    <div className="flex">
                        <div className="w-12" /> {/* Spacing for alignment */}
                        {months.map(month => (
                            <div key={month} className="flex-1 text-center text-sm text-gray-600">
                                {month}
                            </div>
                        ))}
                    </div>

                    {/* Heatmap grid */}
                    <div className="grid grid-cols-1 gap-1">
                        {Array.from({ length: 3 }).map((_, rowIndex) => (
                            <div key={rowIndex} className="flex gap-1">
                                {months.map(month => (
                                    <TooltipProvider key={`${month}-${rowIndex}`}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div
                                                    className={`
                            w-4 aspect-square rounded-sm
                            ${getColor(data[month][rowIndex])}
                          `}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="text-sm">
                                                    {month} - Row {rowIndex + 1}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

