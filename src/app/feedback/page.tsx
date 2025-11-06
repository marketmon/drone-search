"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Feedback() {
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    category: "",
    description: "",
    email: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Log for demo purposes
    console.log('Company feedback submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center px-6 relative">
        {/* Grid background pattern */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="relative max-w-2xl w-full border-2 border-black bg-white p-8">
          <div className="border-b-2 border-black pb-4 mb-4">
            <span className="text-xs font-mono tracking-wider text-gray-600">SUBMISSION CONFIRMED</span>
            <h1 className="text-3xl font-bold tracking-tight mt-2">THANK YOU</h1>
          </div>
          <p className="text-gray-700 mb-6">
            We've received your submission and will review it shortly.
          </p>
          <Link href="/usv-market">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-none border-2 border-black font-mono text-xs tracking-wider transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]">
              ← BACK TO USV MARKET
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black relative">
      {/* Grid background pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/usv-market" className="font-mono text-xs tracking-wider text-gray-600 hover:text-black transition-colors">
              ← BACK TO USV MARKET
            </Link>
            <div className="flex gap-4 text-xs font-mono tracking-wider">
              <Link href="/collection" className="text-gray-600 hover:text-black transition-colors">
                MARKETS
              </Link>
              <Link href="/" className="text-gray-600 hover:text-black transition-colors">
                HOME
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative max-w-2xl mx-auto px-6 py-12">{/* Removed previous back link section */}

        <div className="border-2 border-black bg-white p-8">
          <div className="border-b-2 border-black pb-4 mb-6">
            <span className="text-xs font-mono tracking-wider text-gray-600">FEEDBACK FORM</span>
            <h1 className="text-4xl font-bold tracking-tight mt-2">SUBMIT A COMPANY</h1>
          </div>
          <p className="text-gray-700 mb-8">
            Know a USV company we should add? Fill out the form below to suggest a company for our market landscape.
          </p>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="companyName" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                  COMPANY NAME *
                </label>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="bg-white border-2 border-black text-black rounded-none focus:ring-0 focus:border-black"
                  placeholder="e.g., Maritime Robotics Inc."
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                  WEBSITE *
                </label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  required
                  value={formData.website}
                  onChange={handleChange}
                  className="bg-white border-2 border-black text-black rounded-none focus:ring-0 focus:border-black"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                  CATEGORY *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white border-2 border-black text-black focus:outline-none focus:border-black rounded-none"
                >
                  <option value="">Select a category</option>
                  <option value="primes">Primes</option>
                  <option value="shipyards">Shipyards</option>
                  <option value="small-shipbuilders">Small Shipbuilders</option>
                  <option value="startups">Startups</option>
                  <option value="legacy">Legacy Businesses</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                  DESCRIPTION *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-white border-2 border-black text-black focus:outline-none focus:border-black rounded-none"
                  placeholder="Brief description of the company and their USV capabilities..."
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                  YOUR EMAIL (OPTIONAL)
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white border-2 border-black text-black rounded-none focus:ring-0 focus:border-black"
                  placeholder="your@email.com"
                />
                <p className="text-xs text-gray-500 mt-2 font-mono">
                  We'll only use this to follow up if we have questions
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 rounded-none border-2 border-black font-mono text-xs tracking-wider transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]"
                size="lg"
              >
                SUBMIT FEEDBACK
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
