import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Its required"],
  },
  body: {
    type: String,
    required: [true, "its must provided"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  slug: {
    type: String,
    unique: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;
