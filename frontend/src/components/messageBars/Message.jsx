import { Check, Ban } from "lucide-react";
import { useEffect, useState } from "react";

export default function Message({
  open,
  close,
  duration,
  success,
  message,
  navigation,
}) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!open) return;
    const time = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - time;
      const percentage = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(percentage);
      if (percentage <= 0) {
        clearInterval(interval);

        navigation();
      }
    }, 50);

    const closeTimeout = setTimeout(() => {
      close();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(closeTimeout);
      close(false);
    };
  }, [open, close, duration]);

  return (
    <div
      className={`relative  shadow-[4px_4px_0px_0px]  flex items-center ${success ? "shadow-customGreen bg-slightGreen" : "shadow-customRed bg-slightRed"} justify-center gap-7 border-2 rounded-[10px] px-3 py-3`}
    >
      <div>
        <div
          className={`border-black border-2 py-1 px-1 rounded-[10px] text-white ${success ? "bg-customGreen" : "bg-customRed"}`}
        >
          {success ? <Check size={20} /> : <Ban size={20} />}
        </div>
      </div>
      <div className="flex items-start justify-center flex-col gap-1 w-full">
        <h1
          className={`${success ? "text-customGreen" : "text-customRed"} font-fraunces font-bold text-md`}
        >
          {success ? "Success" : "Error"}
        </h1>
        <p className="font-ibm text-sm">{message}</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[3px] ">
        <div
          style={{ width: `${progress}%` }}
          className="bg-black/40 h-full transition-all ease-linear duration-50 "
        ></div>
      </div>
    </div>
  );
}
