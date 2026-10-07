import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  ArrowUpRight,
  Clipboard,
  Plus,
  Pencil,
  X,
  CircleX,
  Trash,
} from "lucide-react";
import { useEffect } from "react";
import {
  logout,
  updateUser,
  addLink,
  deleteLink,
  clearStates,
  editLink,
  setVerifyMessage,
} from "../../store/slice/userSlice";
import Message from "../messageBars/Message";

export default function Dashboard() {
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mainSubtextToggle, toggleIt] = useState(false);
  const [draftMainText, addDraftMainText] = useState("");
  const [addnewLink, toggleaddnewLink] = useState(false);
  const [editOldLink, toggleeditOldLink] = useState(false);

  const [newLinkInfo, setNewLinkInfo] = useState({
    id: -1,
    index: "",
    link: "",
    subtext: "",
  });

  const { user, loading, verifyMessage } = useSelector(
    (state) => state.userSlice,
  );
  const [messageBar, showMessage] = useState(false);

  const showError = () => {
    if (verifyMessage) {
      showMessage(false);
      dispatch(clearStates());
    }
  };

  useEffect(() => {
    if (!loading && verifyMessage && verifyMessage.showBar) {
      if (verifyMessage.showBar) showMessage(true);
    }
  }, [loading, verifyMessage, showMessage]);

  useEffect(() => {
    if (
      !user ||
      (verifyMessage && !verifyMessage.success && verifyMessage.showBar)
    ) {
      showMessage(true);
    }
  }, [user, verifyMessage, showMessage]);

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  async function copyLink() {
    try {
      const API_URL = import.meta.env.VITE_FRONTEND_URL;
      if (!user || !user.username) throw new Error("User Not Found");
      await navigator.clipboard.writeText(
        `${API_URL}/profile/${user.username}`,
      );
      dispatch(
        setVerifyMessage({
          success: true,
          message: "Copied to Clipboard",
          showBar: true,
        }),
      );
    } catch (error) {
      dispatch(
        setVerifyMessage({
          success: false,
          message: "Unable to Copy to Clipboard",
          showBar: true,
        }),
      );
    }
  }

  if (!user) return null;

  return (
    <div className="relative">
      <div className="relative border-b-2 font-ibm  flex sm:flex-row flex-col sm:gap-0 gap-5 px-3 py-3  items-center justify-between w-full md:px-5">
        <div className="flex items-center justify-center gap-2  md:gap-5 md:py-1 sm:py-3  ">
          <img src="/favicon.svg" alt="" className="" />
          <h1 className="md:text-md">LinkDeck</h1>
        </div>
        <div
          onClick={() => {
            setProfile(!profile);
          }}
          className=" shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer  hover:-translate-x-1 hover:-translate-y-0.5 duration-500 border md:border-2 py-2 px-5 rounded-[3px] text-sm"
        >
          <h1>~{user.username}</h1>
        </div>

        {profile ? (
          <div className="shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]   text-sm bg-white absolute flex items-start justify-center flex-col right-[43%]  md:right-5 top-full  border-2 -mt-2 rounded-[5px] w-[13%]">
            <h1
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
              className="px-3 py-3   w-full text-customRed cursor-pointer hover:bg-lightRed"
            >
              Logout
            </h1>
          </div>
        ) : null}
      </div>
      <div className="bg-slightRed py-10 px-10 grid grid-cols-1 md:grid-cols-2 border-b-2 border-b-black">
        <div className="flex items-start justify-center gap-5 flex-col w-full">
          <div className="flex items-start justify-center gap-5">
            <div className="">
              <h1 className="rounded-full p-5 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] bg-customRed text-white w-full  flex items-center justify-center border-2 border-black">
                <User size={45} />
              </h1>
            </div>
            <div className="flex items-start justify-center flex-col gap-5 w-full ">
              <h1 className="font-fraunces font-bold text-5xl">{user.name}</h1>
              <h1 className="bg-white border-2 px-2 py-1 rounded-[5px] font-ibm text-sm">
                ~{user.username}
              </h1>
            </div>
          </div>

          <div className="flex items-center justify-center gap-5 w-[80%] py-2">
            {mainSubtextToggle ? (
              <div className="w-full flex items-start justify-between gap-3 flex-col">
                <textarea
                  rows={3}
                  maxLength={100}
                  className="shadow-[3px_3px_0px_0px]  shadow-customOrange rounded-[5px] w-full font-fraunces italic text-md px-3 outline-none  bg-white border-2 py-5"
                  type="text"
                  value={draftMainText}
                  onChange={(e) => {
                    addDraftMainText(e.target.value);
                  }}
                />
                <div className="flex items-center justify-between font-ibm text-sm w-full  ">
                  <h1>{draftMainText.length} / 100</h1>
                  <div className="flex items-center justify-center gap-5">
                    <h1
                      className="hover:scale-105  duration-300 border-2  rounded-[5px] px-3 py-1 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      onClick={() => {
                        toggleIt(false);
                      }}
                    >
                      Cancel
                    </h1>
                    <h1
                      className="hover:scale-105  duration-300 border-2  rounded-[5px] px-3 py-1 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-customRed text-white border-black"
                      onClick={() => {
                        dispatch(
                          updateUser({
                            element: "subline",
                            content: draftMainText,
                          }),
                        );

                        addDraftMainText("");
                        toggleIt(false);
                      }}
                    >
                      Save
                    </h1>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p
                  className={`  whitespace-pre-wrap wrap-break-words leading-relaxed w-full ${user.subline.length == 0 ? "font-ibm" : "italic font-fraunces text-base"} `}
                >
                  {user.subline.length == 0 ? "Not Set Yet" : user.subline}
                </p>
                <h1
                  onClick={() => {
                    toggleIt(true);
                    addDraftMainText(user.subline);
                  }}
                  className="border-2 p-2 rounded-[5px] cursor-pointer hover:bg-lightRed"
                >
                  <Pencil size={15} />
                </h1>
              </>
            )}
          </div>
        </div>
        <div className="bg-white border-2 border-black rounded-[10px] px-5 py-5 shadow-[3px_3px_0px_0px]  shadow-customOrange flex items-center justify-center flex-col gap-5">
          <div className="flex items-center justify-start w-full">
            <h1 className="font-ibm text-black/50 text-sm">PAGE STATUS</h1>
          </div>

          <div className="flex items-center justify-start gap-5  font-ibm w-full">
            <div className=" flex items-center justify-center">
              <label className="inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={user.visible}
                  onChange={() => {
                    dispatch(
                      updateUser({
                        element: "visible",
                        content: !user.visible,
                      }),
                    );
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6  border-2 border-black bg-gray-300 transition-colors duration-200 ease-in-out relative peer-checked:bg-[#22c55e]">
                  <div
                    className={`w-3 h-3 rounded-full bg-white border-2 border-black absolute top-[4px] left-[5px] transition-transform duration-200 ease-in-out ${user.visible ? "translate-x-4" : "translate-x-0"}`}
                  />
                </div>
              </label>
            </div>
            <div className="">
              <h1>Page is {user.visible ? "Live" : "Hidden"}</h1>
            </div>
          </div>

          <div className="flex items-center justify-between w-full gap-3 font-ibm">
            <Link
              to="/dashboard/preview"
              className="shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.25 duration-300 flex items-center justify-center gap-3  cursor-pointer    border md:border-2 py-1 px-5 md:py-2 w-full rounded-[3px] text-sm"
            >
              <h1>Preview Page</h1>
              <ArrowUpRight size={20} />
            </Link>

            <div
              onClick={copyLink}
              className="shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.25 duration-300 flex items-center justify-center gap-3  cursor-pointer    border md:border-2 py-1 px-5 md:py-2 w-full rounded-[3px] text-sm"
            >
              <h1>Copy Page Link</h1>
              <Clipboard size={20} />
            </div>
          </div>
          <div
            onClick={() => {
              toggleaddnewLink(true);
            }}
            className="hover:-translate-x-0.5 hover:-translate-y-0.25 duration-300  font-ibm flex items-center justify-center gap-3  cursor-pointer py-3 px-5  w-full rounded-[3px] text-sm bg-customRed text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            <h1>Add Link</h1>
            <Plus size={15} />
          </div>
        </div>
      </div>
      <div className="px-10 py-10 flex items-center justify-center flex-col gap-10">
        <div className=" flex items-start justify-between w-full gap-3 flex-col md:flex-row">
          <div className="flex items-start justify-center flex-col w-full gap-3">
            <h1 className="font-bold text-3xl font-fraunces">My Links</h1>
            <h1 className="font-ibm text-black/50 text-sm">
              Here you can add, edit and delete your links
            </h1>
          </div>
          <div
            onClick={() => {
              dispatch(updateUser({ element: "links", content: [] }));
            }}
            className="hover:-translate-x-0.5 hover:-translate-y-0.25 duration-300  font-ibm flex items-center justify-center gap-3  cursor-pointer py-3 px-1  rounded-[3px] text-sm  border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] w-full md:w-[20%]"
          >
            Delete All
            <Trash size={15} />
          </div>
        </div>

        <div className="px-2  w-full flex items-center justify-center">
          {user.links.length == 0 ? (
            <div className="py-10">
              <h1 className="font-ibm text-md text-black/50">
                No Links Added Yet
              </h1>
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col gap-5 w-[80%]">
              {user.links.map((element) => {
                return (
                  <div
                    key={element._id}
                    className="shadow-[3px_3px_0px_0px]  shadow-customOrange border-2 border-black rounded-[5px] py-3 px-3 flex flex-col md:flex-row  items-center justify-center w-full gap-5"
                  >
                    <div className="py-2 font-fraunces bg-customGreen font-bold  px-3 rounded-full border-2  ">
                      <h1>{element.index.slice(0, 2)}</h1>
                    </div>

                    <div className=" flex items-start justify-center gap-1 flex-col w-full">
                      <h1 className="font-fraunces font-bold text-xl">
                        {element.index}
                      </h1>
                      <h1 className="font-ibm text-sm">{element.subtext}</h1>
                      <h1 className="font-ibm text-sm">{element.link}</h1>
                    </div>

                    <div className="flex items-center justify-center gap-3 md:w-[10%]">
                      <h1
                        onClick={() => {
                          toggleeditOldLink(true);
                          setNewLinkInfo({
                            id: element._id,
                            index: element.index,
                            link: element.link,
                            subtext: element.subtext,
                          });
                        }}
                        className="border-2 p-2 rounded-[5px] cursor-pointer hover:scale-105 duration-300"
                      >
                        <Pencil size={15} />
                      </h1>

                      <h1
                        onClick={() => {
                          dispatch(deleteLink(element._id));
                        }}
                        className="border-2 p-2 rounded-[5px] cursor-pointer  hover:scale-105 duration-300"
                      >
                        <X size={15} />
                      </h1>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {addnewLink ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-10 ">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
          <div className="relative z-10 w-full max-w-md bg-white border-2 border-black  rounded-[10px] shadow-[3px_3px_0px_0px]  shadow-customOrange overflow-hidden">
            <div className="flex items-center justify-between  bg-slightRed border-b-2 border-b-black p-6">
              <h1 className="font-fraunces font-bold text-xl">Add Link</h1>
              <div
                onClick={() => {
                  setNewLinkInfo({ id: -1, index: "", link: "", subtext: "" });
                  toggleaddnewLink(false);
                }}
                className="cursor-pointer hover:scale-105 duration-300"
              >
                <CircleX size={30} />
              </div>
            </div>

            <div className="p-6 flex items-start justify-center flex-col gap-5 ">
              <div className="flex items-start justify-center flex-col gap-2 w-full">
                <label className="font-ibm text-sm text-black/50" htmlFor="">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Github"
                  value={newLinkInfo.index}
                  onChange={(e) => {
                    setNewLinkInfo((prev) => ({
                      ...prev,
                      index: e.target.value,
                    }));
                  }}
                  className="border-2 outline-none py-2 px-2 rounded-[5px] font-ibm w-full"
                />
              </div>

              <div className="flex items-start justify-center flex-col gap-2 w-full">
                <label className="font-ibm text-sm text-black/50" htmlFor="">
                  URL
                </label>
                <input
                  value={newLinkInfo.link}
                  onChange={(e) => {
                    setNewLinkInfo((prev) => ({
                      ...prev,
                      link: e.target.value,
                    }));
                  }}
                  type="text"
                  placeholder="https://"
                  className="border-2 outline-none py-2 px-2 rounded-[5px] font-ibm w-full"
                />
              </div>

              <div className="flex items-start justify-center flex-col gap-2 w-full">
                <label className="font-ibm text-sm text-black/50" htmlFor="">
                  Subline (Optional)
                </label>
                <input
                  value={newLinkInfo.subtext}
                  onChange={(e) => {
                    setNewLinkInfo((prev) => ({
                      ...prev,
                      subtext: e.target.value,
                    }));
                  }}
                  type="text"
                  placeholder="One Short line about this link"
                  className="font-ibm text-sm  border-2 outline-none py-2 px-2 rounded-[5px]  w-full "
                />
              </div>
            </div>

            <div
              onClick={() => {}}
              className="flex items-center justify-center gap-5 p-6"
            >
              <h1
                onClick={() => {
                  dispatch(addLink(newLinkInfo));
                  setNewLinkInfo({ id: -1, index: "", link: "", subtext: "" });
                  toggleaddnewLink(false);
                }}
                className="hover:scale-105  duration-300 border-2  rounded-[5px] px-3 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-customRed text-white border-black w-full flex items-center justify-center font-ibm py-3"
              >
                Add
              </h1>
            </div>
          </div>
        </div>
      ) : null}

      {editOldLink ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-10 ">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
          <div className="relative z-10 w-full max-w-md bg-white border-2 border-black  rounded-[10px] shadow-[3px_3px_0px_0px]  shadow-customOrange overflow-hidden">
            <div className="flex items-center justify-between  bg-slightRed border-b-2 border-b-black p-6">
              <h1 className="font-fraunces font-bold text-xl">Edit Link</h1>
              <div
                onClick={() => {
                  setNewLinkInfo({ id: -1, index: "", link: "", subtext: "" });
                  toggleeditOldLink(false);
                }}
                className="cursor-pointer hover:scale-105 duration-300"
              >
                <CircleX size={30} />
              </div>
            </div>

            <div className="p-6 flex items-start justify-center flex-col gap-5 ">
              <div className="flex items-start justify-center flex-col gap-2 w-full">
                <label className="font-ibm text-sm text-black/50" htmlFor="">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Github"
                  value={newLinkInfo.index}
                  onChange={(e) => {
                    setNewLinkInfo((prev) => ({
                      ...prev,
                      index: e.target.value,
                    }));
                  }}
                  className="border-2 outline-none py-2 px-2 rounded-[5px] font-ibm w-full"
                />
              </div>

              <div className="flex items-start justify-center flex-col gap-2 w-full">
                <label className="font-ibm text-sm text-black/50" htmlFor="">
                  URL
                </label>
                <input
                  value={newLinkInfo.link}
                  onChange={(e) => {
                    setNewLinkInfo((prev) => ({
                      ...prev,
                      link: e.target.value,
                    }));
                  }}
                  type="text"
                  placeholder="https://example.com"
                  className="border-2 outline-none py-2 px-2 rounded-[5px] font-ibm w-full"
                />
              </div>

              <div className="flex items-start justify-center flex-col gap-2 w-full">
                <label className="font-ibm text-sm text-black/50" htmlFor="">
                  Subline (Optional)
                </label>
                <input
                  value={newLinkInfo.subtext}
                  onChange={(e) => {
                    setNewLinkInfo((prev) => ({
                      ...prev,
                      subtext: e.target.value,
                    }));
                  }}
                  type="text"
                  placeholder="One Short line about this link"
                  className="font-ibm text-sm  border-2 outline-none py-2 px-2 rounded-[5px]  w-full "
                />
              </div>
            </div>

            <div
              onClick={() => {}}
              className="flex items-center justify-center gap-5 p-6"
            >
              <h1
                onClick={() => {
                  dispatch(editLink(newLinkInfo));
                  setNewLinkInfo({ index: "", link: "", subtext: "" });
                  toggleeditOldLink(false);
                }}
                className="hover:scale-105  duration-300 border-2  rounded-[5px] px-3 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-customRed text-white border-black w-full flex items-center justify-center font-ibm py-3"
              >
                Save
              </h1>
            </div>
          </div>
        </div>
      ) : null}

      {messageBar ? (
        <div className="fixed top-0 right-0 p-5">
          <Message
            navigation={showError}
            open={messageBar}
            close={showMessage}
            duration={2000}
            message={verifyMessage.message}
            success={verifyMessage.success}
          />
        </div>
      ) : null}
    </div>
  );
}
