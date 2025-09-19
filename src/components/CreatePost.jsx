import { Form, redirect, useNavigate } from "react-router-dom";

const CreatePost = () => {
  // const { addPost } = useContext(PostList);

  const handleSubmit = (event) => {};

  return (
    <Form method="POST" className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter your User ID
        </label>
        <input
          type="text"
          className="form-control"
          id="userId"
          name="userId"
          placeholder="User ID"
          aria-describedby="emailHelp"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          placeholder="How are you felling today.."
          aria-describedby="emailHelp"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          rows="4"
          type="text"
          className="form-control"
          id="body"
          name="body"
          placeholder="Enter your content here.."
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reaction" className="form-label">
          Number of reactions
        </label>
        <input
          type="text"
          className="form-control"
          id="reactions"
          name="reactions"
          placeholder="How many people reacted to this post"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here
        </label>
        <input
          type="text"
          className="form-control"
          id="tags"
          name="tags"
          placeholder="please enter your tags using space"
          aria-describedby="emailHelp"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        post
      </button>
    </Form>
  );
};

export async function createPostAction(data) {
  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData); //Shortcut to get data from From
  postData.tags = postData.tags.split(" ");
  console.log(postData);
  fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .then((resObj) => {
      console.log(resObj);
    });
  return redirect("/");
}
export default CreatePost;
