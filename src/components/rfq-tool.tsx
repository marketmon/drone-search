"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

  const manufacturingCapabilities = [
    {
      title: "Precision Machining",
      description: "CNC machining, turning, and milling for metal components",
      demand: "High"
    },
    {
      title: "Carbon Fiber Manufacturing",
      description: "Composite structures, frames, and lightweight components",
      demand: "Critical"
    },
    {
      title: "Electronics Assembly",
      description: "PCB assembly, flight controllers, and sensor integration",
      demand: "High"
    },
    {
      title: "Injection Molding",
      description: "Plastic housings, mounts, and protective components",
      demand: "Medium"
    },
    {
      title: "Metal Fabrication",
      description: "Sheet metal work, brackets, and structural components",
      demand: "Medium"
    },
    {
      title: "Battery Systems",
      description: "Power management, charging systems, and energy storage",
      demand: "Critical"
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

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "Critical": return "bg-red-600";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8">
            US Manufacturing Opportunities
          </h2>
          <div className="max-w-4xl">
            <p className="text-xl text-white mb-6">
              Join the growing drone component manufacturing ecosystem.
            </p>
            <p className="text-lg text-gray-300">
              Submit an RFQ to connect with buyers seeking US-based manufacturing partners.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-4xl font-bold text-white mb-8">In-Demand Manufacturing Capabilities</h3>
            <div className="space-y-4">
              {manufacturingCapabilities.map((capability, index) => (
                <div key={index} className="border border-white p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white text-xl font-bold">{capability.title}</h4>
                    <div className={`${getDemandColor(capability.demand)} text-white px-2 py-1 text-sm`}>
                      {capability.demand} Demand
                    </div>
                  </div>
                  <p className="text-gray-300">{capability.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-white mb-8">Get Started</h3>

            <div className="bg-gray-900 border border-gray-800 p-6 mb-6">
              <h4 className="text-xl font-bold text-white mb-3">Why Partner With Us?</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Access to verified government and enterprise buyers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">NDAA compliance guidance and certification support</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Volume production opportunities with long-term contracts</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Technical specifications and quality requirements provided</span>
                </li>
              </ul>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-black hover:bg-gray-200 w-full text-lg py-3">
                  Submit Manufacturing RFQ
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black border-gray-800 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white">
                    Manufacturing RFQ Submission
                  </DialogTitle>
                  <DialogDescription className="text-gray-300">
                    Tell us about your manufacturing capabilities and we'll connect you with relevant opportunities.
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
                    <label className="block text-sm font-medium text-gray-300 mb-1">Manufacturing Capability</label>
                    <select
                      value={formData.componentCategory}
                      onChange={(e) => handleInputChange("componentCategory", e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white"
                      required
                    >
                      <option value="">Select capability...</option>
                      {manufacturingCapabilities.map((cap) => (
                        <option key={cap.title} value={cap.title}>{cap.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Capability Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white h-20"
                      placeholder="Describe your manufacturing capabilities, equipment, certifications, and capacity..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Production Capacity</label>
                      <Input
                        value={formData.quantity}
                        onChange={(e) => handleInputChange("quantity", e.target.value)}
                        className="bg-gray-900 border-gray-700 text-white"
                        placeholder="e.g., 10K units/month"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Lead Time</label>
                      <Input
                        value={formData.timeline}
                        onChange={(e) => handleInputChange("timeline", e.target.value)}
                        className="bg-gray-900 border-gray-700 text-white"
                        placeholder="e.g., 8-12 weeks"
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
              Active Manufacturing Requests
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-black border border-gray-700 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">Carbon Fiber Frames</h4>
                  <Badge className="bg-red-600 text-white">Urgent</Badge>
                </div>
                <p className="text-gray-300 text-sm mb-2">Quantity: 5,000 units/month</p>
                <p className="text-gray-300 text-sm">Timeline: 6 weeks</p>
              </div>
              <div className="bg-black border border-gray-700 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">Flight Controllers</h4>
                  <Badge className="bg-orange-500 text-white">High Priority</Badge>
                </div>
                <p className="text-gray-300 text-sm mb-2">Quantity: 2,000 units/month</p>
                <p className="text-gray-300 text-sm">Timeline: 8 weeks</p>
              </div>
              <div className="bg-black border border-gray-700 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">Motor Assemblies</h4>
                  <Badge className="bg-blue-500 text-white">Standard</Badge>
                </div>
                <p className="text-gray-300 text-sm mb-2">Quantity: 10,000 units/month</p>
                <p className="text-gray-300 text-sm">Timeline: 10 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}