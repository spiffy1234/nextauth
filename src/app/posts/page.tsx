"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import styles from "./style.module.css";

type PostType = {
  _id: string;
  title: string;
  body: string;
  isPublished: boolean;
};

export default function PostApp() {
  const [post, setPost] = useState<PostType>({
    _id: "",
    title: "",
    body: "",
    isPublished: false,
  });

  const [postLists, setPostLists] = useState<Array<PostType>>([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getAllPosts();
  }, []);

  async function getAllPosts() {
    try {
      const res = await axios.get("/api/posts");
      if (res.data.success) {
        setPostLists(res.data.posts);
      }
    } catch (error: any) {
      console.log("Something went wrong");
    }
  }

  async function createPost(e: any) {
    e.preventDefault();
    try {
      if (post.title && post.body) {
        const res = await axios.post("/api/posts", post);
        if (res.data.success) {
          setPost({ _id: "", title: "", body: "", isPublished: false });
          await getAllPosts();
          toast.success(res.data.msg);
        }
      }
    } catch (error: any) {
      toast.error("Cannot create post");
    }
  }

  function editPost(postData: PostType) {
    setPost(postData);
    setEditing(true);
  }

  async function updatePost(e: any) {
    e.preventDefault();

    try {
      let res = await axios.put(`/api/posts/${post._id}`, post);
      if (res.data.success) {
        toast.success(res.data.msg);
        setPost({
          _id: "",
          title: "",
          body: "",
          isPublished: false,
        });
        setEditing(false);
        await getAllPosts();
      }
    } catch (error: any) {
      toast.error("Cannot update post");
    }
  }

  async function deletePost(id: string) {
    try {
      let res = await axios.delete(`/api/posts/${id}`);
      if (res.data.success) {
        toast.success(res.data.msg);
        await getAllPosts();
      }
    } catch (error: any) {
      toast.error("Cannot deleted this post");
    }
  }

  async function publishPost(id: string) {
    try {
      const res = await axios.patch(`/api/posts/${id}`);

      if (res.data.success) {
        toast.success(res.data.msg);
        await getAllPosts();
      }
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className={styles.post}>
      <div className={styles.form}>
        {!editing ? (
          <form onSubmit={createPost}>
            <h2>Create</h2>
            <div>
              Title:
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                name="title"
              />
            </div>
            <div>
              Body:
              <textarea
                rows={8}
                cols={50}
                value={post.body}
                onChange={(e) => setPost({ ...post, body: e.target.value })}
                name="body"
              />
            </div>
            <button type="submit">Create Post</button>
          </form>
        ) : (
          <form onSubmit={updatePost}>
            <h2>Update</h2>

            <div>
              Title:
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                name="title"
              />
            </div>

            <div>
              Body:
              <textarea
                rows={8}
                cols={50}
                value={post.body}
                onChange={(e) => setPost({ ...post, body: e.target.value })}
                name="body"
              />
            </div>
            <button type="submit">Update Post</button>
          </form>
        )}
      </div>
      <table className={styles.list}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {postLists.map((post) => (
            <tr key={post._id}>
              <td>
                <Link href={`/posts/${post._id}`}>{post.title}</Link>
              </td>
              <td>
                <button
                  onClick={() => publishPost(post._id)}
                  disabled={post.isPublished || false}
                  className={post.isPublished ? styles.published : ""}
                >
                  {post.isPublished ? "Published" : "Publish Now"}
                </button>

                <button
                  onClick={() => {
                    editPost(post);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deletePost(post._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
}
