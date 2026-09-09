export default function Header(){
    return(
        <div className="border-b-2 font-ibm  flex items-center justify-between w-full py-3 px-1 md:px-5">   
            <div className="flex items-center justify-center gap-2  md:gap-5">
                <img src="../../public/favicon.svg" alt="" srcset="" className="md:scale-120" />
                <h1 className="md:text-xl">DevCard</h1>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-5">
                <h1 className="cursor-pointer  hover:-translate-x-1 hover:-translate-y-0.5 duration-500 border md:border-2 py-1 px-1 md:py-2 md:px-5 rounded-[3px]">Log In</h1>
                <h1 className="cursor-pointer hover:-translate-x-1 hover:-translate-y-0.5 duration-500 border md:border-2 border-black text-white bg-customRed py-1 px-1 md:py-2 md:px-5  rounded-[3px]">Get Started</h1>
            </div>            
        </div>
    )
}

