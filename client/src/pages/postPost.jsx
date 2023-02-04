import React, { useEffect, useState, useRef, useContext } from "react";
import People from "../assets/people.svg";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import * as Yup from "yup";
// import { TwitterApi } from "twitter-api-v2";
import axios from "axios";
import { OAuth } from "oauth";
import instance from "../config/upload";
const validation = Yup.object().shape({
  title: Yup.string()
    .min(2, "Title is Too Short!")

    .required("Title is Required"),
  description: Yup.string()
    .min(2, "Description Too Short!")
    .required("Description is Required"),
});
// const oath = new OAuth({
//   consumer_key: "FlLWeyJcuv8dvsmUCWkgSA0ss",
//   consumer_secret: "1NrGSKF6V0eKri3ZP2Cy8WbZMReY5pffE19MTqsemoLh8Wynfy",
//   access_token: "1573135956072271874-SmB0hV9bfPRQsZFLFcT8nEtkA2O9o6",
//   access_token_secret: "m7F31kj7dTBS2K9wQwh2LYgwhcGUrEAgiq6Se5PQdvR3C",
// });

const PostPost = () => {
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
      return imgUrl;
    } catch (err) {
      console.log("Error uploading image");
    } finally {
      console.log("what happen i dont know");
    }
  };

  const PostinFb = (values) => {
    const pageid = 113303321359395;

    const access_token =
      "EABgQ9NNoaXcBAJaWiwO9ip3FlRwklfjrfuPrAAOOWPXGDXyZBJLV4tQyl773KzOt8PuNBROU9aPmSNGTL26M8RW2K7YgPZC48hjcmEsllm3U3JKNi1Xn257ZAli6IyO01F4xNPJ9iSgQ4HoMRnsduKVf8IgLKsp1JND5lOj8dsUNFf3cD8xZAyNworZCwxoKY4nT5KSXxf8YYeZBEgQ1o7SCTNLNzxjoMZD";
    console.log(values.title);
    const url =
      "https://graph.facebook.com/" +
      pageid +
      "/photos?url=" +
      values.image +
      "&message=" +
      values.title +
      "  " +
      values.description +
      "&access_token=" +
      access_token;
    console.log(url);
    const res = axios.post(url);

    console.log(res);

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
            margin: 20,
            flex: 0.1,
            display: "flex",
            color: "black",
          }}
        >
          <p
            style={{
              fontFamily: "Poppins",
              fontSize: 20,
            }}
          >
            {" "}
            Please Enters the details Correctly.
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
              PostinFb(values);
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
                  justifyContent: "space-evenly",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
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
                  style={{
                    alignSelf: "center",
                  }}
                />
                <img
                  src={People}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 20,
                    alignSelf: "center",
                  }}
                />

                <button
                  style={{
                    alignItems: "center", // <-- the magic
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
