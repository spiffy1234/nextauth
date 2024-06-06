"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  let [token, setToken] = useState("");
  let [verified, setVerified] = useState(false);
  let [error, setError] = useState(false);

  async function verifyUserEmail() {
    try {
      let res = await axios.post("/api/verifyemail", { token: token });
      // if (res.data.success) {
      setVerified(true);
      // }
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    let urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      <h2>Verify Email</h2>
      <h3>{token ? `${token}` : "no token available"}</h3>
      {verified && (
        <div>
          <h2>Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error:Email Verification</h2>
        </div>
      )}
    </div>
  );
}
