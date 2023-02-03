import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplitPane from "react-split-pane";

import Home from "./pages/home.jsx";
import Dashboard from "./pages/dashboard.jsx";
import PostPost from "./pages/postPost.jsx";
import Nav from "./components/nav.jsx";
import { useEffect, useState, useContext } from "react";
import ContextProvider from "./config/context.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
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
          </Routes>
        </div>
      </ContextProvider>
      <Nav />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
