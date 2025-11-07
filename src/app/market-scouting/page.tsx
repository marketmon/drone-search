"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function MarketScouting() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    technologyAreas: [] as string[],
    needType: "",
    specificNeed: "",
    timeline: "",
    organizationName: "",
    contactName: "",
    contactEmail: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 4;

  const technologyOptions = [
    { id: "unmanned-surface", label: "Unmanned Surface Vehicles" },
    { id: "unmanned-aerial", label: "Unmanned Aerial Systems" },
    { id: "unmanned-underwater", label: "Unmanned Underwater Vehicles" },
    { id: "autonomous-ground", label: "Autonomous Ground Vehicles" },
    { id: "ai-ml", label: "AI/ML Systems" },
    { id: "sensors-isr", label: "Sensors & ISR" },
    { id: "communications", label: "Communications Systems" },
    { id: "cyber-ew", label: "Cyber & Electronic Warfare" },
    { id: "energy-power", label: "Energy & Power Systems" },
    { id: "other", label: "Other Technology" }
  ];

  const needTypeOptions = [
    { id: "buying", label: "Buying/Procuring", description: "Looking to acquire systems or components" },
    { id: "partnering", label: "Partnership", description: "Seeking technology or business partners" },
    { id: "selling", label: "Offering Solutions", description: "Have capabilities to offer" },
    { id: "market-intel", label: "Market Intelligence", description: "Understanding the landscape" },
    { id: "investment", label: "Investment Opportunity", description: "Looking to invest or fund" },
    { id: "research", label: "Research/Development", description: "Academic or R&D collaboration" }
  ];

  const timelineOptions = [
    { id: "immediate", label: "Immediate", sublabel: "0-3 months" },
    { id: "near-term", label: "Near Term", sublabel: "3-6 months" },
    { id: "mid-term", label: "Mid Term", sublabel: "6-12 months" },
    { id: "long-term", label: "Long Term", sublabel: "1+ years" },
    { id: "exploring", label: "Just Exploring", sublabel: "No timeline" }
  ];

  const handleSubmit = () => {
    console.log('Needs assessment submitted:', formData);
    setSubmitted(true);
  };

  const toggleTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologyAreas: formData.technologyAreas.includes(tech)
        ? formData.technologyAreas.filter(t => t !== tech)
        : [...formData.technologyAreas, tech]
    });
  };

  const canProgress = () => {
    switch (step) {
      case 1:
        return formData.technologyAreas.length > 0;
      case 2:
        return formData.needType !== "";
      case 3:
        return formData.timeline !== "";
      case 4:
        return formData.organizationName && formData.contactName && formData.contactEmail;
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
            <h1 className="text-4xl font-bold tracking-tight">THANK YOU!</h1>
          </div>
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">
            We've received your needs assessment and will be in touch soon to discuss how we can help.
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
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/markets" className="font-mono text-xs tracking-wider text-gray-600 hover:text-black transition-colors">
              ← MARKETS
            </Link>
            <Link href="/" className="font-mono text-xs tracking-wider text-gray-600 hover:text-black transition-colors">
              HOME
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="border-2 border-black bg-white p-8 mb-8">
          <div className="border-b-2 border-black pb-4 mb-4">
            <span className="text-xs font-mono tracking-wider text-gray-600">QUICK ASSESSMENT</span>
            <h1 className="text-4xl font-bold tracking-tight mt-2">TELL US WHAT YOU NEED</h1>
          </div>
          <p className="text-gray-700 leading-relaxed">
            A quick 4-step assessment to help us understand your needs and connect you with the right solutions.
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
          {/* Step 1: Technology Areas */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">What technology areas are you interested in?</h2>
                <p className="text-sm text-gray-600">Select all that apply</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {technologyOptions.map((tech) => (
                  <div
                    key={tech.id}
                    onClick={() => toggleTechnology(tech.id)}
                    className={`p-4 border-2 cursor-pointer transition-all hover:scale-105 ${formData.technologyAreas.includes(tech.id)
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-black hover:border-black"
                      }`}
                  >
                    <div className="text-sm font-bold">{tech.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Need Type */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">What best describes your need?</h2>
                <p className="text-sm text-gray-600">Select one</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {needTypeOptions.map((need) => (
                  <div
                    key={need.id}
                    onClick={() => setFormData({ ...formData, needType: need.id })}
                    className={`p-6 border-2 cursor-pointer transition-all hover:scale-105 ${formData.needType === need.id
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-black hover:border-black"
                      }`}
                  >
                    <div className="font-bold text-lg mb-2">{need.label}</div>
                    <div className={`text-sm ${formData.needType === need.id ? "text-gray-200" : "text-gray-600"}`}>
                      {need.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Timeline & Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">What's your timeline?</h2>
                <p className="text-sm text-gray-600">When are you looking to move forward?</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {timelineOptions.map((time) => (
                  <div
                    key={time.id}
                    onClick={() => setFormData({ ...formData, timeline: time.id })}
                    className={`p-4 border-2 cursor-pointer transition-all hover:scale-105 ${formData.timeline === time.id
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

              <div className="pt-6 border-t-2 border-gray-200">
                <label htmlFor="specificNeed" className="block text-sm font-bold mb-2">
                  Tell us more about what you're looking for
                </label>
                <textarea
                  id="specificNeed"
                  name="specificNeed"
                  value={formData.specificNeed}
                  onChange={(e) => setFormData({ ...formData, specificNeed: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-black focus:outline-none focus:border-black rounded-none"
                  placeholder="Any specific requirements, constraints, or details that would help us understand your needs better..."
                />
              </div>
            </div>
          )}

          {/* Step 4: Contact Info */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">How can we reach you?</h2>
                <p className="text-sm text-gray-600">Just a few quick details so we can follow up</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="organizationName" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                    ORGANIZATION NAME *
                  </label>
                  <Input
                    id="organizationName"
                    name="organizationName"
                    type="text"
                    required
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    className="bg-white border-2 border-gray-300 text-black rounded-none focus:ring-0 focus:border-black"
                    placeholder="Your organization"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactName" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                      YOUR NAME *
                    </label>
                    <Input
                      id="contactName"
                      name="contactName"
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="bg-white border-2 border-gray-300 text-black rounded-none focus:ring-0 focus:border-black"
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                      EMAIL *
                    </label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="bg-white border-2 border-gray-300 text-black rounded-none focus:ring-0 focus:border-black"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-gray-200">
                  <p className="text-xs text-gray-600 font-mono">
                    Your information is confidential and will only be used to connect you with relevant solutions.
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
                SUBMIT
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
