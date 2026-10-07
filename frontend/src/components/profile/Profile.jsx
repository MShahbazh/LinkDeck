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
  
  // LOG 1: Track every component re-render and state cycle
  console.log("--- RENDER CYCLE ---");
  console.log("Current URL Username parameter:", username);
  console.log("Current User State:", user);
  console.log("Current Error Message State:", errorMessage);

  useEffect(() => {
    const fetchData = async () => {
      // LOG 2: Confirm if the fetching sequence actually fires
      console.log("1. fetchData triggered for username:", username);
      
      try {
        const API_URL = import.meta.env.VITE_BACKEND_URL;
        const targetUrl = `${API_URL}/profile/${username}`;
        
        console.log("2. Sending GET request to:", targetUrl);
        
        const response = await fetch(targetUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        
        // LOG 3: Inspect raw HTTP response metrics
        console.log("3. HTTP Response Received Status:", response.status, "OK Status:", response.ok);

        if (!response.ok) {
          throw new Error(`Server Error (${response.status}). Try Again`);
        }

        const data = await response.json();
        
        // LOG 4: Inspect parsed data payload from the backend
        console.log("4. Parsed JSON Data Payload:", data);

        if (!data.success) {
          console.warn("-> API success flag is false. Rejecting payload.");
          throw new Error(data.content || "Profile visibility restriction or missing data.");
        }

        // LOG 5: Trace exactly what is being sent to state
        console.log("5. Data validated successfully. Target content path:", data.content);
        setUser(data.content);

      } catch (error) {
        // LOG 6: Catch block fallback tracker
        console.error("❌ Catch Block Triggered! Error detail:", error.message);
        setErrorMessage(error.message);
      }
    };
    
    if (username) {
      fetchData();
    } else {
      console.warn("fetchData bypassed: 'username' route parameter is undefined.");
    }
  }, [username]);

  const showError = () => {
    if (errorMessage) {
      showMessage(false);
      setErrorMessage(null);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      console.log("Error side effect triggered. Showing layout message banner.");
      showMessage(true);
    }
  }, [errorMessage]);

  return (
    <div className="relative">
      {user ? (
        <div>
          {/* LOG 7: This log triggers right when the conditions pass to display the Card component */}
          {console.log("🎉 SUCCESS: Conditions met! Rendering <Card /> component with payload:", user)}
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
