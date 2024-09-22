"use client";
import styles from "./app.module.css";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
type PostType = {
  _id: string;
  title: string;
  body: string;
  slug: string;
};

export default function Home() {
  let [listStore, setListStore] = useState<Array<PostType>>([]);

  useEffect(() => {
    getAllPost();
  }, []);

  async function getAllPost() {
    try {
      const res = await axios.get("/api/public/posts");
      if (res.data.success) {
        setListStore(res.data.posts);
      }
    } catch (error: any) {
      console.log("Something went wrong");
    }
  }

  return (
    <div className={styles.home}>
      <h1>Vlog</h1>
      <div>
        {listStore.map((post) => (
          <div key={post._id}>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
