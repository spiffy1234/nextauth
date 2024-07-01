import { connect } from "@/src/DBConfiguration/dbConfig";
import Post from "@/src/models/postModel";
import { NextRequest } from "next/server";
import toast from "react-hot-toast";

connect();

//Reading a post of specified id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await Post.findById(params.id);

    if (!post) {
      return Response.json({ error: "No post with the id" }, { status: 400 });
    }

    return Response.json(
      { post, msg: " posts found", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// Update post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, body } = await request.json();
    const id = params.id;

    const updatedPost = await Post.findByIdAndUpdate(id, { title, body });

    if (!updatedPost) {
      return Response.json({ error: "Not updated" }, { status: 400 });
    }

    return Response.json(
      { updatedPost, msg: "Post updated successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

//Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return Response.json({ error: "Not Deleted" }, { status: 400 });
    }

    return Response.json(
      { deletedPost, msg: "Deleted successfully", success: true },
      { status: 200 }
    );
    
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
