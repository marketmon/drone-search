"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface ContentFeedbackWidgetProps {
  contentType: string;
  contentSection?: string;
}

export function ContentFeedbackWidget({ contentType, contentSection }: ContentFeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showMarketScoutingOffer, setShowMarketScoutingOffer] = useState(false);
  const [formData, setFormData] = useState({
    what_is_missing: "",
    what_is_inaccurate: "",
    additional_context: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Log for demo purposes
    console.log('Content feedback submitted:', {
      content_type: contentType,
      content_section: contentSection,
      ...formData
    });
    setSubmitted(true);
    setShowMarketScoutingOffer(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-black hover:bg-gray-800 text-white border-2 border-black rounded-none font-mono text-xs tracking-wider transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]"
          size="lg"
        >
          WHAT'S MISSING?
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md text-black">
      <Card className="border-2 border-black bg-white rounded-none shadow-lg">
        {showMarketScoutingOffer ? (
          <div className="p-6">
            <div className="border-b-2 border-black pb-3 mb-4">
              <span className="text-xs font-mono tracking-wider text-gray-600">THANK YOU</span>
              <h3 className="text-lg font-bold tracking-tight mt-1">Feedback Received</h3>
            </div>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              Your feedback helps us improve this content. Would you be interested in sharing
              information about your USV needs or requirements?
            </p>
            <div className="space-y-3">
              <Link href="/market-scouting">
                <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-none border-2 border-black font-mono text-xs tracking-wider transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]">
                  YES, SHARE MY REQUIREMENTS
                </Button>
              </Link>
              <Button
                onClick={() => {
                  setIsOpen(false);
                  setSubmitted(false);
                  setShowMarketScoutingOffer(false);
                  setFormData({ what_is_missing: "", what_is_inaccurate: "", additional_context: "" });
                }}
                className="w-full bg-white text-black hover:bg-gray-50 rounded-none border-2 border-black font-mono text-xs tracking-wider transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]"
              >
                NO THANKS
              </Button>
            </div>
          </div>
        ) : submitted ? (
          <div className="p-6">
            <div className="border-b-2 border-black pb-3 mb-3">
              <span className="text-xs font-mono tracking-wider text-gray-600">SUBMITTING...</span>
            </div>
            <p className="text-sm text-gray-700">Processing your feedback...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 text-black">
            <div className="border-b-2 border-black pb-3 mb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono tracking-wider text-gray-600">HELP US IMPROVE</span>
                <h3 className="text-lg font-bold tracking-tight">What's missing from this content?</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-black hover:bg-gray-100 w-8 h-8 flex items-center justify-center border-2 border-black font-mono"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="what_is_missing" className="block text-sm font-bold mb-2 tracking-tight">
                  What companies, information, or details are missing?
                </label>
                <textarea
                  id="what_is_missing"
                  name="what_is_missing"
                  value={formData.what_is_missing}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 text-sm bg-white border-2 border-gray-300 text-black focus:outline-none focus:border-black rounded-none"
                  placeholder="e.g., Missing XYZ company, need more detail on..."
                />
              </div>

              <div>
                <label htmlFor="what_is_inaccurate" className="block text-sm font-bold mb-2 tracking-tight">
                  What's inaccurate or needs correction? (optional)
                </label>
                <textarea
                  id="what_is_inaccurate"
                  name="what_is_inaccurate"
                  value={formData.what_is_inaccurate}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 text-sm bg-white border-2 border-gray-300 text-black focus:outline-none focus:border-black rounded-none"
                  placeholder="e.g., Company ABC is actually focused on..."
                />
              </div>

              <div>
                <label htmlFor="additional_context" className="block text-sm font-bold mb-2 tracking-tight">
                  Additional context (optional)
                </label>
                <textarea
                  id="additional_context"
                  name="additional_context"
                  value={formData.additional_context}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 text-sm bg-white border-2 border-gray-300 text-black focus:outline-none focus:border-black rounded-none"
                  placeholder="Your organization, expertise level, etc."
                />
              </div>
            </div>

            <div className="mt-5">
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 rounded-none border-2 border-black font-mono text-xs tracking-wider transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]"
              >
                SUBMIT FEEDBACK
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
