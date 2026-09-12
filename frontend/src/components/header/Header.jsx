import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header(){
    const {user,login}=useSelector(state=>state.loginSlice)
    return(
        <div className="border-b-2 font-ibm  flex sm:flex-row flex-col sm:gap-0 gap-5 items-center justify-between w-full  py-5 sm:py-3 px-1 md:px-5">   
            <div className="flex items-center justify-center gap-2  md:gap-5">
                <img src="../../public/favicon.svg" alt="" className="md:scale-120" />
                <h1 className="md:text-xl">LinkDeck</h1>
            </div>
            <div className="flex items-center justify-center gap-5">
                {
                    login&&user?
                    <>
                    <Link to='/dashboard' className="shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:-translate-x-1 hover:-translate-y-0.5 duration-500 border md:border-2 border-black text-white bg-customRed py-1 px-1 md:py-2 md:px-5  rounded-[3px]">Dashboard</Link>
                    </>
                    :
                    <>
                    <Link to="/login" className="shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] cursor-pointer  hover:-translate-x-1 hover:-translate-y-0.5 duration-500 border md:border-2 py-1 px-1 md:py-2 md:px-5 rounded-[3px]">Log In</Link>
                    <Link to='/sign' className="shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:-translate-x-1 hover:-translate-y-0.5 duration-500 border md:border-2 border-black text-white bg-customRed py-1 px-1 md:py-2 md:px-5  rounded-[3px]">Get Started</Link>
                    </>
                }
                
            </div>            
        </div>
    )
}

