import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

// Oneuser Component
function Oneuser({ user,name }) {
  
  const navigate=useNavigate()
  return (
    <div className="flex justify-between mt-3">
      <div className="flex items-center">
        <button className="size-7 rounded-full bg-gray-200 text-center">
          {name ? name[0].toUpperCase() : "U"} {/* Display first letter */}
        </button>
        <div className="text-lg ml-3">{name}</div>
      </div>
      <button onClick={()=>{navigate(`/send?id=${user._id}&name=${name}`)}} className="bg-black text-white font-semibold px-3 py-1 rounded-md">
        Send Money
      </button>
    </div>
  );
}

// Users Component
function Users() {
  const [userlist, setUserList] = useState([]); // State for user list
  const [userComponents, setUserComponents] = useState([]); // State for mapped components
  const [filter,setfilter]=useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{
          headers: {
            authorization:`Bearer ${localStorage.getItem('token')}`
          }
        });
        const users = response.data.users || []; // Ensure `users` is an array
        setUserList(users);
        console.log(response.data.user)

        // Map data to user components immediately after fetching
        const components = users.map((user) => (
          <Oneuser  key={user._id} user={user} name={user.name} />
        ));
        setUserComponents(components);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); 
  }, [filter]);

  return (
    <div className="ml-5 mr-5">
      <div className="text-xl font-bold mt-5">Users</div>
      <input
        type="text"
        placeholder="Search users..."
        className="border-2 w-full mt-2 rounded-lg px-2 py-1"
        onChange={(e)=>[
          setfilter(e.target.value)
        ]}
      />
      <div className="pl-4 pr-4 mt-7">
        {userComponents.length > 0 ? (
          userComponents // Render pre-mapped user components
        ) : (
          <p className="text-gray-500 text-center mt-3">No users found</p>
        )}
      </div>
    </div>
  );
}

function Balance(){
  const [balance,setbalance]=useState(0)
  
  useEffect( ()=>{
    const fetchbalance =async ()=>{
      try{
    const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
      headers: {
        authorization:`Bearer ${localStorage.getItem('token')}`
      }
    });
    setbalance(response.data)
  }catch(e){
    console.log(e)
  }
  } // fetch ends here
  fetchbalance()
  },[])

return(
  <>
        <div className="text-black text-lg pl-5 font-bold mt-12">
        Your Balance: <span className="text-green-600">$ {balance}</span>
      </div>
      </>
)
}

// Dashboard Component
export default function Dashboard() {
  return (
    <div>
      {/* Navbar Section */}
      <div className="flex justify-between items-center pl-5 pr-5 mb-3 p-3 h-12">
        <div className="font-bold text-xl">Payments App</div>
        <div className="text-lg flex items-center">
          Hello User{" "}
          <button className="rounded-full bg-gray-200 size-6 text-gray-400 ml-2">
            U
          </button>
        </div>
      </div>



      {/* Balance Section */}
      <Balance/>
      {/* Users List */}
      <Users />
    </div>
  );
}
