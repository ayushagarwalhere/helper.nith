import React from "react";
import { BentoTilt } from "./Features.jsx";

export default function LoginPage() {
  const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:1234');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:1234') + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      alert('Logged in as ' + data.user.email);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div id="login" className="flex items-center justify-center bg-gradient-to-b from-sky-200 to-white min-h-[80vh] w-[90vw] rounded-xl">
      {/* Card with bento tilt animation */}
      <BentoTilt className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-lg">

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
          Sign in with college email
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Sign in using your college email address
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="College Email ID"
              name="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-sky-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-black text-white py-2 font-medium hover:bg-gray-800 transition"
          >
            Get Started
          </button>
        </form>

      </BentoTilt>
    </div>
  );
}
