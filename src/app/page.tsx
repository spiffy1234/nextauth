"use client";
import styles from "./app.module.css";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { messaging } from "@/src/firebase";
import { getToken } from "firebase/messaging";
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
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      //Generate token
      const token = getToken(messaging, {
        vapidKey:
          "BIS82CFxhmlwVTZijMcfvQ2YqV24fWOYqvuzhBAcumb-YJCHIIwp9X-pBrVb_wfh0lNcwnUYpFENTEArFUDPcEA",
      });
      console.log("Token generate", token);
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
    try {
      const res = await axios.get("/api/public/posts");
      if (res.data.success) {
        setListStore(res.data.posts);
      }
    } catch (error: any) {
      console.log("Something went wrong");
    }
  }
  async function permission() {}

  return (
    <div className={styles.home}>
      <h1>Blog</h1>
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
