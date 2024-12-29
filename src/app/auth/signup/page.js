"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/booking");
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/auth/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-black text-center">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Sign Up
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
