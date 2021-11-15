import React, { useContext } from "react";
import { useState } from "react";
import EditProfile from "../../../components/auth/profile/EditProfile";
import AuthContext from "../../../context/AuthContext";
import ProfileContext from "../../../context/ProfileContext";
import client from "../../../libs/api/_client";


function EditProfileContainer() {
  const [profileImg, setProfileImg] = useState({
    imgBase64: "",
    imgFile: null,
    imgURL: "",
  });
  const {authInfo , setAuthInfo} = useContext(AuthContext)
  const {profileInfo, setProfileInfo} = useContext(ProfileContext)
  

  const onClickAvatar = async (e) => {
    const imageFile = e.target.files[0];
    const imgBase64 = URL.createObjectURL(imageFile);
    setProfileImg({
      ...profileImg,
      imgBase64: imgBase64,
      imgFile: imageFile,
    });
    const formData = new FormData()
    formData.append("img",imageFile)

    try {
      const response = await client.put('/auth/profileimg', formData, {
        header: { "Content-type": "multipart/form-data" },
      })
  
      if(response.status === 200) {
        const result = response.data.imgUrl
        setProfileInfo({
          ...profileInfo,
          imgURL:result
        })
      }
      
    } catch (error) {
      
      
      
    }

    

  };

  const onChangeDropDown = (payload) => {
    console.log(payload);
    
  };

  const onChangeCalender = (date) => {
    console.log(date)
  };

  const onChangeSelect = (e) => {
    const {name,value} = e.target

    // setInoInfo({
    //   ...inoInfo,
    //   [name] : value
    // })

    
    setProfileInfo({
      ...profileInfo,
      [name] : value,
    })

    
  }

  return (
    <EditProfile
      onChangeDropDown={onChangeDropDown}
      profileImg={profileImg}
      onClickAvatar={onClickAvatar}
      onChangeCalender={onChangeCalender}
      onChangeSelect = {onChangeSelect}
      authInfo = {authInfo}
      
    />
  );
}

export default EditProfileContainer;