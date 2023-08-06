// eslint-disable-next-line react/prop-types
const StatsCard = ({stateName, stateValue, color}) => {
  return (
    <div style={{ background: color }} className={`w-[200px] h-auto px-[1rem] py-[2rem] rounded-2xl flex flex-col items-center justify-center gap-[1rem]`}>
      <h1 className="text-blue-950 text-xl font-bold">{stateValue}</h1>
      <h3 className="text-blue-950 text-lg font-semibold">{stateName}</h3>
    </div>
  )
}

export default StatsCard