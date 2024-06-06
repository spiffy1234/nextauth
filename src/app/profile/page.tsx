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
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className={styles.body}>
      <h2>Welcome {firstname}</h2>
      <Link href={`/profile/${firstname}`} >User Details</Link>
      <button onClick={logout}>Logout</button>
      <Toaster />
    </div>
  );
}
