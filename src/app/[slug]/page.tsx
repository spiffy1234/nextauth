"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Slug({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  const [author, setAuthor] = useState("");

  useEffect(() => {
    getPost(params.slug);
  }, []);

  async function getPost(slug: string) {
    try {
      const res = await axios.get(`api/${slug}`);

      if (res.data.success) {
        setPost(res.data.post);
        setAuthor(res.data.author);
      }
    } catch (error: any) {
      console.log("something went wrong");
    }
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>{author}</p>
    </div>
  );
}
