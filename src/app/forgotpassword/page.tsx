"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.css";

export default function ForgotPassword() {
  let [email, setEmail] = useState("");
  let [msg, setMsg] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (email !== "") {
      try {
        let res = await axios.post("/api/forgotpassword", { email });
        if (res.data.success) {
          setMsg(res.data.msg);
        }
      } catch (error: any) {
        console.log("Something went wrong!");
        alert("Oops No email found!");
      }
    }
  }

  return (
    <div className={styles.forgotContainer}>
      {!msg ? (
        <form onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>
          <p>Enter your registered email</p>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="submit" value="send" />
        </form>
      ) : (
        msg
      )}
    </div>
  );
}
