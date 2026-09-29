import {Eye,EyeOff,ArrowLeft} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(){
    const [seePass,setseePass]=useState(false)
    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {login,user}=useSelector(state=>state.loginSlice)

    // useEffect(()=>{
    //     if(login&&user){  
    //         navigate('/',{replace:true})
    //     }
    // },[login,navigate,user])
    

    function submitIt(e){
        e.preventDefault()
        // dispatch(setLogin({name:"Jack",username:"jackTrade",
        // links:[
        //     {
        //     id:0,
        //     index:0,
        //     link:"https://github.com/",
        //     subtext:"My Placeholder",
        //     },
        //     {
        //     id:1,
        //     index:0,
        //     link:"https://github.com/",
        //     subtext:"",
        //     },
        // ]}))
        navigate('/')
    }

    

    return(
        <div className='flex items-center justify-center flex-col gap-5 px-15 pb-10'>
            <div className='w-full'>
                <Link to="/"><h1 className='w-fit py-2 px-2 cursor-pointer hover:scale-105 duration-300'><ArrowLeft/></h1></Link>
            </div>
     
        <div className='flex items-start justify-center flex-col gap-5 border-3  px-10 rounded-[10px] shadow-[7px_7px_0px_0px_var(--color-customBlue)] w-full sm:w-full md:w-[40%]'>
            <div className="w-full flex items-center justify-center flex-col  py-5">
                <h1 className="font-fraunces text-3xl font-bold">Welcome Back!</h1>
                <p className="font-ibm text-muted text-sm">Log in to manage your links</p>
            </div>
                <form onSubmit={submitIt}  className="w-full flex items-center justify-center gap-8 flex-col">
                    <div className='flex items-start justify-start gap-2 flex-col w-full'>
                        <label className='font-ibm text-muted' htmlFor="">Email</label>
                        <input onChange={(e)=>{
                            setEmail(e.target.value)
                        }} value={email} type="email" className="px-2  font-ibm w-full focus-none border-2 rounded-[5px] py-2" />
                    </div>
                    <div className='flex items-start justify-start gap-2 flex-col w-full'>
                        <label className='font-ibm text-muted' htmlFor="">Password</label>
                        <div className='w-full flex items-center justify-center gap-1'>
                            <input onChange={(e)=>{setPass(e.target.value)}} value={pass} type={seePass? "text":"password"} className="px-2  font-ibm w-full focus-none border-2 rounded-[5px] py-2" />
                            <h1 className='bg-customRed text-white border-2 border-black rounded-[5px] py-2 px-2 cursor-pointer' onClick={()=>{
                                setseePass(!seePass)
                            }}>
                                {
                                    seePass?
                                    <EyeOff/>:<Eye/>
                                }
                            </h1>
                        </div>
                    </div>
                    <button type='submit' className="shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] cursor-pointer  hover:-translate-x-1 hover:-translate-y-0.5 duration-500 border-2 border-black py-2 px-5 text-center font-ibm rounded-[3px] bg-customRed text-white w-[60%]">Log In</button>
                </form>
            <div className="w-full flex items-center justify-center gap-3 flex-col py-3">
                <Link to="/sign" className='font-ibm text-muted'>Don't have an account? <span className="cursor-pointer text-black  hover:underline">Create one</span></Link>
            </div>
        </div>
        
        
        </div>
    )
}