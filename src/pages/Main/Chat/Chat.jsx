import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../AppProvider";
import ButtonWithLoader from "../../../components/ButtonWithLoader/ButtonWithLoader";
import FormInput from "../../../components/FormInput/FormInput";
import http from "../../../services/http";
import "./Chat.css";
import * as moment from "moment";
import io from "socket.io-client";
import config from "../../../services/config";

export default function Chat(props) {
  const { addAxiosErrorMessage, userData } = useContext(AppContext);
  const [chats, setChats] = useState([]);
  const [gettingChats, setGettingChats] = useState(false);
  async function getChats() {
    try {
      const res = await http.get("/chat/all");
      if (res.data) {
        // console.log(res.data, userData);
        setChats(res.data);
      }
    } catch (error) {
      addAxiosErrorMessage(error);
    } finally {
      setGettingChats(false);
    }
  }

  const [message, setMessage] = useState("");
  async function sendMessage() {
    if (!message) return;
    // setGettingChats(true);
    try {
      const res = await http.post("/chat/add-message", { message });
      if (res.data) {
        getChats();
        setMessage("");
        socketRef.current?.emit("new-message");
      }
    } catch (error) {
      addAxiosErrorMessage(error);
    } finally {
      setGettingChats(false);
    }
  }

  const chatBodyRef = useRef(null);
  function scrollToBottomOfChatBody() {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }
  useEffect(() => {
    setTimeout(() => {
      // console.log(chatBodyRef);
      scrollToBottomOfChatBody();
    }, 0);
  }, [chats]);

  /* eslint-disable */
  useEffect(() => {
    setGettingChats(true);
    getChats();
  }, []);

  let socketRef = useRef(null);
  useEffect(() => {
    socketRef.current = io(config.serverUrl);
    socketRef.current.on("connect", () => {
      console.log("I am listening live...");
    });
    // console.log(socketRef.current);
    // socketRef.current?.emit("new-message", "messsage new");
    socketRef.current?.on("new-message", (data) => {
      getChats();
    });
    return () => {
      socketRef.current?.disconnect();
    };
    // let soc = io(config.serverUrl, { forceNew: true });
    // soc.on("new-message", () => {
    //   console.log("Here is new message");
    // });
    // soc.emit("new-message", { hello: "hello" });
    // return () => soc.disconnect();
  }, []);
  return (
    <div className="chat-container">
      <div className="chat-body" ref={chatBodyRef}>
        {gettingChats ? (
          <ButtonWithLoader />
        ) : (
          chats.map((item) => {
            const { _id, message, userDetails, messageBy, createdAt } = item;
            return (
              <div
                className={
                  "message-box " +
                  (userData._id === messageBy ? "right" : "left")
                }
                key={_id}
              >
                <div className="message-head">
                  <div className="sender-name">
                    {userDetails.name || "Stranger"}
                  </div>
                  <div className="send-time">{moment(createdAt).fromNow()}</div>
                </div>
                {message}
              </div>
            );
          })
        )}
      </div>

      <div className="chat-footer">
        <FormInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder={"Write here..."}
          hideError
        />
        <ButtonWithLoader
          title="Send"
          className="chatBtn"
          type="submit"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
}
