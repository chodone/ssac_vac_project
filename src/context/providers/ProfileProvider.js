import { useState } from "react";
import { AiFillZhihuCircle } from "react-icons/ai";
import AuthContext from "../AuthContext";
import ProfileContext from "../ProfileContext";

const ProfileProvider = ({ children }) => {
  const [profileInfo, setProfileInfo] = useState({
    gender: 1,
    inoInfo:[
      {
        degree:1,
        type : "AZ",
        inoDate : "2021-10-15"
      },
      {
        degree:2,
        type : "AZ",
        inoDate : "2021-10-30"
      }
  ],
    imgURL: "www.naver.com",
    bDay: "1996-08-19"
  });

  return (
    <ProfileContext.Provider
      value={{
        profileInfo,
        setProfileInfo,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;