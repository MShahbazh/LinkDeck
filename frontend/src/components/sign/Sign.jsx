import {ArrowLeft} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Sign(){
    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("")
    const [name,setName]=useState("")
    const [username,setUsername]=useState("")
    return(
        <div className='flex items-center justify-center flex-col gap-5 px-15 pb-10'>
            <div className='w-full'>
                <Link to="/"><h1 className='w-fit py-2 px-2 cursor-pointer hover:scale-105 duration-300'><ArrowLeft/></h1></Link>
            </div>
        <div className="flex items-center justify-center gap-2  md:gap-3">
                <img src="../../public/favicon.svg" alt="" className="scale-90" />
                <h1 className="md:text-md font-ibm">LinkDeck</h1>
        </div>
        <div className='flex items-start justify-center flex-col gap-5 border-3 py-5 px-10 rounded-[10px] shadow-[7px_7px_0px_0px_var(--color-customBlue)] w-full sm:w-full md:w-[40%]'>
            <div className="w-full flex items-center justify-center flex-col  py-5">
                <h1 className="font-fraunces text-3xl font-bold p-3">Create your page</h1>
                <p className="font-ibm text-muted text-sm">Takes about a minute.</p>
            </div>
                <form onSubmit="" className="w-full flex items-center justify-center gap-8 flex-col">
                    <div className='flex items-start justify-start gap-2 flex-col w-full'>
                        <label className='font-ibm text-muted' htmlFor="">Name</label>
                        <input placeholder='John Doe' onChange={(e)=>{
                            setName(e.target.value)
                        }} value={name} type="text" className="px-2  font-ibm w-full focus-none border-2 rounded-[5px] py-2" />
                    </div>
                    <div className='flex items-start justify-start gap-2 flex-col w-full'>
                        <label className='font-ibm text-muted' htmlFor="">Username</label>
                        <input placeholder='~johnthedoe' onChange={(e)=>{
                            setUsername(e.target.value)
                        }} value={username} type="text" className="px-2  font-ibm w-full focus-none border-2 rounded-[5px] py-2" />
                    </div>
                    <div className='flex items-start justify-start gap-2 flex-col w-full'>
                        <label className='font-ibm text-muted' htmlFor="">Email</label>
                        <input placeholder='john@example.com' onChange={(e)=>{
                            setEmail(e.target.value)
                        }} value={email} type="email" className="px-2  font-ibm w-full focus-none border-2 rounded-[5px] py-2" />
                    </div>
                    <div className='flex items-start justify-start gap-2 flex-col w-full'>
                        <label className='font-ibm text-muted' htmlFor="">Password</label>
                        <div className='w-full flex items-center justify-center gap-1'>
                            <input onChange={(e)=>{setPass(e.target.value)}} value={pass} type="text" className="px-2  font-ibm w-full focus-none border-2 rounded-[5px] py-2" />
                           
                        </div>
                    </div>
                    <h1 onClick={()=>console.log(email,pass)}  to="/login" className="shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] cursor-pointer  hover:-translate-x-1 hover:-translate-y-0.5 duration-500 border-2 border-black py-2 px-5 text-center font-ibm rounded-[3px] bg-customRed text-white w-[60%]">Create account</h1>
                </form>
            <div className="w-full flex items-center justify-center gap-3 flex-col py-8">
                <Link to="/login" className='font-ibm text-muted'>Already have an account? <span className="cursor-pointer text-black  hover:underline">Log in</span></Link>
           
            </div>
        </div>
        
        
        </div>
    )
}