import { User, ArrowRight } from "lucide-react";

export default function Card({ user }) {
  if (!user) return null;
  return (
    <>
      <div className="flex items-center justify-center bg-slightRed border-b-2 border-b-black flex-col gap-10 py-10 px-5">
        <div className="">
          <h1 className="rounded-full p-5 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] bg-customRed text-white w-full  flex items-center justify-center border-2 border-black">
            <User size={45} />
          </h1>
        </div>
        <div className="flex items-center justify-center flex-col gap-5">
          <h1 className="font-fraunces font-bold text-5xl">{user.name}</h1>
          <h1 className="font-ibm border-2 bg-white rounded-[5px] py-1 px-3">
            ~{user.username}
          </h1>
        </div>
        <div>
          <p className="font-fraunces italic text-base whitespace-pre-wrap wrap-break-words leading-relaxed w-full ">
            {user.subline}
          </p>
        </div>
      </div>
      <div className="px-2  w-full flex items-center justify-center py-10">
        {user.links.length == 0 ? (
          <div className="py-10">
            <h1 className="font-ibm text-md text-black/50">
              No Links Added Yet
            </h1>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col gap-5 md:w-[40%]">
            {user.links.map((element) => {
              return (
                <a
                  href={element.link}
                  key={element._id}
                  className="hover:-translate-y-1  duration-300 shadow-[3px_3px_0px_0px]  shadow-customOrange border-2 border-black rounded-[5px] py-3 px-3 flex flex-col md:flex-row  items-center justify-center w-full gap-5"
                >
                  <div className="py-2 font-fraunces bg-customGreen font-bold  px-3 rounded-full border-2  ">
                    <h1>{element.index.slice(0, 2)}</h1>
                  </div>

                  <div className=" flex items-start justify-center gap-1 flex-col w-full">
                    <h1 className="font-fraunces font-bold text-xl">
                      {element.index}
                    </h1>
                    <h1 className="font-ibm text-sm">{element.subtext}</h1>
                  </div>
                  <div>
                    <h1>
                      <ArrowRight />
                    </h1>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
