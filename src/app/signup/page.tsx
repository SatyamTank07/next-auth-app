"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";

export default function Signup(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })

    const [buttonDisabled,setButtonDisabled] = useState(false);
    const [loding,setLoding] = useState(false);

    const onSignup = async() =>{
        try{
            setLoding(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("signup success...",response.data);
            router.push("/login");
        }catch(error:any){
            console.log("Signup failed", error.message);
            //assinment here react hot tost
        }finally{
            setLoding(false);
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loding ?"Processing...":"Signup"}</h1>
            <br/>
            <label htmlFor="usernae">username</label>
            <input 
                id="username" 
                type="text"     
                value={user.username} onChange={(e) =>{
                    setUser({...user , username:e.target.value})
                }}
                placeholder="username"
                className="p-2 rounded-lg"
            />
            <br/>
            <label htmlFor="email">email</label>
            <input 
                id="email" 
                type="text"     
                value={user.email} onChange={(e) =>{
                    setUser({...user , email:e.target.value})
                }}
                placeholder="email"
                className="p-2 rounded-lg"
            />
            <br/>
            <label htmlFor="password">password</label>
            <input 
                id="password" 
                type="password"     
                value={user.password} onChange={(e) =>{
                    setUser({...user , password:e.target.value})
                }}
                placeholder="password"
                className="p-2 rounded-lg"
            />
            <br/>
            <button
                className="border-2 p-2 rounded-lg border-indigo-500"
                onClick={onSignup}
            >{buttonDisabled ? "No Signup" : "Signup"}</button>
            <br/>
            <Link href="/login">Visit Login</Link>

        </div>
    )
}