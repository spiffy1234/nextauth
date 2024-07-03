import { connect } from "@/src/DBConfiguration/dbConfig";
import Post from "@/src/models/postModel";
import { NextRequest } from "next/server";

connect();

//Create handler  for post
export async function POST(request: NextRequest) {
  try {
    const { title, body } = await request.json();

    //Creating new Pos
    const newPost = await Post.create({ title, body });

    return Response.json(
      { newPost, success: true, msg: "Post created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

//Creating a new handler for returning post list

export async function GET() {
  try {
    const posts = await Post.find();

    if (!posts) {
      return Response.json({ error: "No posts found" }, { status: 400 });
    }

    return Response.json(
      { posts, success: true, msg: "List sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
