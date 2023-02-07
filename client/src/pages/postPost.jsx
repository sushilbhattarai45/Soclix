import React, { useEffect, useState, useRef, useContext } from "react";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "react-activity/dist/library.css";
import { Dots } from "react-activity";
import axios from "axios";
import instance from "../config/upload";
const validation = Yup.object().shape({
  title: Yup.string()
    .min(2, "Title is Too Short!")

    .required("Title is Required"),
  description: Yup.string()
    .min(2, "Description Too Short!")
    .required("Description is Required"),
});

import { ContextProvider } from "../config/context";
import { toast, Toaster } from "react-hot-toast";
import { colors } from "../tools";

const PostPost = () => {
  const [load, setLoad] = useState(false);
  const { loggeddata, logged } = useContext(ContextProvider);

  // const getConfig = async () => {
  //   console.log(loggeddata);
  //   let data = await axios.post(
  //     "http://192.168.100.11:3000/v1/api/config/getConfig",
  //     {
  //       u_id: loggeddata?.u_gid,
  //     }
  //   );
  // };

  const navigate = useNavigate();
  useEffect(() => {
    // var e = localStorage.getItem("email");
    // getConfig();
    if (!logged) {
      navigate("../../", { replace: true });
    }
  }, [logged]);

  // const tweet = (values) => {
  //   const onFinish = (err, reply) => {
  //     if (err) {
  //       console.log("Error: ", err.message);
  //     } else {
  //       console.log("Success: ", reply);
  //     }
  //   };

  //   t.post("statuses/update", { status: "ok" }, onFinish);
  // };

  const imgupload = async (event) => {
    const [file] = event.target.files;
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("pic", file);

    try {
      const { data } = await instance({
        method: "POST",
        url: "/v1/api/user/web/upload",
        data: formData,
      });

      const { msg, imgUrl } = await data;
      setImg(imgUrl);
      return imgUrl;
    } catch (err) {
      console.log("Error uploading image");
    } finally {
      console.log("what happen i dont know");
    }
  };

  const [img, setImg] = useState(null);
  const getData = async () => {
    const ldata = JSON.stringify(loggeddata);
    const data = await axios.post(
      "http://192.168.100.11:3000/v1/api/config/getConfig",
      {
        u_id: loggeddata?.u_gid,
      }
    );

    console.log("hello" + data.data.data[0]);

    return data.data.data[0];
  };

  const PostInSocial = async (values) => {
    await PostinFb(values);
    // await PostinIg(values);
  };

  const PostinIg = async (values) => {
    console.log(values.image);

    const { ig_appId, ig_access } = await getData();
    console.log(values.title);
    const url =
      "https://graph.facebook.com/" +
      ig_appId.trim() +
      "/media?image_url=" +
      values.image +
      "&caption=" +
      values.title +
      "  " +
      values.description +
      "&access_token=" +
      ig_access.trim();
    const res = await axios.post(url);

    const postid = await res.data.id;
    if (postid != null) {
      setLoad(false);
      toast.success("Posted");
    } else {
      setLoad(false);
      toast.fail("Wrong Configurations! Cannot post");
    }

    console.log(values.image);
  };

  const PostinFb = async (values) => {
    setLoad(true);
    toast("Posting");
    alert(values.image);
    console.log(values.image);

    const { fb_appId, fb_access } = await getData();
    // const pageid = 113303321359395;

    // const access_token =
    //   "EABgQ9NNoaXcBAJaWiwO9ip3FlRwklfjrfuPrAAOOWPXGDXyZBJLV4tQyl773KzOt8PuNBROU9aPmSNGTL26M8RW2K7YgPZC48hjcmEsllm3U3JKNi1Xn257ZAli6IyO01F4xNPJ9iSgQ4HoMRnsduKVf8IgLKsp1JND5lOj8dsUNFf3cD8xZAyNworZCwxoKY4nT5KSXxf8YYeZBEgQ1o7SCTNLNzxjoMZD";
    console.log(values.title);
    const url =
      "https://graph.facebook.com/" +
      fb_appId.trim() +
      "/photos?url=" +
      values.image +
      "&message=" +
      values.title +
      "  " +
      values.description +
      "&access_token=" +
      fb_access.trim();
    const res = await axios.post(url);

    const postid = await res.data.id;
    if (postid != null) {
      setLoad(false);
      toast.success("Posted");
    } else {
      setLoad(false);
      toast.fail("Wrong Configurations! Cannot post");
    }

    console.log(values.image);
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "80%",
        flex: 1,
        height: "100%",
        top: 0,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            marginTop: 20,
            marginLeft: 20,
            flex: 0.1,
            display: "flex",
            color: "black",
          }}
        >
          <p
            style={{
              color: "black",
              fontFamily: "Poppins",
              fontWeight: "700",
              fontSize: 26,
            }}
          >
            Enter the details carefully{" "}
          </p>
        </div>

        <div
          style={{
            flex: 1,

            display: "flex",
          }}
        >
          <Formik
            initialValues={{
              title: "",
              description: "",
              image: "",
            }}
            validationSchema={validation}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              PostInSocial(values);
            }}
          >
            {({
              values,
              errors,
              setSubmitting,
              touched,
              setValues,
              handleChange,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <div
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  display: "flex",
                  margin: 20,
                  flexDirection: "row",
                }}
              >
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Title"
                    type={"text"}
                    name="title"
                    initialValues={values.title}
                    onChange={handleChange}
                    //   value={values.title}
                    variant="outlined"
                    style={{}}
                  />
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    {" "}
                    {errors.title && touched.title && errors.title}
                  </p>
                  <TextField
                    multiline={true}
                    id="outlined-basic"
                    type="text"
                    name="description"
                    onChange={handleChange}
                    initialValues={values.description}
                    label="Description"
                    variant="outlined"
                    style={{
                      width: 300,
                    }}
                  />
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    {" "}
                    {errors.description &&
                      touched.description &&
                      errors.description}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginLeft: 50,
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",

                      alignItems: "center",
                    }}
                  >
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={async (val) => {
                        const url = await imgupload(val);
                        console.log("final " + url);
                        setValues({ ...values, image: url });
                      }}
                      initialValues={values.image}
                      style={{}}
                    />
                    {img ? (
                      <img
                        src={img}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 80,
                          height: 80,
                          borderRadius: 20,
                        }}
                      />
                    ) : null}
                  </div>

                  {load ? <Dots /> : null}
                </div>
                <button
                  style={{
                    alignSelf: "center",
                    backgroundColor: colors.primary,
                    color: "white",
                    padding: 20,
                    fontSize: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    marginLeft: 20,
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                  }}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PostPost;
