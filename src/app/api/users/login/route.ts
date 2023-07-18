import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){

    try{

        const reqBody = await request.json() 
        const {email,password} = reqBody; //1 semicolon...

        console.log(reqBody);

        //check user exists or not
        const user = await User.findOne({email})  
        if(!user) {
            return NextResponse.json({error:"User already Exists"},{status:400})
        } // ! baki ray gyu...

        //check if password is correct
        const validpassword = await bcryptjs.compare(password,user.password)
        if(!validpassword){
            return NextResponse.json({error:"Password is invalid"},{status:400})
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email:user.email
        }

        //ctreate token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn : "1d"})

        const response = NextResponse.json({
            message:"Login Success !",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true,
        })

        return response;

    }catch(error:any){
        return NextResponse.json({error:error.message},
        {status:500}) 
    }

}
