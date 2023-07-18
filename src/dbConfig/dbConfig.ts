import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected',() => {
            console.log('mongoDB Connected...');
            
        })

        connection.on('err',(err) => {
            console.log('connection Error ' + err);
            process.exit();  
        })
    }catch(err){
        console.log("Something gose Wrong !");
        console.log(err);
        
    }
}