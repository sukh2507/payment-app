export function Oneuser({name}){
    return(
        <div className="flex justify-between mt-3">
            <div className="flex justify-start">
                <div><button className="size-7 rounded-full bg-gray-200 ">U{`${num}`}</button></div>
                <div className="text-lg ml-3">{`${name}`}</div>
            </div>
            <div><button className="bg-black text-white font-semibold pl-2 pr-2 p-1 rounded-md">Send money</button></div>
        </div>
    )
}