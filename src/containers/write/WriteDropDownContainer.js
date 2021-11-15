import React from "react";
import { useContext } from "react";
import WriteDropDown from "../../components/write/WriteDropDown";
import PostContext from "../../context/PostContext";
import codemgmt from "../../modules/codemgmt";
function WriteDropDownContainer() {
  
  const { postInfo, setPostInfo } = useContext(PostContext);
  const options = codemgmt.category;

  const onChangeDropDown =(payload) =>{
    
    setPostInfo({
      ...postInfo,
      category: payload,
    });
  }
  return <WriteDropDown options={options} onChangeDropDown={onChangeDropDown} defaultOption ={postInfo.category}/>;
}

export default WriteDropDownContainer;
