import React from "react";
import { BentoTilt } from "./Features.jsx";

export default function SignUpPage() {
  const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:1234');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value;
    const collegeEmail = form.collegeEmail.value;
    const rollNumber = form.rollNumber.value;
    const branch = form.branch.value;
    const password = form.password.value;
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:1234') + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email: collegeEmail, rollNumber, branch, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      alert('Registered ' + data.user.email);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-pink-200 to-white min-h-[80vh] w-[90vw] rounded-xl">
      {/* Card with bento tilt animation */}
      <BentoTilt className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-lg">

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
          Sign up with college details
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Create your account using your college information.
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="College Email ID"
              name="collegeEmail"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Roll Number"
              name="rollNumber"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div>
            <select
              name="branch"
              className=" text-gray-400 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            >
              <option value="" disabled>Select Branch</option>
              <option value="CSE">Computer Science</option>
              <option value="ECE">Electronics and Communication</option>
              <option value="EE">Electrical</option>
              <option value="ME">Mechanical</option>
              <option value="DCS">Dual Computer Science</option>
              <option value="DEC">Dual Electronics & Communication</option>
              <option value="MNC">Mathematics & Scientific Computing</option>
              <option value="CE">Civil</option>
              <option value="CHE">Chemical</option>
              <option value="MS">Material Science</option>
              <option value="EP">Engineering Physics</option>
              <option value="AR">Architecture</option>
            </select>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-black text-white py-2 font-medium hover:bg-gray-800 transition"
          >
            Create Account
          </button>
        </form>

      </BentoTilt>
    </div>
  );
}


