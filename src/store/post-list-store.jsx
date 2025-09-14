import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_Initial_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }

  return newPostList;
};

// const DEFAULT_POST_LIST = [
//   {
//     id: "1",
//     title: "Going to mumbai",
//     body: "Hi frinds, Going to mumbai for vacation hope I will enjoy a lot",
//     reactions: 3,
//     userId: "",
//     tags: ["vacation", "Mumbai", "Enjoy"],
//   },
//   {
//     id: "22",
//     title: "B-Tech Completed",
//     body: "Finally college life is ended!!",
//     reactions: 7,
//     userId: "",
//     tags: ["College", "End"],
//   },
//   {
//     id: "23",
//     title: "The First Trip",
//     body: "An Incredible Experiance",
//     reactions: 2,
//     userId: "",
//     tags: ["Trip", "Travel", "Nature"],
//   },
// ];

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (userId, postTitle, postBody, reaction, tags) => {
    console.log(`${userId}, ${postTitle}, ${postBody}, ${reaction}, ${tags}`);
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reaction,
        userId: userId,
        tags: tags,
      },
    });
  };

  // For Mass Update (30 at a time)
  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_Initial_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider
      value={{
        postList: postList,
        addPost: addPost,
        deletePost: deletePost,
        addInitialPosts,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
