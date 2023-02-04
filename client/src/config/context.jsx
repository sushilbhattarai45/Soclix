import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
export const ContextProvider = createContext({
  logged: "",
  setlogged: () => {},

  loggeddata: {},
  setloggeddata: () => {},
});
const Context = ({ children }) => {
  const [loggeddata, setloggeddata] = useState({});
  const [logged, setlogged] = useState(false);
  useEffect(() => {
    getName();
    return;
  }, [loggeddata]);

  async function getName() {
    const l = JSON.parse(localStorage.getItem("email"));
    console.log(l);
    if (l) {
      const data = await axios.post(
        "http://192.168.10.102:3000/v1/api/user/getUser",
        {
          u_email: l,
        }
      );
      console.log(data.data.data);
      setloggeddata(data.data.data);
      setlogged(true);

      console.log("ok" + loggeddata);
    }

    // setloggeddata(JSON.parse(d));
  }
  return (
    <ContextProvider.Provider
      value={{
        logged,
        setlogged,
        loggeddata,
        setloggeddata,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default Context;
