import Card from "../card/Card"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function Preview(){
    
    return(
        <>
            <div className="flex items-center justify-between px-5  border-b-2 border-black  font-ibm py-5">
                <Link to="/dashboard" className="flex items-center justify-center flex-row gap-3 border-2 rounded-[5px] py-2 px-3 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 duration-300">
                    
                    <ArrowLeft size={15}/>
                    <h1 className="text-xs">Back to Dashboard</h1>

                </Link>
                <div className="border-2 border-customOrange py-2 px-3 text-xs rounded-[5px] bg-slightRed">
                    <h1>Preview only — visitors won't see this bar</h1>
                </div>
            </div>
            <Card/>
        </>
    )
}