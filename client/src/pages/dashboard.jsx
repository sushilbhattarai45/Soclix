import { fontSize, fontWeight, lineHeight } from "@mui/system";
import { useState, useEffect, useContext } from "react";
import p1 from "../assets/pp.jpg";
import ContextProvider from "../config/context.jsx";
import people from "../assets/people.svg";
import { colors } from "../tools";
function Dashboard() {
  // const { a } = useContext(ContextProvider);
  const [logged, setlogged] = useState(false);
  const [show, setShow] = useState(true);
  const [loggedddata, setloggeddata] = useState({});
  useEffect(() => {
    getName();
    return;
  }, []);
  async function getName() {
    const l = localStorage.getItem("logged");
    const d = localStorage.getItem("loggedData");
    // setlogged(l);
    setloggeddata(JSON.parse(d));
  }

  return (
    <div style={{}}>
      <div
        style={{
          position: "absolute",
          width: "80%",
          top: 10,
        }}
      >
        <div
          style={{
            display: "flex",

            flexDirection: "row",
            width: "100%",
          }}
        >
          <div
            style={{
              padding: 20,
              flex: 0.1,
            }}
          >
            <img
              onClick={() => {
                alert("ok");
                localStorage.setItem("logged", false);
                localStorage.setItem("loggeddata", null);
              }}
              src={loggedddata?.imageUrl}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
              }}
            />
          </div>
          <div
            style={{
              color: "black",
              flex: 1,
              marginTop: 20,
              lineHeight: 0.7,
            }}
          >
            <p
              style={{
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Roboto",
                letterSpacing: 1,
              }}
            >
              {" "}
              {loggedddata?.name}
            </p>
            <p
              style={{
                fontSize: 15,
                fontFamily: "Roboto",
                letterSpacing: 0.2,
              }}
            >
              I am what I am
            </p>
            <p
              style={{
                fontSize: 15,
                fontFamily: "Roboto",
                letterSpacing: 0.2,
              }}
            >
              @sushil_bhattarai4 @sushil_bhattarai4
            </p>
            <p
              style={{
                fontSize: 15,
                fontFamily: "Roboto",
                letterSpacing: 0.2,
              }}
            >
              {loggedddata?.email}
            </p>
          </div>

          <div
            className="
          "
          >
            <img
              src={people}
              style={{
                width: 150,
                height: 150,
              }}
            />
          </div>
        </div>
        <hr
          style={{
            background: "black",
            color: "black",
            borderColor: "black",
            height: "1px",
          }}
        />{" "}
        <div
          style={{
            marginTop: 20,
          }}
        >
          <p
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Roboto",
              color: "black",
            }}
          >
            Analtics OverView
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <div
              style={{
                flex: 0.3,
                backgroundColor: "#279ec6",

                height: 80,
                lineHeight: 0.1,
                textAlign: "center",
                borderRadius: 20,
              }}
            >
              <p
                style={{
                  flex: 0.1,
                  lineHeight: 0.5,
                  fontFamily: "Roboto",
                  fontSize: 20,
                }}
              >
                {" "}
                8.2K{" "}
              </p>
              <p
                style={{
                  flex: 1,
                  lineHeight: 0.1,
                  fontFamily: "Roboto",
                }}
              >
                Instagram Followers
              </p>
            </div>
            <div
              style={{
                flex: 0.3,
                marginLeft: 10,
                backgroundColor: colors.primary,

                height: 80,
                lineHeight: 0.1,
                textAlign: "center",
                borderRadius: 20,
              }}
            >
              <p
                style={{
                  flex: 0.1,
                  lineHeight: 0.5,
                  fontFamily: "Roboto",
                  fontSize: 20,
                }}
              >
                {" "}
                4.2K{" "}
              </p>
              <p
                style={{
                  flex: 1,
                  lineHeight: 0.1,
                  fontFamily: "Roboto",
                }}
              >
                Twitter Followers
              </p>
            </div>
            <div
              style={{
                flex: 0.3,
                marginLeft: 10,
                backgroundColor: "#062c67",

                height: 80,
                lineHeight: 0.1,
                textAlign: "center",
                borderRadius: 20,
              }}
            >
              <p
                style={{
                  flex: 0.1,
                  lineHeight: 0.5,
                  fontFamily: "Roboto",
                  fontSize: 20,
                }}
              >
                {" "}
                6.2K{" "}
              </p>
              <p
                style={{
                  flex: 1,
                  lineHeight: 0.1,
                  fontFamily: "Roboto",
                }}
              >
                Facebook Followers
              </p>
            </div>
            <div
              style={{
                flex: 0.3,
                marginLeft: 10,
                backgroundColor: "#279ec6",

                height: 80,
                lineHeight: 0.1,
                textAlign: "center",
                borderRadius: 20,
              }}
            >
              <p
                style={{
                  flex: 0.1,
                  lineHeight: 0.5,
                  fontFamily: "Roboto",
                  fontSize: 20,
                }}
              >
                {" "}
                10K{" "}
              </p>
              <p
                style={{
                  flex: 1,
                  lineHeight: 0.1,
                  fontFamily: "Roboto",
                }}
              >
                Youtube Subscribers
              </p>
            </div>
            <div
              style={{
                flex: 0.3,
                marginLeft: 10,
                backgroundColor: colors.primary,

                height: 80,
                lineHeight: 0.1,
                textAlign: "center",
                borderRadius: 20,
              }}
            >
              <p
                style={{
                  flex: 0.1,
                  lineHeight: 0.5,
                  fontFamily: "Roboto",
                  fontSize: 20,
                }}
              >
                {" "}
                10 K{" "}
              </p>
              <p
                style={{
                  flex: 1,
                  lineHeight: 0.1,
                  fontFamily: "Roboto",
                }}
              >
                Active Views
              </p>
            </div>
            <div
              style={{
                flex: 0.3,
                marginLeft: 10,
                backgroundColor: "#062c67",

                height: 80,
                lineHeight: 0.1,
                textAlign: "center",
                borderRadius: 20,
              }}
            >
              <p
                style={{
                  flex: 0.1,
                  lineHeight: 0.5,
                  fontFamily: "Roboto",
                  fontSize: 20,
                }}
              >
                {" "}
                8.2K{" "}
              </p>
              <p
                style={{
                  flex: 1,
                  lineHeight: 0.1,
                  fontFamily: "Roboto",
                }}
              >
                Followers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
