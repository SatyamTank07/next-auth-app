export default function UserProfile({params}:any){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>Proile</h1>
            <p className="text-4xl">Profile Page : {params.id}</p>
        </div>
    )
}