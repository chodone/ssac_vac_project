import { useState } from "react";
import PostContext from "../PostContext";

const PostProvider = ({ children }) => {
  const [postInfo, setPostInfo] = useState({
    category:"",
    tags: [],
    title: "",
    body: "",
    originalPostId :"",
    writer:[]
  });

  const resetPost = () => {
    setPostInfo({
      tags: [],
      title: "",
      body: "",
      category: "",
      originalPostId: "",
      writer:[]
    });
  };

  return (
    <PostContext.Provider
      value={{
        postInfo,
        setPostInfo,
        resetPost
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
