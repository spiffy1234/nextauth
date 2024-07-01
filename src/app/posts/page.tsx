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
};

export default function PostApp() {
  const [post, setPost] = useState<PostType>({
    _id: "",
    title: "",
    body: "",
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
          setPost({ _id: "", title: "", body: "" });
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

  return (
    <div>    
     {!editing ? (
        <form className={styles.createPost} onSubmit={createPost}>
          <h2>Create</h2>
          <div>
            <label>
              Title:
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                name="title"
              />
            </label>
          </div>
          <div>
            <label>
              Body:
              <textarea
                value={post.body}
                onChange={(e) => setPost({ ...post, body: e.target.value })}
                name="body"
              />
            </label>
          </div>
          <button type="submit">Create Post</button>
        </form>
      ) : (
        <form className={styles.createPost} onSubmit={updatePost}>
          <h2>Update</h2>
          <div>
            <label>
              Title:
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                name="title"
              />
            </label>
          </div>
          <div>
            <label>
              Body:
              <textarea
                value={post.body}
                onChange={(e) => setPost({ ...post, body: e.target.value })}
                name="body"
              />
            </label>
          </div>
          <button type="submit">Update Post</button>
        </form>
      )}
      <ul className={styles.post}>
        {postLists.map((post) => (
          <li key={post._id}>
            <div>
              <Link href={`/posts/${post._id}`}>
                <h2>{post.title}</h2>
              </Link>
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
            </div>
          </li>
        ))}
      </ul>
      <Toaster />
    </div>
  );
}
