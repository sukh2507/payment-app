import { useState } from "react"
import { BottomWarning } from "./components/BottomWarning"
import { Button } from "./components/Button"
import { Heading } from "./components/Heading"
import { InputBox } from "./components/InputBox"
import { SubHeading } from "./components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [age, setage] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setname(e.target.value);
        }} placeholder="John" label={"Name"} />
        <InputBox onChange={(e) => {
          setemail(e.target.value);
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={e => {
          setpassword(e.target.value);
        }} placeholder="harkirat@gmail.com" label={"Password"} />
        <InputBox onChange={(e) => {
          setage(e.target.value)
        }} placeholder="age" label={"age"} />
        <div className="pt-4">
          <Button onClick={async (req,res)=>{
            try{
            const response=await axios.post('http://localhost:3000/api/v1/user/signup',{
              name:name,email:email,password:password,age:parseInt(age)
            });
            if(response.data.token){
              localStorage.setItem('token',response.data.token);
              <div className="bg-red-300 text-white">
                account created successfully
                {console.log("account created successfully")}
              </div>
              navigate('/signin')
            }
            else{
              console.log('No token recieved')
            }
          }catch(err){
            console.log(err)
          }
        }}
          label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}