import { useParams } from "react-router-dom";
import Card from "../card/Card";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import Message from "../messageBars/Message";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [messageBar, showMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_BACKEND_URL
        const response = await fetch(
          `${API_URL}/profile/${username}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response) throw new Error("Client Error (404). Try Again");
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.content);
        }
        setUser(data.content);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchData();
  }, [username]);
  const showError = () => {
    if (errorMessage) {
      showMessage(false);
      setErrorMessage(null);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      showMessage(true);
    }
  }, [errorMessage, showMessage]);

  return (
  <div className="relative">
    {user ? (
      <div>
        <Card user={user} />
      </div>
    ) : (
      <div className="flex items-center justify-center flex-col gap-5 font-ibm min-h-screen">
        <h1>Please Wait: Fetching Data</h1>
        <Loader />
      </div>
    )}

    {messageBar && (
      <div className="fixed top-0 right-0 p-5">
        <Message navigation={showError} open={messageBar} close={showMessage} duration={2000} message={errorMessage} success={false} />
      </div>
    )}
  </div>
);
}
