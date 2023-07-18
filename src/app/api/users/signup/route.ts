import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest){ //2 requiest
    try{
        const reqBody = await request.json() //1 requiest
        const {username,email,password} = reqBody
        //validation here if you want

        console.log(reqBody);

        // check exists or not
        const user = await User.findOne({email})  //username
        if(user) {
            return NextResponse.json({error:"User already Exists"},{status:400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        // create user
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

         //send verification email

         await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        // last just return

        return NextResponse.json({
            message : "User Created Successfull",
            success:true,
            savedUser
        })
        


        
    }catch(error:any){
        return NextResponse.json({error:error.message},
        {status:500}) // 3 )
    }
}
