"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DemoButton } from "@/components/ui/demo-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SupplierApplicationData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  components: string;
  productionCapacity: string;
  certifications: string;
  location: string;
  ndaaStatus: string;
}

export function DroneForgeEvaluation() {
  const [applicationData, setApplicationData] = useState<SupplierApplicationData>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    components: "",
    productionCapacity: "",
    certifications: "",
    location: "",
    ndaaStatus: ""
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const evaluationSteps = [
    {
      title: "Initial Application Review",
      description: "Comprehensive evaluation of company credentials, certifications, and product portfolio",
    },
    {
      title: "On-Site Quality Audit",
      description: "DroneForge engineers conduct thorough facility inspections and process verification",
    },
    {
      title: "Production Scaling Assessment",
      description: "Evaluate manufacturing capacity, supply chain resilience, and ability to meet volume requirements",
    },
    {
      title: "NDAA Compliance Verification",
      description: "Complete review of supply chain, final assembly location, and regulatory compliance",
    },
    {
      title: "Marketplace Listing Approval",
      description: "Final approval and integration into DroneForge marketplace with verified supplier status",
    }
  ];

  const qualityAssurances = [
    "On-site facility inspections by certified engineers",
    "Production capacity verification with volume testing",
    "Supply chain transparency and traceability audits",
    "Quality management system compliance verification",
    "Continuous monitoring and periodic re-evaluations"
  ];

  const handleInputChange = (field: keyof SupplierApplicationData, value: string) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Supplier Application Submitted:", applicationData);
    setDialogOpen(false);
    // Reset form
    setApplicationData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      components: "",
      productionCapacity: "",
      certifications: "",
      location: "",
      ndaaStatus: ""
    });
  };

  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8">
            DroneForge Supplier Evaluation
          </h2>
          <div className="max-w-4xl">
            <p className="text-xl text-white mb-6">
              Rigorous quality assurance through on-site visits and production scaling verification.
            </p>
            <p className="text-lg text-gray-300">
              Every supplier undergoes comprehensive evaluation before marketplace listing.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-4xl font-bold text-white mb-8">Evaluation Process</h3>
            <div className="space-y-4">
              {evaluationSteps.map((step, index) => (
                <div key={index} className="border border-white p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-white text-xl font-bold">{step.title}</h4>
                    </div>
                  </div>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-white mb-8">Quality Guarantees</h3>
            <div className="space-y-4 mb-8">
              {qualityAssurances.map((assurance, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">{assurance}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 border border-gray-800 p-6">
              <h4 className="text-xl font-bold text-white mb-3">Ready to Apply?</h4>
              <p className="text-gray-300 mb-4">
                Join our verified supplier network. Submit your application for comprehensive evaluation.
              </p>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <DemoButton className="w-full">
                    Apply to List Your Components
                  </DemoButton>
                </DialogTrigger>
                <DialogContent className="bg-black border-gray-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white">
                      Supplier Application
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Complete this application to begin the DroneForge evaluation process for marketplace listing.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                        <Input
                          value={applicationData.companyName}
                          onChange={(e) => handleInputChange("companyName", e.target.value)}
                          className="bg-gray-900 border-gray-700 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Contact Name</label>
                        <Input
                          value={applicationData.contactName}
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
                          value={applicationData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-gray-900 border-gray-700 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                        <Input
                          type="tel"
                          value={applicationData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="bg-gray-900 border-gray-700 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Company Website</label>
                      <Input
                        type="url"
                        value={applicationData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        className="bg-gray-900 border-gray-700 text-white"
                        placeholder="https://"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Manufacturing Location</label>
                      <Input
                        value={applicationData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="bg-gray-900 border-gray-700 text-white"
                        placeholder="City, State/Country"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">NDAA Compliance Status</label>
                      <select
                        value={applicationData.ndaaStatus}
                        onChange={(e) => handleInputChange("ndaaStatus", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white"
                        required
                      >
                        <option value="">Select status...</option>
                        <option value="compliant">Fully NDAA Compliant</option>
                        <option value="transitioning">Transitioning to Compliance</option>
                        <option value="not-compliant">Not Currently Compliant</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Components Manufactured</label>
                      <textarea
                        value={applicationData.components}
                        onChange={(e) => handleInputChange("components", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white h-20"
                        placeholder="List the drone components you manufacture (flight controllers, frames, motors, etc.)"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Production Capacity</label>
                      <Input
                        value={applicationData.productionCapacity}
                        onChange={(e) => handleInputChange("productionCapacity", e.target.value)}
                        className="bg-gray-900 border-gray-700 text-white"
                        placeholder="e.g., 50,000 units/month"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Certifications</label>
                      <textarea
                        value={applicationData.certifications}
                        onChange={(e) => handleInputChange("certifications", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white h-16"
                        placeholder="ISO 9001, AS9100, CMMC, etc."
                        required
                      />
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
                        Submit Application
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gray-900 border border-gray-800 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Evaluation Criteria
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Quality Systems</h4>
                <p className="text-gray-300 text-sm">ISO certifications, quality processes, and documentation standards</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Production Scale</h4>
                <p className="text-gray-300 text-sm">Manufacturing capacity, equipment capabilities, and scalability potential</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Supply Chain</h4>
                <p className="text-gray-300 text-sm">Component sourcing, traceability, and NDAA compliance verification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}