import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Routs/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePost, { createPostAction } from "./components/CreatePost.jsx";
import PostList, { postLoader } from "./components/PostList.jsx";
import PostListProvider from "./store/post-list-store.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <PostList />, loader: postLoader },
      {
        path: "/create-post",
        element: <CreatePost />,
        action: createPostAction,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PostListProvider>
      <RouterProvider router={router} />
    </PostListProvider>
  </StrictMode>
);
