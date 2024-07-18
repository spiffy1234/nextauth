import Post from "@/src/models/postModel";
import User from "@/src/models/userModel";
import { NextRequest } from "next/server";
import { connect } from "@/src/DBConfiguration/dbConfig";

connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: String } }
) {
  try {
    const slug = params.slug;
    const post = await Post.findOne({ slug }).select("title body userId");

    if (!post) {
      return Response.json({ error: "No post found" }, { status: 400 });
    }

    const user = await User.findById(post.userId);
    const author = `${user.firstname} ${user.lastname}`;

    return Response.json(
      { post, author, msg: "Got the post", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
