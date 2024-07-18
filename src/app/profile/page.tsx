"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Profile() {
  const [firstname, setFirstname] = useState("");

  const router = useRouter();

  useEffect(() => {
    getFirstname();
  }, []);

  async function getFirstname() {
    try {
      const res = await axios.get("/api/profile");
      if (res.data.success) {
        setFirstname(res.data.user.firstname);
        console.log(res.data.user);
      }
    } catch (error: any) {
      console.log("Something went wrong!");
    }
  }

  async function logout() {
    try {
      let res = await axios.get("/api/logout");
      if (res.data.success) {
        toast("Logged out");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className={styles.body}>
      <h2>Welcome {firstname} to our Vlog</h2>
      <button onClick={logout}>Logout</button>
      <Link href={`/profile/${firstname}`}>User Details</Link>
      <p>
        <Link href="/posts">Manage blog posts</Link>
      </p>
      <Toaster />
    </div>
  );
}
