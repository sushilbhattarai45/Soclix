import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import "react-activity/dist/library.css";
import { Dots } from "react-activity";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
const validation = Yup.object().shape({
  fbappId: Yup.number(),
  fbaccesstoken: Yup.string(),
});
import { toast, Toaster } from "react-hot-toast";
import { useContext } from "react";
import { ContextProvider } from "../config/context";
const addConfig = () => {
  const { logged, loggeddata } = useContext(ContextProvider);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  const [appId, setAppId] = useState("");
  const [fbaccesstoken, setFbaccesstoken] = useState("");
  const getConfig = async () => {
    const data = await axios.post(
      "http://192.168.10.104:3000/v1/api/config/getConfig",
      {
        u_id: loggeddata?.u_gid,
      }
    );

    setAppId(data?.data?.data[0].fb_appId);
    setFbaccesstoken(data?.data?.data[0].fb_access);

    setData({
      fbappId: appId,
      fbaccesstoken: fbaccesstoken,
    });

    console.log("ok" + data?.data?.data[0].fb_appId);
  };

  useEffect(() => {
    getConfig();

    // setData({ ...d });
    console.log("nepal" + data?.fb_appId);
    console.log("ok    " + logged);
    // var e = localStorage.getItem("email");
    console.log(loggeddata);
    if (!logged) {
      navigate("../../", { replace: true });
    }
  }, [logged]);

  const postData = async (values) => {
    toast("Configuring....");

    setLoad(true);
    const data = await axios.post(
      "http://192.168.10.104:3000/v1/api/config/postConfig",
      {
        fb_appId: values.fbappId,
        u_id: loggeddata?.u_gid,
        fb_access: values.fbaccesstoken,
      }
    );
    console.log(values);
    toast.success("Configured Successfully");

    setLoad(false);
  };
  return (
    <div
      style={{
        position: "absolute",
        width: "80%",
        height: "100%",
        top: 0,
      }}
    >
      <div>
        <p
          style={{
            color: "black",
            fontFamily: "Poppins",
            fontWeight: "700",
            fontSize: 26,
            marginLeft: 20,
            marginTop: 50,
          }}
        >
          Add Your Configurations
        </p>
      </div>

      <div
        style={{
          marginTop: 60,
        }}
      >
        <Formik
          enableReinitialize={true}
          initialValues={{
            fbappId: appId,
            fbaccesstoken: fbaccesstoken,
          }}
          validationSchema={validation}
          onSubmit={(values, { setSubmitting }) => {
            postData(values);
          }}
        >
          {({
            values,
            errors,
            setSubmitting,
            touched,
            setValues,
            handleFilesChange,
            handleChange,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <>
              <p
                style={{
                  color: "black",
                  fontFamily: "Poppins",
                  fontWeight: "700",
                  fontSize: 20,
                  marginLeft: 20,
                  marginTop: 30,
                }}
              >
                Facebook
              </p>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  marginLeft: 20,
                  flexDirection: "row",
                  justifyContent: "",
                  marginTop: 20,
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Fb App Id"
                  type={"text"}
                  name="fbappId"
                  value={appId}
                  onChange={handleChange}
                  variant="outlined"
                  style={{}}
                />{" "}
                <p
                  style={{
                    color: "white",
                  }}
                >
                  {" "}
                  {errors.fbappId && touched.fbappId && errors.fbappId}
                </p>
                <TextField
                  id="outlined-basic"
                  label="Fb Access Token"
                  type={"text"}
                  style={{
                    marginLeft: 20,
                  }}
                  name="fbaccesstoken"
                  onChange={handleChange}
                  value={fbaccesstoken}
                  variant="outlined"
                />{" "}
                {/* <TextField
                id="outlined-basic"
                label="Fb App Id"
                type={"text"}
                name="title"
                //   value={values.title}
                variant="outlined"
                style={{}}
              />{" "} */}
                <button
                  style={{
                    marginLeft: 20,
                    alignItems: "center", // <-- the magic
                  }}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>{" "}
                {load ? <Dots /> : null}
              </div>
              <p
                style={{
                  color: "black",
                  fontFamily: "Poppins",
                  fontWeight: "700",
                  fontSize: 20,
                  marginLeft: 20,
                  marginTop: 30,
                }}
              >
                Twitter
              </p>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  marginLeft: 20,
                  flexDirection: "row",
                  justifyContent: "",
                  marginTop: 20,
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Twitter App Id"
                  type={"text"}
                  name="fbappId"
                  initialValues={values.fbappId}
                  onChange={handleChange}
                  variant="outlined"
                  style={{}}
                />{" "}
                <p
                  style={{
                    color: "white",
                  }}
                >
                  {" "}
                  {errors.fbappId && touched.fbappId && errors.fbappId}
                </p>
                <TextField
                  id="outlined-basic"
                  label="Twitter Access Token"
                  type={"text"}
                  style={{
                    marginLeft: 20,
                  }}
                  name="fbaccesstoken"
                  onChange={handleChange}
                  initialValues={values.fbaccesstoken}
                  variant="outlined"
                />{" "}
                {/* <TextField
                id="outlined-basic"
                label="Fb App Id"
                type={"text"}
                name="title"
                //   value={values.title}
                variant="outlined"
                style={{}}
              />{" "} */}
                <button
                  style={{
                    marginLeft: 20,
                    alignItems: "center", // <-- the magic
                  }}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>{" "}
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default addConfig;
