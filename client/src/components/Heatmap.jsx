const arr1 = [1,2,3];
export const HeatMap = () => {
    return(<div className="flex text-orange-900 flex-col">
        <p>Heatmap:</p>
        <div className="flex flex-col gap-2 " >
            {arr1.map(r => <Row i={r} key={r} />)}
        </div>
    </div>)
}

const arr = [1,2,3,4,5,6,7,8,9,10]

const Row = ({i}) => {
    return(<div className="flex gap-2 justify-between" >
        {arr.map(a => <Box key={[i,a]} />)}
    </div>)
}

const Box = ({}) => {
    return(<div className="sm:w-10 w-8 border border-orange-400 cursor-pointer rounded aspect-square bg-myellow opacity-60"></div>)
}