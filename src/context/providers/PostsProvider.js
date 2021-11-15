import { useState } from "react";
import PostsContext from "../PostsContext";

const PostsProvider = ({ children }) => {
  const [postsInfo, setPostsInfo] = useState({
    allPosts:[],
    currentPostId : ""
  });

  return (
    <PostsContext.Provider
      value={{
        postsInfo,
        setPostsInfo,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;