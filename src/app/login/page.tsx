"use client";
import { useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";


export default function LoginPage() {
  let [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  let router = useRouter();

  async function loginHandler(e: any) {
    e.preventDefault();
    try {
      let res = await axios.post("/api/login", loginInfo);
      console.log(res);

      if (res.data.success) {
        toast.success("Login Sucessfully");
        router.push("/profile");
      }
    } catch (error: any) {
      console.error("Something went wrong!");
      toast.error("Login failed!");
    }
  }

  return (
    <>
      <form onSubmit={loginHandler} className={styles.login}>
        <h2>User Login</h2>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={loginInfo.email}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={loginInfo.password}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
        />
        <input type="submit" value="Login" />
        <Link href="/signup">Signup</Link>
        <Link href="/forgotpassword">forgot password?</Link>
      </form>
      <Toaster />
    </>
  );
}
