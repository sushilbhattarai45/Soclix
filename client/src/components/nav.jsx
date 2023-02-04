import { useState } from "react";
import { ImCross } from "react-icons/im";
import "../../styles/nav.css";
import { Outlet, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import user from "../assets/user.svg";
import post from "../assets/post.svg";
import posts from "../assets/posts.svg";
import { useContext } from "react";
import { ContextProvider } from "../config/context";
function Nav() {
  const logout = () => {
    localStorage.removeItem("logged");
    localStorage.removeItem("loggeddata");
    localStorage.setItem("email", "");

    setloggeddata(null);
    setlogged(false);
    navigate("../");
  };

  const { logged, setlogged, loggeddata, setloggeddata } =
    useContext(ContextProvider);
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [label, setLabel] = useState("Dashboard");
  return (
    <div style={{ flex: 1, flexDirection: "row", display: "flex" }}>
      {/* <div
        style={{
          position: "absolute",
          left: 0,
          zIndex: 1,
          top: 0,
          backgroundColor: "blue",
          justifyContent: "left",
        }}
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? <ImCross /> : <HiMenu />}
      </div> */}
      <div
        style={{
          display: "flex",
          flex: 0.15,
        }}
      >
        <div
          style={{
            left: 20,

            zIndex: 1,
            top: 0,
            justifyContent: "left",
          }}
        >
          <p
            style={{
              color: "white",
              fontFamily: "Poppins",
              fontWeight: "700",
              fontSize: 26,
            }}
          >
            Logo
          </p>
        </div>
        {show ? (
          <div
            className="sidebar"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              backgroundColor: " rgb(108 99 255)",
              justifyContent: "left",
            }}
          >
            <ul
              className="navul"
              style={{
                listStyleType: "none",
                fontFamily: "Roboto",
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              <li>
                {" "}
                <Link to={"./dashboard"}>
                  <button
                    onClick={() => {
                      setLabel("Dashboard");
                    }}
                    style={
                      label == "Dashboard"
                        ? {
                            backgroundColor: "white",
                            color: "rgb(108 99 255)",
                            justifyContent: "center",
                          }
                        : null
                    }
                  >
                    Dashboard
                  </button>
                </Link>
              </li>
              <li>
                <Link to={"./"}>
                  <button
                    onClick={() => {
                      setLabel("Posts");
                    }}
                    style={
                      label == "Posts"
                        ? { backgroundColor: "white", color: "rgb(108 99 255)" }
                        : null
                    }
                  >
                    My Posts
                  </button>
                </Link>
              </li>
              <li>
                <Link to={"./post"}>
                  <button
                    onClick={() => {
                      setLabel("Create");
                    }}
                    style={
                      label == "Create"
                        ? { backgroundColor: "white", color: "rgb(108 99 255)" }
                        : null
                    }
                  >
                    Create Post
                  </button>
                </Link>
              </li>
              <li>
                <Link to={"././addConfig"}>
                  <button
                    onClick={() => {
                      setLabel("Config");
                    }}
                    style={
                      label == "Config"
                        ? { backgroundColor: "white", color: "rgb(108 99 255)" }
                        : null
                    }
                  >
                    Configurations
                  </button>
                </Link>
              </li>
            </ul>
            <button
              style={{
                backgroundColor: "white",
                position: "absolute",
                bottom: 0,
                marginLeft: 30,
              }}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          flex: 0.8,
        }}
      >
        {" "}
        <Outlet />
      </div>
    </div>
  );
}

export default Nav;
