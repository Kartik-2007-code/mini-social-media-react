import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListData);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    const controller = new AbortController();
    const signal = controller.signal;

    // console.log("Fetch Started");
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
        // console.log("fetch returned");
      });
    return () => {
      console.log("cleaning up effect");
      controller.abort();
    };
    // console.log("Fetch Ended");
  }, []);

  // console.log(postList);
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
