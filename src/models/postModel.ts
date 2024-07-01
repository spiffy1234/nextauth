import mongoose, { mongo } from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Its required"],
  },
  body: {
    type: String,
    required: [true, "its must provided"],
  },
});

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;
