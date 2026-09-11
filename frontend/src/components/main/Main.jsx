import { Link } from 'react-router-dom'
import {Header, Footer} from '../index'

export default function Main(){
    const dataSec=[
        {id:"01",heading:"Add your Links",paragraph:"Drop in your GitHub, portfolio, socials, and anything else worth sharing."},

        {id:"02",heading:"Sort them by category",paragraph:"Development, projects, writing, and more — each gets its own color."},

        {id:"03",heading:"Share one page",paragraph:"One clean link that goes everywhere your résumé and bio can't."},
    ]
    return(
        <>
        <Header/>
        <div className='border-b-2  py-10 flex items-start px-10'>
            <div className="flex items-start justify-center flex-col md:w-[30%] gap-10">
                <h1 className="font-bold font-fraunces text-5xl">
                    Your Work, <span className="italic text-customRed">one</span> Link 
                </h1>
                <p className="text-md font-ibm text-muted">
                    A profile for the things you've built — one page for your repos, your writing, and everywhere else people can find you.
                </p>
                <Link to='/sign' className="shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] font-ibm cursor-pointer   hover:-translate-x-1 hover:-translate-y-0.5 duration-500 border md:border-2 border-black  text-white bg-customRed py-2 px-5  rounded-[3px]">Claim Your Page</Link>
            </div>
        </div>
        <div className="py-10 px-10 flex justify-center flex-col gap-14">
            <h1 className="flex items-center justify-center font-fraunces flex-col gap-3 text-4xl font-bold">How It Works 
                <hr  className="w-[10%] border-2 border-customRed rounded-[10px]"/>
            </h1>
            
            <div className="grid md:grid-row-1 md:grid-cols-3 grid-cols-1 gap-x-5 gap-y-10 ">
                {
                    dataSec.map((element)=>{
                        return(
                            <div className="shadow-[7px_7px_0px_0px_var(--color-customOrange)] border-3  p-5 rounded-[10px] flex  justify-center flex-col gap-3" key={element.id}>
                               
                                 <h1 className="text-white border-black border-2 flex items-center justify-center rounded-full w-12 h-12 bg-customRed font-bold text-xl font-fraunces">{element.id}</h1>
                               
                                <p className=" font-fraunces text-2xl">{element.heading}</p>
                                <p className="font-ibm text-sm">{element.paragraph}</p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
        <Footer/>
        </>
    )
}