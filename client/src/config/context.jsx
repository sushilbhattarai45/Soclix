import React, { useEffect, useState } from "react";

import { createContext } from "react";
export const ContextProvider = createContext();
const Context = ({ children }) => {
  const [loggedddata, setloggeddata] = useState({});
  const [logged, setlogged] = useState(false);
  useEffect(() => {
    getName();

    console.log(loggedddata);
    console.log("ok" + loggedddata["name"]);
    return;
  }, []);
  async function getName() {
    const l = localStorage.getItem("logged");
    const d = localStorage.getItem("loggedData");
    setlogged(l);
    setloggeddata(JSON.parse(d));
  }
  return (
    <ContextProvider.Provider
      value={{
        a: [logged, setlogged],
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default Context;
