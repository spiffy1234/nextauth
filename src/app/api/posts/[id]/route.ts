import { connect } from "@/src/DBConfiguration/dbConfig";
import Post from "@/src/models/postModel";
import { NextRequest } from "next/server";
import User from "@/src/models/userModel";
import { getIdFromToken } from "@/src/helpers/getIdFromToken";
import { generateSlug } from "@/src/helpers/generateSlug";
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

    const user = await User.findById(post.userId);
    const author = `${user.firstname} ${user.lastname}`;

    return Response.json(
      { post, author, msg: " posts found", success: true },
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

    const slug = await generateSlug(title);
    const updatedPost = await Post.findByIdAndUpdate(id, { title, body, slug });

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

// Publish post
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const userId = await getIdFromToken(request);
    const post = await Post.findById(id).select("userId");

    if (post.userId == userId) {
      const post = await Post.findById(id);

      if (!post) {
        return Response.json({ error: "No post found" }, { status: 400 });
      }

      post.isPublished = true;
      const publishedPost = await post.save();

      if (!publishedPost) {
        return Response.json({ error: "Not published " }, { status: 400 });
      }

      return Response.json(
        { publishedPost, msg: "Publish", success: true },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
