import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../AppProvider";

export default function Home(props) {
  const { userData } = useContext(AppContext);
  useEffect(() => {}, [userData]);
  if (userData?.name) {
    return <h1>Welcome home, {userData?.name}!</h1>;
  }
  return <h1>Welcome home!</h1>;
}
