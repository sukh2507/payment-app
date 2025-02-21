export default function Navbar(){
    return(
        <div className="flex justify-between pl-5 pr-5 mb-3 p-3 h-12 ">
            <div className="font-bold text-xl">Payments App</div>
            <div className="text-lg">Hello User <button className="rounded-full bg-gray-200 size-6 text-gray-400 ">U</button></div>
        </div>
    )
}