import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
export const ContextProvider = createContext({
  logged: "",
  setlogged: () => {},

  loggeddata: {},
  setloggeddata: () => {},
});

const Context = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [loggeddata, setloggeddata] = useState({});
  const [logged, setlogged] = useState(false);
  async function checkLogged() {
    var e = localStorage.getItem("email");
    console.log("my email is Ok" + email);
    if (e != null && e != "null") {
      setEmail(e);
      setlogged(true);
    }
  }

  useEffect(() => {
    checkLogged();

    logged ? getName() : null;
    return;
  }, [email]);

  async function getName() {
    const l = JSON.parse(localStorage.getItem("email"));
    console.log(l);
    if (l.length > 5) {
      const data = await axios.post(
        "http://192.168.100.11:3000/v1/api/user/getuser",
        {
          u_email: l,
        }
      );
      console.log(data.data.data);
      setloggeddata(data.data.data);
      setlogged(true);

      console.log(loggeddata);
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
