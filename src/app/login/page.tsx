"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login(){
    const router = useRouter();

    const [user,setUser] = React.useState({
        email:"",
        password:""
    })

    const [buttonDisabled,setButtonDisabled] = useState(false);
    const [loding,setLoding] = useState(false);


    const onLogin = async() =>{
        try{
            setLoding(true);
            const response = await axios.post("/api/users/login", user);
            console.log("login success...",response.data);
            toast.success("login Success")
            router.push("/profile");
        }catch(error:any){
            console.log("Login failed", error.message);
            toast.error(error.message);
            //assinment here react hot tost
        }finally{
            setLoding(false);
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);



    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loding ?"Processing...":"Login"}</h1>
            <br/>
            <label htmlFor="email">email</label>
            <input 
                id="email" 
                type="email"     
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
                onClick={onLogin}
            >{buttonDisabled ? "No Login" : "Login"}</button>
            <br/>
            <Link href="/signup">Visit Signup</Link>

        </div>
    )
}


