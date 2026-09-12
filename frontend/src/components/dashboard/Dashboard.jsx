import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../../store/slice"
import {Plus,Pencil,X} from 'lucide-react'
import { apps } from "../../assets/logo"

export default function Dashboard(){
    const {login,user}=useSelector(state=>state.loginSlice)
    const navigate=useNavigate()
    const dispatch=useDispatch()    


    useEffect(()=>{
        if(!login||!user){
        navigate('/',{replace:true})
    }
    },[login,user,navigate])

    

    function loggingOut(){
        dispatch(logout())
    }   
    
    
  
    

    if(!user||!login) return null
    return(
        <>
        
            <div className="border-b-2 font-ibm  flex sm:flex-row flex-col sm:gap-0 gap-5 items-center justify-between w-full  py-5 sm:py-3 px-1 md:px-5">   
            <div className="flex items-center justify-center gap-2  md:gap-5">
                <img src="../../public/favicon.svg" alt="" className="md:scale-120" />
                <h1 className="md:text-xl">LinkDeck</h1>
            </div>
            <div className="flex items-center justify-center gap-5">
                    <Link to="/" className="shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] cursor-pointer  hover:-translate-x-1 hover:-translate-y-0.5 duration-500 border md:border-2 py-1 px-1 md:py-2 md:px-5 rounded-[3px]">Home</Link>
                    <Link onClick={loggingOut} to='/' className="shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:-translate-x-1 hover:-translate-y-0.5 duration-500 border md:border-2 border-black text-white bg-customRed py-1 px-1 md:py-2 md:px-5  rounded-[3px]">Log Out</Link>
            </div>            
            </div>
            <div className="px-15 py-10 w-full">
                <div className="flex items-center justify-center flex-col gap-2">
                    <h1 className="font-semibold font-fraunces text-5xl">{user.name}</h1>
                    <h1 className="font-ibm text-md text-muted">@{user.username}</h1>
                
                </div>
                <div className="grid md:grid-cols-[1fr_2fr] w-full py-10">
                   <div className="border-2 py-5 px-5 rounded-[5px]">
                     <div className="grid grid-cols-[3fr_1fr] gap-x-10 ">
                        <div className="flex items-start justify-center flex-col w-full gap-2">
                            <h1  className="font-semibold text-2xl font-fraunces ">My Links</h1> 
                            <p className="font-ibm text-muted text-sm">These show on your public page in this order.</p>
                        </div>
                        <div>
                            <h1 className='hover:scale-105 duration-150 w-full flex items-center justify-center gap-2 font-ibm text-sm bg-customRed text-white border-2 border-black rounded-[5px] py-2 px-2 cursor-pointer' >
                                <Plus size={15}/>
                                Add Link
                            </h1>
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-center'>
                        <hr className="h-0.5 bg-black border-none my-10  w-[50%]"/>
                    </div>

                    {
                        user.links.length==0?
                        <div className="flex items-center justify-center font-ibm">
                            <h1>No Links Added Yet!</h1>
                        </div>
                        :
                        
                        
                            
                                <div className="grid grid-cols-1 gap-y-5">
                                    {
                                //         user.links.map((element)=>{
                                //             return(

                                //                 <div key={element.id} className='border-2 rounded-[5px] grid grid-cols-[1fr_5fr_0.75fr]'>
                                //         <div className="border-e-2 px-2 py-2 flex items-center justify-center">
                                //             <img src={`../../src/assets/logos/${apps[element.index].img}`} alt="" />
                                //         </div>
                                //         <div className="px-5 py-2 flex items-center justify-between">
                                //             <div className="flex items-start justify-center flex-col gap-1">
                                //                 <h1 className="font-fraunces text-2xl font-semibold">{apps[element.index].name}</h1>
                                //                 <h1 className="font-ibm text-sm">{element.subtext}</h1>
                                //             </div>
                                //         </div>
                                //         <div className=" flex items-center justify-center  text-customRed duration-200 cursor-pointer">
                                //             <ArrowRight onClick={()=>{
                                //                 window.open(`${element.link}`, '_blank', 'noopener,noreferrer')}}
                                //             className="hover:scale-105 duration-150" size={30}/>
                                //         </div>
                                // </div>
                                //             )
                                //         })

                        
                                        user.links.map((element)=>{
                                            return(

                                        <div key={element.id} className='px-2 py-2 border rounded-[5px] grid grid-cols-1 gap-y-5'>
                                            <div className="grid grid-cols-[5fr_1fr] ">
                                                <div className="flex items-start justify-center flex-col gap-1">
                                                    <h1 className="font-ibm text-sm"><span className="font-semibold">Name: </span>{apps[element.index].name}</h1>
                                                    <h1 className="font-ibm text-sm"><span className="font-semibold">Text: </span> {element.subtext==""? <span className="text-red-500">Null</span>:element.subtext}</h1>
                                                    <h1 className="font-ibm text-sm"><span className="font-semibold">Link: </span> {element.link}</h1>
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <img src={`../../src/assets/logos/${apps[element.index].img}`} alt="" />
                                                </div> 
                                            </div>
                                            <div className="flex items-center justify-start gap-5 ">
                                                <div className="py-2 px-2 rounded-[5px] border border-black hover:scale-105 duration-150 cursor-pointer">
                                                    <Pencil size={20}/>
                                                </div>
                                                <div className="py-2 px-2 rounded-[5px] border border-black hover:scale-105 duration-150 cursor-pointer">
                                                    <X size={20}/>
                                                </div>
                                            </div>
                                        </div>
                                            )
                                        })
                                

                                    }
                                </div>
                            
                        
                        
                    }
                   </div>
                   <div></div>
                </div>
                
            </div>
        </>           
    )
}