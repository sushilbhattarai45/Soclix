import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
export const ContextProvider = createContext({
  logged: false,
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
    const l = localStorage.getItem("email");
    if (l) {
      console.log(l);
      const data = await axios.post(
        "http://192.168.10.102:3000/v1/api/user/getUser",
        {
          u_email: localStorage.getItem("email"),
        }
      );

      console.log("Ok" + JSON.parse(data.data));
      setlogged(true);
    }
    setlogged(false);

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
