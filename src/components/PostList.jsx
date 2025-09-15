import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, fetching } = useContext(PostListData);

  return (
    <>
      {fetching === true && <LoadingSpinner />}
      {!fetching === true && postList.length === 0 && <WelcomeMessage />}
      {!fetching === true &&
        postList.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
    </>
  );
};

export default PostList;
