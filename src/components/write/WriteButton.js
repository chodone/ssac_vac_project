import React, { useContext, useState } from "react";
import styled from "styled-components";
import ButtonComponent from "../common/ButtonComponent";
import palette from "../../libs/styles/palette";
import { BsPlusLg } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import PostContext from "../../context/PostContext";
import client from "../../libs/api/_client";
import AuthContext from "../../context/AuthContext";

const StyledButton = styled(ButtonComponent)`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${palette.cyan[5]};
  position: fixed;
  bottom: 2rem;
  right: 2rem;

  &:hover {
    background-color: ${palette.cyan[4]};
  }
`;

const StyledIcon = styled(BsPlusLg)`
  font-size: 2rem;
  vertical-align: bottom;
`;

function WriteButton() {
  const history = useHistory();
  const {authInfo , setAuthInfo} = useContext(AuthContext);
  const checkAuth = async () => {
    try {
      const loggedIn = authInfo.isLoggedIn;
      if (!loggedIn) {
        window.alert("로그인 후 이용해주세요");
      } else {
        const verifiedUser = authInfo.userInfo.verified;
        if (verifiedUser) {
          history.push("/write");
        } else {
          window.alert("추가정보를 입력하세요");
          history.push("/edit/profile");
        }
      }
    } catch (error) {
      window.alert("Error");
    }
  };

  return (
    <StyledButton onClick={(checkAuth)}>
      <StyledIcon />
    </StyledButton>
  );
}

export default WriteButton;
