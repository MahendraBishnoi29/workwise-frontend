"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.token) {
        Cookies.set("token", data.token);
        Cookies.set("userEmail", data.email);
        toast.success(data.message);
        router.push("/booking");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/booking");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-black mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full text-gray-700 rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block  text-gray-700 w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
