import { useEffect, useState } from "react";
import "../App.css";
import "../../styles/home.css";
import people from "../assets/p1.svg";
import p2 from "../assets/p2.svg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import { colors } from "../tools.js";
import { useContext } from "react";
import { ContextProvider } from "../config/context";
import { NavLink, useNavigate } from "react-router-dom";
function Home() {
  const { logged, setlogged, loggeddata } = useContext(ContextProvider);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(false);
  const [loggedData, setloggedData] = useState(null);
  const [email, setEmail] = useState(null);
  const onSuccess = (res) => {
    console.log("success:", res?.profileObj);
    setloggedData(res?.profileObj);
    setLogin(true);

    localStorage.setItem("logged", true);
    localStorage.setItem("email", JSON.stringify(res?.profileObj.email));
    postData();
    navigate("../app/dashboard", { replace: true });

    // localStorage.setItem("loggedData", JSON.stringify(res?.profileObj));
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };

  const postData = async () => {
    const data = await axios.post(
      "http://192.168.10.102:3000/v1/api/user/postuser",
      {
        u_gid: loggedData.googleId,
        u_email: loggedData.email,
        u_name: loggedData.name,
        u_prof: loggedData.imageUrl,
      }
    );
    console.log(data);
  };

  useEffect(() => {
    alert(logged);
    var e = localStorage.getItem("email");
    alert(e);
  }, []);
  return (
    <div
      className="App"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div>
        <section className="hNav">
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
        </section>
        <section
          style={{
            display: "flex",
            flex: 1,
            marginTop: 50,
            flexDirection: "row",
          }}
        >
          <div
            style={{
              flex: 0.375,
            }}
          >
            <p
              style={{
                marginTop: "40%",
                color: "black",
                fontFamily: "Poppins",
                fontWeight: "700",
                fontSize: 50,
              }}
            >
              Introducing{" "}
              <span
                style={{
                  color: colors.primary,
                }}
              >
                Soclix
              </span>
            </p>
            <p
              style={{
                color: "black",
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: 20,
              }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
              fuga dolorem aut? Corporis sequi veniam a cumque impedit dolore
              voluptatum ut unde, voluptatibus est? Enim odit sed ipsum amet
              voluptate!{" "}
            </p>

            <section
              style={{
                flex: 1,
                marginTop: 30,
                flexDirection: "row",
                display: "flex",
              }}
            >
              <GoogleLogin
                style={{
                  flex: 0.4,
                  fontFamily: "Roboto",
                  fontWeight: "700",
                  letterSpacing: 1.3,
                  color: colors.primary,
                  borderRadius: 10,
                  height: 47,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  backgroundColor: "white",
                }}
                clientId="534384847718-dhr6p5r9ntqj98krqcitoaqksteppts1.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />{" "}
              <div
                style={{
                  marginLeft: 10,

                  borderWidth: 1,
                  borderColor: colors.primary,
                }}
              >
                <GoogleLogin
                  backgroundColor="red"
                  clientId={
                    "534384847718-dhr6p5r9ntqj98krqcitoaqksteppts1.apps.googleusercontent.com"
                  }
                  buttonText="Sign in Up with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                />
              </div>
            </section>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flex: 0.5,
            }}
          >
            <img
              src={people}
              style={{
                alignSelf: "flex-end",
                marginBottom: 60,
                width: "70%",
                height: "75%",
              }}
            />
            <img
              src={p2}
              style={{
                alignSelf: "flex-end",
                marginBottom: 60,
                width: "30%",
                height: "30%",
              }}
            />
          </div>
        </section>

        {/* <section
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: colors.primary,
            width: "100%",
          }}
        >
          <p
            style={{
              fontFamily: "Roboto",
              fontWeight: "700",
              letterSpacing: 1.3,
              marginLeft: 10,
            }}
          >
            Soclix All Right Reserved
          </p>
        </section> */}
      </div>
    </div>
  );
}

export default Home;
