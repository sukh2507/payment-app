import { useState , useEffect } from "react"
import { Oneuser } from "./Oneuser"
import { response } from "express";
export default async function Users(){
    const [userlist,setuserlist]=useState([]);
    useEffect(()=>{
     axios.get("http://localhost:3000/api/v1/user/bulk")
     .then(response=>{
        setuserlist(response.data.user)
     })

    },[])
    return (
        <div className="ml-5 mr-5">
            <div className="text-xl font-bold mt-5">Users</div>
            <div><input type="text" placeholder="Search users ...." className="border-2 w-full mt-2 rounded-lg" /></div>
            <div className="pl-4 pr-4 mt-7">
                {userlist.map(user=><Oneuser name={user.name}/> )}
            </div>
        </div>
    )}