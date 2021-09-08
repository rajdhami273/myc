import React, { Suspense, useEffect, useState } from "react";
import ErrorPopup from "./components/ErrorPopup/ErrorPopup";
import http from "./services/http";

export const AppContext = React.createContext();

export default function AppProvider(props) {
  const [messages, setMessages] = useState([]);
  function addMessage(message) {
    console.log(messages);
    setMessages([...messages, message]);
  }
  function addAxiosErrorMessage(error) {
    if (error.response) {
      addMessage(error.response.data.message);
    } else {
      addMessage(error.message);
    }
  }
  function removeElement(index) {
    setMessages([...messages.slice(0, index), ...messages.slice(index + 1)]);
  }

  const [userData, setUserData] = useState({});
  async function getuserDetails() {
    try {
      const res = await http.get("/user/me");
      if (res.data) {
        console.log(res.data);
        setUserData(res.data);
      }
    } catch (error) {
      addAxiosErrorMessage(error);
    }
  }
/* eslint-disable */
  useEffect(() => {
    localStorage.getItem("authToken") && getuserDetails();
  }, []);
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <AppContext.Provider
        value={{ addMessage, addAxiosErrorMessage, getuserDetails, userData }}
      >
        {props.children}
      </AppContext.Provider>
      <div style={{ position: "absolute", top: 0, right: 0 }}>
        {messages.map((item, index) => {
          // setTimeout(() => {
          //   removeElement(index);
          // }, 3000);
          return (
            <ErrorPopup
              message={item}
              key={index}
              onClick={() => removeElement(index)}
            />
          );
        })}
      </div>
    </Suspense>
  );
}
