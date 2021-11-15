import React, { useContext, useEffect } from "react";
import DetailPost from "../../components/post/DetailPost";
import PostContext from "../../context/PostContext";
import PostsContext from "../../context/PostsContext";
import client from "../../libs/api/_client";

function DetailPostContainer() {
    const { postsInfo } = useContext(PostsContext)
    const {postInfo, setPostInfo} = useContext(PostContext)
    const postId = postsInfo.currentPostId
    
    useEffect(() => {
        async function getDetailData(){
            try {
                const response = await client.get(`/board/${postId}`)
                const result = response.data.data
                
                setPostInfo({
                    ...postInfo,
                    title:result.title,
                    body: result.content,
                    tags : result.tags,
                    category : result.category,
                    originalPostId : result._id
                })
                
            } catch (error) {
                console.log(error)
                
            }
        }
       getDetailData() 
    },[])
    
    

     
    

  return <DetailPost postInfo={postInfo}/>;
}

export default DetailPostContainer;