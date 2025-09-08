"use client";

import Image from "next/image";
import Link from "next/link";
import "./page.css";

export default function Home() {
  return (
    <div className="container">
      <div>
        <div className="content-overlay">
          <Image
            className="notif-image"
            src="/notif.png"
            alt="Notification"
            width={600}
            height={400}
            priority
          />
        </div>
        <Image
          id="heroImage"
          className="hero-image"
          src="/hero.webp"
          alt="Hero Image"
          width={800}
          height={600}
          priority
        />
      </div>

      <div className="button-container">
        <Link href="/login" className="get-access-btn">
          Get Access
        </Link>
      </div>
    </div>
  );
}
