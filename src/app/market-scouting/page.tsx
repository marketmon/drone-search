"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function MarketScouting() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    buildingWhat: "",
    challenges: [] as string[],
    specificComponents: "",
    timeline: "",
    contactName: "",
    contactEmail: "",
    organizationName: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 2;

  const challengeOptions = [
    { id: "sourcing", label: "Sourcing Components", description: "Finding the right parts & suppliers" },
    { id: "integration", label: "System Integration", description: "Getting different systems to work together" },
    { id: "testing", label: "Testing & Validation", description: "Proving it works at scale" },
    { id: "supply-chain", label: "Supply Chain Issues", description: "Lead times, reliability, logistics" },
    { id: "technical-specs", label: "Technical Specifications", description: "Understanding requirements & standards" },
    { id: "partners", label: "Finding Partners", description: "Need collaborators or vendors" },
    { id: "timeline", label: "Speed to Deployment", description: "Need to move faster" },
    { id: "other", label: "Something Else", description: "Other technical challenges" }
  ];

  const timelineOptions = [
    { id: "immediate", label: "Now", sublabel: "0-3 months" },
    { id: "near-term", label: "Soon", sublabel: "3-6 months" },
    { id: "mid-term", label: "This Year", sublabel: "6-12 months" },
    { id: "exploring", label: "Exploring", sublabel: "No rush" }
  ];

  const handleSubmit = () => {
    console.log('Needs assessment submitted:', formData);
    setSubmitted(true);
  };

  const toggleChallenge = (challenge: string) => {
    setFormData({
      ...formData,
      challenges: formData.challenges.includes(challenge)
        ? formData.challenges.filter(c => c !== challenge)
        : [...formData.challenges, challenge]
    });
  };

  const canProgress = () => {
    switch (step) {
      case 1:
        return formData.buildingWhat.trim() !== "" && formData.challenges.length > 0;
      case 2:
        return formData.contactName && formData.contactEmail && formData.organizationName;
      default:
        return false;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center px-6 relative">
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="relative max-w-2xl w-full border-2 border-black bg-white p-12 text-center">
          <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-green-600" />
          <div className="border-b-2 border-black pb-4 mb-6">
            <h1 className="text-4xl font-bold tracking-tight">We'll be in touch!</h1>
          </div>
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">
            Thanks for sharing what you're working on. We'll reach out soon to see how Scale Forge can help you build faster.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/markets">
              <Button className="bg-black text-white hover:bg-gray-800 rounded-none border-2 border-black font-mono text-xs tracking-wider transition-all">
                ← BACK TO MARKETS
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black relative">
      {/* Wave background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-scouting" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 25 10, 50 20 T 100 20" fill="none" stroke="#3b82f630" strokeWidth="1.5"/>
              <path d="M0 25 Q 25 15, 50 25 T 100 25" fill="none" stroke="#3b82f620" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-scouting)"/>
        </svg>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <Link href="/" className="font-mono text-[10px] sm:text-xs tracking-wider text-gray-600 hover:text-black transition-colors whitespace-nowrap">
              ← NEW MARITIME HUB
            </Link>
            <div className="flex gap-2 sm:gap-4 items-center flex-wrap text-[10px] sm:text-xs font-mono tracking-wider">
              <Link href="/about" className="text-gray-600 hover:text-black transition-colors">
                ABOUT
              </Link>
              <Link href="/usv-market" className="text-gray-600 hover:text-black transition-colors whitespace-nowrap">
                MARKET DATABASE
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="border-2 border-black bg-white p-8 mb-8">
          <div className="border-b-2 border-black pb-4 mb-4">
            <span className="text-xs font-mono tracking-wider text-gray-600">FOR ENGINEERS</span>
            <h1 className="text-4xl font-bold tracking-tight mt-2">Build Tech Faster</h1>
          </div>
          <p className="text-gray-700 leading-relaxed mb-3">
            Tell us what you're building and what's slowing you down. We'll connect you with the resources, suppliers, and partners to help you ship faster.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            All submissions remain confidential and internal to your organization—never shared externally.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-mono text-gray-600">STEP {step} OF {totalSteps}</span>
            <span className="text-xs font-mono text-gray-600">{Math.round((step / totalSteps) * 100)}% COMPLETE</span>
          </div>
          <div className="h-2 bg-gray-200 border-2 border-black">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <div className="border-2 border-black bg-white p-8">
          {/* Step 1: What are you building + Challenges */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">What are you building?</h2>
                <p className="text-sm text-gray-600">Give us the high level</p>
              </div>
              <div>
                <textarea
                  id="buildingWhat"
                  name="buildingWhat"
                  value={formData.buildingWhat}
                  onChange={(e) => setFormData({ ...formData, buildingWhat: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-black focus:outline-none focus:border-black rounded-none"
                  placeholder="e.g., A ruggedized sensor platform for maritime operations... An autonomous ground vehicle for logistics... A custom flight controller..."
                  required
                />
              </div>

              <div className="pt-4 border-t-2 border-gray-200">
                <h2 className="text-2xl font-bold tracking-tight mb-2">What's slowing you down?</h2>
                <p className="text-sm text-gray-600 mb-4">Select all that apply</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challengeOptions.map((challenge) => (
                    <div
                      key={challenge.id}
                      onClick={() => toggleChallenge(challenge.id)}
                      className={`p-4 border-2 cursor-pointer transition-all hover:scale-[1.02] ${formData.challenges.includes(challenge.id)
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-black hover:border-black"
                        }`}
                    >
                      <div className="font-bold text-sm mb-1">{challenge.label}</div>
                      <div className={`text-xs ${formData.challenges.includes(challenge.id) ? "text-gray-200" : "text-gray-600"}`}>
                        {challenge.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t-2 border-gray-200">
                <label htmlFor="timeline" className="block text-sm font-bold mb-3">
                  When do you need this?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {timelineOptions.map((time) => (
                    <div
                      key={time.id}
                      onClick={() => setFormData({ ...formData, timeline: time.id })}
                      className={`p-3 border-2 cursor-pointer transition-all hover:scale-105 ${formData.timeline === time.id
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-black hover:border-black"
                        }`}
                    >
                      <div className="font-bold text-sm mb-1">{time.label}</div>
                      <div className={`text-xs ${formData.timeline === time.id ? "text-gray-200" : "text-gray-600"}`}>
                        {time.sublabel}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t-2 border-gray-200">
                <label htmlFor="specificComponents" className="block text-sm font-bold mb-2">
                  Specific components or capabilities needed? (optional)
                </label>
                <p className="text-xs text-gray-600 mb-2">List any specific parts, systems, materials, or technical requirements</p>
                <textarea
                  id="specificComponents"
                  name="specificComponents"
                  value={formData.specificComponents}
                  onChange={(e) => setFormData({ ...formData, specificComponents: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-black focus:outline-none focus:border-black rounded-none resize-none"
                  placeholder="e.g., Need ruggedized IMU sensors with <0.1° accuracy, MIL-STD-810 certified... Looking for LiDAR units with 100m+ range... Custom carbon fiber enclosures..."
                />
              </div>
            </div>
          )}

          {/* Step 2: Contact Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">Let's connect</h2>
                <p className="text-sm text-gray-600">We'll reach out to understand your needs better and see how we can help</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-bold mb-2">
                      Your Name
                    </label>
                    <Input
                      id="contactName"
                      name="contactName"
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="bg-white border-2 border-gray-300 text-black rounded-none focus:ring-0 focus:border-black"
                      placeholder="First Last"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-bold mb-2">
                      Email
                    </label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="bg-white border-2 border-gray-300 text-black rounded-none focus:ring-0 focus:border-black"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="organizationName" className="block text-sm font-bold mb-2">
                    Company / Organization
                  </label>
                  <Input
                    id="organizationName"
                    name="organizationName"
                    type="text"
                    required
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    className="bg-white border-2 border-gray-300 text-black rounded-none focus:ring-0 focus:border-black"
                    placeholder="Acme Corp"
                  />
                </div>

                <div className="pt-4 border-t-2 border-gray-200">
                  <p className="text-xs text-gray-600">
                    We respect your privacy. Your information will only be used to connect you with relevant resources.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 border-t-2 border-black mt-8">
            <Button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="bg-white text-black hover:bg-gray-100 rounded-none border-2 border-black font-mono text-xs tracking-wider disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              BACK
            </Button>

            {step < totalSteps ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProgress()}
                className="bg-black text-white hover:bg-gray-800 rounded-none border-2 border-black font-mono text-xs tracking-wider disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:translate-x-1"
              >
                NEXT
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProgress()}
                className="bg-green-600 text-white hover:bg-green-700 rounded-none border-2 border-green-600 font-mono text-xs tracking-wider disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:translate-x-1 px-8"
              >
                LET'S BUILD
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
