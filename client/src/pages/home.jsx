import { useEffect, useState } from "react";
import "../App.css";
import "../../styles/home.css";
import people from "../assets/p1.svg";
import p2 from "../assets/p2.svg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { GoogleLogin } from "react-google-login";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { gapi } from "gapi-script";
import { colors } from "../tools.js";
import { useContext } from "react";
import { ContextProvider } from "../config/context";
import { NavLink, useNavigate } from "react-router-dom";
function Home() {
  const { logged, setlogged, loggeddata, setloggeddata } =
    useContext(ContextProvider);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState(null);

  const handleSignup = async (res) => {
    console.log("success:", res?.profileObj);
    console.log("myemail");
    console.log(res?.profileObj.email);
    const data = await axios.post(
      "http://192.168.100.11:3000/v1/api/user/loginuser",
      {
        u_email: res?.profileObj.email,
      }
    );
    console.log(data.data.status);
    if (data.data.status == 200) {
      toast("User  exists!! Please Login");
    } else {
      setloggeddata(res?.profileObj);
      setLogin(true);
      postData(res?.profileObj);
      setlogged(true);
      console.log(logged);
      toast.success("Sucessfully Created an Account");
      localStorage.setItem("email", JSON.stringify(res?.profileObj.email));
      localStorage.setItem("loggedData", JSON.stringify(res?.profileObj));
      navigate("../app/dashboard", { replace: true });
      window.location.reload();
    }
  };

  const handleLogin = async (res) => {
    console.log(res?.profileObj.email);
    const data = await axios.post(
      "http://192.168.100.11:3000/v1/api/user/loginuser",
      {
        u_email: res?.profileObj.email,
      }
    );
    console.log(data.data.status);
    if (data.data.status === 200) {
      setloggeddata(res?.profileObj);
      setLogin(true);
      setlogged(true);
      console.log(loggeddata);
      localStorage.setItem("email", JSON.stringify(res?.profileObj.email));
      localStorage.setItem("loggedData", JSON.stringify(res?.profileObj));
      navigate("../app/dashboard", { replace: true });
      window.location.reload();
    } else {
      toast("User Doesnot exists! Please. SignUp");
    }
  };

  const onFailure = (err) => {
    console.log("failed:", err);
  };

  const postData = async (res) => {
    console.log("posting");

    console.log(res);
    console.log("no");

    const data = await axios.post(
      "http://192.168.100.11:3000/v1/api/user/postuser",
      {
        u_gid: res.googleId,
        u_email: res.email,
        u_name: res.name,
        u_prof: res.imageUrl,
      }
    );
    console.log(data);
  };

  useEffect(() => {
    if (logged) {
      navigate("./app/dashboard", { replace: true });
    }
  });
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
              marginLeft: 50,
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
              marginLeft: 70,
            }}
          >
            <p
              style={{
                marginTop: "30%",
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
                fontFamily: "poppins",
                fontWeight: "500",
                fontSize: 20,
              }}
            >
              Soclix is a platform where a business can link its different
              social Media accounts like Facebook Instagram Twitter and can post
              to its different account from the same platform at once which
              saves time and effort for the company.{" "}
            </p>

            <section
              style={{
                flex: 1,
                marginTop: 30,
                flexDirection: "row",
                justifyContent: "flex-start",
                display: "flex",
              }}
            >
              <div
                style={{
                  flex: 0.3,
                  width: 300,
                }}
              >
                <GoogleLogin
                  style={{
                    flex: 0.4,
                    width: 250,
                  }}
                  render={(renderProps) => (
                    <button
                      style={{
                        width: 250,
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
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Sign In with Google{" "}
                    </button>
                  )}
                  clientId="428588983939-512dmrggt37aptulqht3lgbsjp2cgkva.apps.googleusercontent.com"
                  buttonText="Sign in with Google"
                  onSuccess={(res) => handleLogin(res)}
                  onFailure={onFailure}
                />{" "}
              </div>
              <div
                style={{
                  marginLeft: 10,
                  flex: 1,
                  borderWidth: 1,
                  borderColor: colors.primary,
                }}
              >
                <GoogleLogin
                  onSuccess={(res) => handleSignup(res)}
                  render={(renderProps) => (
                    <button
                      style={{
                        width: 250,
                        flex: 0.3,
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
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Sign Up with Google{" "}
                    </button>
                  )}
                  backgroundColor="red"
                  clientId="428588983939-512dmrggt37aptulqht3lgbsjp2cgkva.apps.googleusercontent.com"
                  buttonText="Sign  Up with Google"
                  // onSuccess={(res) => onSuccess(res)}
                  onFailure={onFailure}
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
