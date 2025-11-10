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
    company_name: "",
    company_url: "",
    description: "",
    rationale: ""
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
          className="bg-white hover:bg-gray-100 text-black border-2 border-black rounded-none font-mono text-xs tracking-wider transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]"
          size="lg"
        >
          CONTRIBUTE TO DATABASE
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md text-black">
      <Card className="border-2 border-black bg-white rounded-none shadow-lg max-h-[85vh] overflow-y-auto">
        {showMarketScoutingOffer ? (
          <div className="p-6">
            <div className="border-b-2 border-black pb-3 mb-4">
              <span className="text-xs font-mono tracking-wider text-gray-600">THANK YOU</span>
              <h3 className="text-lg font-bold tracking-tight mt-1">Submission Received</h3>
            </div>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              Your contribution will be reviewed by the Scale Forge team. Would you be interested in sharing
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
                  setFormData({ company_name: "", company_url: "", description: "", rationale: "" });
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
          <form onSubmit={handleSubmit} className="p-5 text-black">
            <div className="border-b-2 border-black pb-2.5 mb-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono tracking-wider text-gray-600">COLLABORATIVE DATABASE</span>
                <h3 className="text-lg font-bold tracking-tight">Contribute to the USV Market</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-black hover:bg-gray-100 w-8 h-8 flex items-center justify-center border-2 border-black font-mono"
              >
                ×
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              Help us build a complete picture of the USV market. Your submission will be reviewed by the Scale Forge team before being added to the database.
            </p>

            <div className="space-y-2.5">
              <div>
                <label htmlFor="company_name" className="block text-xs font-bold mb-1.5 tracking-tight">
                  Company Name
                </label>
                <Input
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border-2 border-gray-300 text-black focus:outline-none focus:border-black rounded-none"
                  placeholder="e.g., Acme Robotics"
                  required
                />
              </div>

              <div>
                <label htmlFor="company_url" className="block text-xs font-bold mb-1.5 tracking-tight">
                  Company URL
                </label>
                <Input
                  id="company_url"
                  name="company_url"
                  type="url"
                  value={formData.company_url}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-white border-2 border-gray-300 text-black focus:outline-none focus:border-black rounded-none"
                  placeholder="https://www.example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-xs font-bold mb-1.5 tracking-tight">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 text-sm bg-white border-2 border-gray-300 text-black focus:outline-none focus:border-black rounded-none resize-none"
                  placeholder="Brief description of the company's USV capabilities..."
                  required
                />
              </div>

              <div>
                <label htmlFor="rationale" className="block text-xs font-bold mb-1.5 tracking-tight">
                  Why should they be added?
                </label>
                <textarea
                  id="rationale"
                  name="rationale"
                  value={formData.rationale}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 text-sm bg-white border-2 border-gray-300 text-black focus:outline-none focus:border-black rounded-none resize-none"
                  placeholder="What makes this company relevant to the USV market landscape?"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 rounded-none border-2 border-black font-mono text-xs tracking-wider transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]"
              >
                SUBMIT FOR REVIEW
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
