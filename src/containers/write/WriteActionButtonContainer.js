import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import PostContext from "../../context/PostContext";
import client from "../../libs/api/_client"
import { ToastsStore } from "react-toasts";


import codemgmt from "../../modules/codemgmt";

const WriteActionButtonsContainer = ({ history }) => {
  const {resetPost, postInfo, setPostInfo} = useContext(PostContext)
  const [isEdit, setIsEdit] = useState(false)
  const {originalPostId} = postInfo;

  useEffect(() => {
    if (originalPostId) {
      console.log(originalPostId);
      setIsEdit(true);
      async function getData() {
        const response = await client.get(
          `/board/${postInfo.originalPostId}`
        );
        console.log(response);
        const result = response.data.data;
        const { title, content, tags, category } = result;
        console.log(category)
        const categoryWord = codemgmt.reverseCodeTable("category", category);
        console.log(categoryWord)
        setPostInfo({
          ...postInfo,
          title: title,
          body: content,
          tags: tags,
          category: categoryWord,
        });
      }
      getData();
    } else{
      setIsEdit(false)
    }



  }, [])
  
  // const dispatch = useDispatch();

  const onPublish = async (e) => {

    e.preventDefault();
    try {
      const response = await client.post("/board", {
        category : codemgmt.codeTable("category" ,postInfo.category.value),
        title : postInfo.title,
        content : postInfo.body,
        tags : postInfo.tags,
      })
      if (response.status === 200){
        ToastsStore.success("백신 경험 나눠주셔서 감사해요");
        resetPost()
      }
      
    } catch (error) {
      if (error.response.status === 409){
        window.alert(error.response.data.message)
      }else {
        console.log(error)
      }
      
    }
    history.push("/")

  };



  const onCancel = () => {
    resetPost();
    history.goBack();
  };

  const onEdit = async (e) =>{

    e.preventDefault();
    try {
      const response = await client.put(`/board/${originalPostId}`, {
        category : codemgmt.codeTable("category" ,postInfo.category),
        title : postInfo.title,
        content : postInfo.body,
        tags : postInfo.tags,
      }) 
      if (response.status === 200){
        ToastsStore.success("게시물이 수정되었습니다");
        resetPost()
      }
    } catch (error) {
      if (error.response.status === 409){
        window.alert(error.response.data.message)
      }else {
        console.log(error)
      }
      
    }
    history.push("/")




  }

  

  

  return (
    <WriteActionButtons
      isEdit={isEdit}
      onPublish={onPublish}
      onCancel={onCancel}
      onEdit = {onEdit}
    />
  );
};

export default withRouter(WriteActionButtonsContainer);
