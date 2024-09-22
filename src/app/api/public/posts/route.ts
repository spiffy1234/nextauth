import Post from "@/src/models/postModel";
import { NextRequest } from "next/server";
import { connect } from "@/src/DBConfiguration/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const posts = await Post.find({ isPublished: true }).select(
      "_id slug body title "
    );
    if (!posts) {
      return Response.json({ error: "No post" }, { status: 400 });
    }
    return Response.json(
      { posts, msg: "Posts Sent", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
