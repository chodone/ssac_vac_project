import React, { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import AuthContext from "../../context/AuthContext";
import client from "../../libs/api/_client";

function SignInForm() {
  const history = useHistory();

  const { authInfo, setAuthInfo } = useContext(AuthContext);

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
      const response = await client.post("/auth/signin", {
        email: form.email,
        password: form.password,
      });
      console.log(response.status);
      if (response.status === 200) {
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        client.defaults.headers.common["Authorization"] = `${accessToken}`;

        const result = await client.get("/auth/profile");
        setAuthInfo({ isLoggedIn: true, userInfo: result.data.data });
        history.push("/");
      }
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 409) {
        setError("이메일 / 비밀번호를 확인해 주시기 바랍니다.");
      }
    }
  };

  return (
    <AuthForm
      type="login"
      onClickSubmit={onClickSubmit}
      form={form}
      onChangeInput={onChangeInput}
      error={error}
    />
  );
}

export default SignInForm;
