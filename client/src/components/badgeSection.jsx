import GameBadge from "./badge";
import { Award } from "lucide-react";
const badge = [, ['bronze', 0],
['silver', 0], ['orange', 0], ['silver-wings', 0], ['gold', 0], ['purple', 0], ['magenta', 0],];


export const BadgeSection = () => {
    console.log(badge)
    return (
        <div className="flex flex-col gap-5 bg-slate-100 w-full justify-between rounded p-1">
            <div className="flex gap-3">
                <p>Badges: </p>
                <Award color="red" />
            </div>
            <div className="flex justify-start w-full items-center overflow-x-auto">
                {badge.map((b, i) => (
                    <div key={i} className="mr-3">
                        <GameBadge variant={b[0]} hasWings={b[1] ? true : false} />
                    </div>
                ))}
            </div>
        </div>
    );
};
