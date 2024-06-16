"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./style.module.css";
import type { Metadata } from "next";

const metadata: Metadata = {
  title: "Reset Page - Spiffy App",
};

export default function ResetPassword() {
  let [token, setToken] = useState("");
  let [changedPassword, setChangedPassword] = useState(false);
  let [error, setError] = useState(false);
  let [password, setPassword] = useState("");

  async function resetUserPassword(e: any) {
    e.preventDefault();
    try {
      if (token.length > 0 && password !== "") {
        let res = await axios.post("/api/resetpassword", { token, password });
        if (res.data.success) {
          setChangedPassword(true);
        }
      }
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    let urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className={styles.resetContainer}>
      <h2>Reset password</h2>
      <h3>{token ? `${token}` : "no token available"}</h3>
      {!changedPassword && (
        <form onSubmit={resetUserPassword}>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Set Password" />
        </form>
      )}
      {changedPassword && (
        <div>
          <h2>Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error:Password reset error</h2>
        </div>
      )}
    </div>
  );
}
