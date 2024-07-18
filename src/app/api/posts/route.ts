import { connect } from "@/src/DBConfiguration/dbConfig";
import { getIdFromToken } from "@/src/helpers/getIdFromToken";
import Post from "@/src/models/postModel";
import { NextRequest } from "next/server";
import { generateSlug } from "@/src/helpers/generateSlug";

connect();

//Create handler  for post
export async function POST(request: NextRequest) {
  try {
    const userId = await getIdFromToken(request);
    const { title, body } = await request.json();

    //Creating new Post
    const newPost = await Post.create({
      title,
      body,
      userId,
      slug: generateSlug(title),
    });

    return Response.json(
      { newPost, success: true, msg: "Post created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

//Creating a new handler for returning post list

export async function GET(request: NextRequest) {
  try {
    const userId = await getIdFromToken(request);
    const posts = await Post.find({ userId });

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
