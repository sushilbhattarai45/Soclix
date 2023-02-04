import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplitPane from "react-split-pane";
import Config from "./pages/config.jsx";
import Home from "./pages/home.jsx";
import Dashboard from "./pages/dashboard.jsx";
import PostPost from "./pages/postPost.jsx";
import Nav from "./components/nav.jsx";
import AddConfig from "./pages/addConfig.jsx";
import { useEffect, useState, useContext } from "react";
import { ContextProvider } from "./config/context.jsx";
import Context from "./config/context.jsx";
export default function App() {
  const { logged, setlogged, loggeddata } = useContext(ContextProvider);

  console.log(logged);
  return (
    <>
      <div
        style={{
          marginLeft: 220,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/" element={<Dashboard />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post" element={<PostPost />} />

          <Route path="/config" element={<Config />} />
          <Route path="/addConfig" element={<AddConfig />} />
        </Routes>
      </div>

      <Nav />
    </>
  );
}
