"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DemoButton } from "@/components/ui/demo-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface RFQFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  componentCategory: string;
  description: string;
  quantity: string;
  timeline: string;
}

export function RFQTool() {
  const [formData, setFormData] = useState<RFQFormData>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    componentCategory: "",
    description: "",
    quantity: "",
    timeline: ""
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const componentCategories = [
    "Flight Controller Systems",
    "Airframe & Structure",
    "Propulsion Systems",
    "Imaging & Communications",
    "Control & Telemetry",
    "Power & Energy",
    "Navigation & Sensors",
    "Custom Components"
  ];

  const popularComponents = [
    {
      title: "Flight Controllers",
      description: "Enterprise-grade processors and navigation systems",
      requests: "125+"
    },
    {
      title: "Carbon Fiber Frames",
      description: "Lightweight airframes and structural components",
      requests: "89+"
    },
    {
      title: "Propulsion Systems",
      description: "Motors, ESCs, and propeller assemblies",
      requests: "156+"
    },
    {
      title: "Imaging Systems",
      description: "Cameras, gimbals, and transmission equipment",
      requests: "67+"
    },
    {
      title: "Power Systems",
      description: "Batteries, charging systems, and power management",
      requests: "78+"
    },
    {
      title: "Navigation Sensors",
      description: "GPS, IMU, and precision positioning systems",
      requests: "45+"
    }
  ];

  const handleInputChange = (field: keyof RFQFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("RFQ Submitted:", formData);
    setDialogOpen(false);
    // Reset form
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      componentCategory: "",
      description: "",
      quantity: "",
      timeline: ""
    });
  };


  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8">
            Request Components
          </h2>
          <div className="max-w-4xl">
            <p className="text-xl text-white mb-6">
              Find NDAA-compliant components for your unmanned systems projects.
            </p>
            <p className="text-lg text-gray-300">
              Submit an RFQ to connect with verified suppliers and get competitive quotes.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-4xl font-bold text-white mb-8">Popular Component Requests</h3>
            <div className="space-y-4">
              {popularComponents.map((component, index) => (
                <div key={index} className="border border-white p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white text-xl font-bold">{component.title}</h4>
                    <div className="bg-green-600 text-white px-2 py-1 text-sm">
                      {component.requests} Requests
                    </div>
                  </div>
                  <p className="text-gray-300">{component.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-white mb-8">Get Started</h3>

            <div className="bg-gray-900 border border-gray-800 p-6 mb-6">
              <h4 className="text-xl font-bold text-white mb-3">Why Use Our RFQ System?</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Access to verified NDAA-compliant suppliers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Competitive quotes from multiple suppliers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Quality-assured components with full documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Fast response times and transparent pricing</span>
                </li>
              </ul>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <DemoButton className="w-full text-lg py-3">
                  Submit Component RFQ
                </DemoButton>
              </DialogTrigger>
              <DialogContent className="bg-black border-gray-800 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white">
                    Component RFQ Submission
                  </DialogTitle>
                  <DialogDescription className="text-gray-300">
                    Tell us about your component requirements and we'll connect you with qualified suppliers.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                      <Input
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        className="bg-gray-900 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Contact Name</label>
                      <Input
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        className="bg-gray-900 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-gray-900 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-gray-900 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Component Category</label>
                    <select
                      value={formData.componentCategory}
                      onChange={(e) => handleInputChange("componentCategory", e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white"
                      required
                    >
                      <option value="">Select component category...</option>
                      {componentCategories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Component Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white h-20"
                      placeholder="Describe your component requirements, specifications, and intended application..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Quantity Needed</label>
                      <Input
                        value={formData.quantity}
                        onChange={(e) => handleInputChange("quantity", e.target.value)}
                        className="bg-gray-900 border-gray-700 text-white"
                        placeholder="e.g., 100 units"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Timeline Required</label>
                      <Input
                        value={formData.timeline}
                        onChange={(e) => handleInputChange("timeline", e.target.value)}
                        className="bg-gray-900 border-gray-700 text-white"
                        placeholder="e.g., 6 weeks"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                      className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-white text-black hover:bg-gray-200"
                    >
                      Submit RFQ
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gray-900 border border-gray-800 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Recent Component Requests
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-black border border-gray-700 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">Carbon Fiber Frames</h4>
                  <Badge className="bg-red-600 text-white">Urgent</Badge>
                </div>
                <p className="text-gray-300 text-sm mb-2">Quantity: 50 units</p>
                <p className="text-gray-300 text-sm">Timeline: 6 weeks</p>
              </div>
              <div className="bg-black border border-gray-700 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">Flight Controllers</h4>
                  <Badge className="bg-orange-500 text-white">High Priority</Badge>
                </div>
                <p className="text-gray-300 text-sm mb-2">Quantity: 25 units</p>
                <p className="text-gray-300 text-sm">Timeline: 8 weeks</p>
              </div>
              <div className="bg-black border border-gray-700 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">Motor Assemblies</h4>
                  <Badge className="bg-blue-500 text-white">Standard</Badge>
                </div>
                <p className="text-gray-300 text-sm mb-2">Quantity: 100 units</p>
                <p className="text-gray-300 text-sm">Timeline: 10 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}