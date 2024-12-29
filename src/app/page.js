"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/booking");
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="h-screen flex items-center flex-col justify-center">
      <h1 className="text-2xl font-bold text-center">Welcome</h1>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
