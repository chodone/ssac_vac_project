import React from "react";
import { useContext } from "react";
import { useState } from "react";
import {useHistory} from "react-router-dom"
import AuthForm from "../../components/auth/AuthForm";
import AuthContext from "../../context/AuthContext";
import client from "../../libs/api/_client";


function SignUpForm() {
  const history = useHistory()

  const { setAuthInfo } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickName: "",
  });

  const onChangeInput = (e) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value,
    });

  };


  const onClickSubmit = async (e) => {
    e.preventDefault();
    try {
      if(form.password !== form.passwordConfirm){
        window.alert("비밀번호를 확인해주세요")    
    } else{
        const response = await client.post("/auth/signup",{
          email: form.email,
          password: form.password,
          nickName: form.nickName
      });
      if (response.status === 200) {
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        client.defaults.headers.common["Authorization"] = `${accessToken}`;

        const result = await client.get("/auth/profile");
        setAuthInfo({ isLoggedIn: true, userInfo: result.data.data });
        history.push("/");
      }
    }
    
    } catch (error) {
      console.log(error);
        if (error.response.status === 409) {
          window.alert(error.response.data.message);
        } else {
          console.log(error);
        }
      
    }
    
  };

  return (
    <AuthForm
      onChangeInput={onChangeInput}
      onClickSubmit={onClickSubmit}
      type="register"
      error={error}
      form={form}
      
    />
  );
}

export default SignUpForm;
