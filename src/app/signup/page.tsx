"use client";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    mobile: "",
  });

  const router = useRouter();

  function handleChange(e: any) {
    let { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  async function signupHandler(e: any) {
    e.preventDefault();
    try {
      let res = await axios.post("/api/signup", userInfo);
      if (res.data.success) {
        await toast.success("Signup successful");
        await router.push("/login");
      }
      console.log(res.data);
    } catch (error: any) {
      console.log("error");
      await toast.error("Signup failed");
    }
  }

  return (
    <>
      <form onSubmit={signupHandler} className={styles.contact}>
        <h2>Create Username</h2>
        <hr />
        <label className={styles.firstname} htmlFor="firstname">
          First Name
          <input
            type="text"
            placeholder="First Name"
            id="firstname"
            name="firstname"
            onChange={handleChange}
            value={userInfo.firstname}
          />
        </label>
        <label className={styles.lastname} htmlFor="lastname">
          Last Name
          <input
            type="text"
            placeholder="Last Name"
            id="lastname"
            name="lastname"
            value={userInfo.lastname}
            onChange={handleChange}
          />
        </label>
        <label className={styles.email} htmlFor="email">
          Email
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
        </label>
        <label className={styles.password} htmlFor="password">
          Password
          <input
            type="text"
            placeholder="Password"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
        </label>
        <label className={styles.confirmpassword} htmlFor="confirmpassword">
          Confirm Password
          <input
            type="text"
            placeholder="Confirm Password"
            id="confirmpassword"
            name="confirmpassword"
            value={userInfo.confirmpassword}
            onChange={handleChange}
          />
        </label>
        <label className={styles.mobileno} htmlFor="mobile">
          Mobile
          <input
            type="text"
            placeholder="Mobile"
            id="mobile"
            name="mobile"
            value={userInfo.mobile}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="submit" />
        <input type="reset" value="Reset" />
      </form>
      <Toaster />
    </>
  );
}
