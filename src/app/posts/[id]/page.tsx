"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./id.module.css";

export default function PostDetails({ params }: { params: { id: string } }) {
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    getPost(params.id);
  }, []);

  async function getPost(id: string) {
    try {
      let res = await axios.get(`/api/posts/${id}`);
      if (res.data.success) {
        setPost(res.data.post);
      }
    } catch (error: any) {
      console.log("Wrong");
    }
  }
  return (
    <div className={styles.list}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <Link href="/posts">Explore other posts</Link>
    </div>
  );
}
