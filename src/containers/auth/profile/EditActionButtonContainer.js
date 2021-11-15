import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ToastsStore } from "react-toasts";
import EditActionButtons from "../../../components/auth/profile/EditActionButtons";
import AuthContext from "../../../context/AuthContext";
import ProfileContext from "../../../context/ProfileContext";
import client from "../../../libs/api/_client";

function EditActionButtonContainer() {
  const {authInfo, setAuthInfo} = useContext(AuthContext)
  const {profileInfo , setProfileInfo} = useContext(ProfileContext)
  const [isEdit, setIsEdit] = useState(false)
  const userId = authInfo.userInfo._id
  const history = useHistory();
  
 
  


  const onEdit = async() => {
    console.log("회원정보 수정 - router.put");
    try {
      const response = await client.put(`/auth/profile/${userId}`,{
        gender : profileInfo.gender,
        inoInfo : profileInfo.inoInfo,
        profileImg : profileInfo.imgURL,
        bDay : profileInfo.bDay

      })
      if (response.status === 200){
        const accessToken = response.data.accessToken
        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", accessToken);
        client.defaults.headers.common["Authorization"] = `${accessToken}`;

        const result = await client.get("/auth/profile");
        setAuthInfo({ isLoggedIn: true, userInfo: result.data.data });
        history.push("/");
        ToastsStore.success("회원정보 수정 완료~!")
      
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
  const onCancel = () => {
    console.log("회원정보 수정 취소 - 저장된 내용 reset & move to Home");
  };
  return <EditActionButtons onEdit={onEdit} onCancel={onCancel} />;
}

export default EditActionButtonContainer;