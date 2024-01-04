import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./LoginCard.css";
import axios from "axios";

const schema = yup
  .object()
  .shape({
    username: yup
      .string()
      .min(5, "Vui lòng nhập ít nhất 5 ký tự")
      .max(80)
      .required("Vui lòng nhập dữ liệu!"),
    password: yup
      .string()
      .min(6, "Vui lòng nhập ít nhất 6 ký tự")
      .max(20)
      .required("Vui lòng nhập dữ liệu!"),
  })
  .required();

function App() {
  const{register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    axios.post("https://dummyjson.com/auth/login", data)
      .then((response) => {
        alert(response.data.token);
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="form">
      <section>
        <div className="signin">
          <div className="content">
            <h2>Sign In</h2>
            <div className="form">
              <div className="inputBox">
                <input type="text" {...register("username")} required />{" "}
                <i>Username</i>
              </div>
              <div className="inputBox">
                <input type="password" {...register("password")} required />{" "}
<i>Password</i>
              </div>
              <div className="links">
                <a href="#">Forgot Password</a>
                <a href="#">Signup</a>
              </div>
              <div className="inputBox">
                <input type="submit" value="Login" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}

export default App;