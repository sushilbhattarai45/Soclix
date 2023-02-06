import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplitPane from "react-split-pane";
import Router from "./router.jsx";
import { useEffect, useState, useContext } from "react";
import { ContextProvider } from "./config/context.jsx";
import Context from "./config/context.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { logged, setlogged, loggeddata } = useContext(ContextProvider);

  console.log(logged);
  return (
    <>
      <Context>
        <Router />
        <Toaster />
      </Context>
    </>
  );
}
