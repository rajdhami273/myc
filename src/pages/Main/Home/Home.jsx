import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../AppProvider";
import Chat from "../Chat/Chat";

export default function Home(props) {
  const { userData } = useContext(AppContext);
  useEffect(() => {}, [userData]);

  return (
    <>
      <h1>Welcome home, {userData?.name || "Stranger"}!</h1>
      <div className="chat-section">
        <Chat />
      </div>
    </>
  );
}
