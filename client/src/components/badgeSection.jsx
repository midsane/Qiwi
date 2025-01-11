import GameBadge from "./badge";

const badge = [ ['bronze', 0], ['silver', 0], ['orange', 0], ['silver-wings', 0], ['gold', 0], ['purple', 0], ['magenta', 0],];
export const BadgeSection = () => {
   console.log(badge)
   return(<div className="flex">
       {badge.map((b, i) => <GameBadge variant={b[0]} hasWings={b[1] ? true : false} />)}
   </div>)
}