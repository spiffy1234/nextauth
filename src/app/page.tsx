"use client";
import styles from "./app.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>Welcome to Home</h1>
      <p>
        <Link href="/posts">Click here Vlog</Link>
      </p>
    </div>
  );
}
