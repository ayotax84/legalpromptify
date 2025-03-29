
import React from "react";
import { Link } from "react-router-dom";
import DocumentCard from "./DocumentCard";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Briefcase, 
  Users, 
  Home, 
  ShieldCheck, 
  GraduationCap, 
  Share2, 
  Pencil, 
  ArrowRight
} from "lucide-react";

const DocumentCategories: React.FC = () => {
  const documents = [
    {
      title: "Non-Disclosure Agreement",
      description: "Protect your confidential information when sharing with partners, employees, or clients.",
      time: "5 min",
      icon: <ShieldCheck size={24} />,
      to: "/generator/nda",
      isVerified: true
    },
    {
      title: "Employment Contract",
      description: "Create a comprehensive employment agreement for your new hires.",
      time: "10 min",
      icon: <Briefcase size={24} />,
      to: "/generator/employment",
      isVerified: true
    },
    {
      title: "Service Agreement",
      description: "Define the terms for professional services between you and your clients.",
      time: "8 min",
      icon: <Pencil size={24} />,
      to: "/generator/service",
      isVerified: true
    },
    {
      title: "Rental Agreement",
      description: "Establish clear terms for property rental between landlord and tenant.",
      time: "12 min",
      icon: <Home size={24} />,
      to: "/generator/rental",
      isVerified: false
    },
    {
      title: "Partnership Agreement",
      description: "Define the terms of your business partnership and protect all parties.",
      time: "15 min",
      icon: <Users size={24} />,
      to: "/generator/partnership",
      isVerified: false
    },
    {
      title: "Software License",
      description: "Specify how your software can be used, distributed, and modified.",
      time: "7 min",
      icon: <Share2 size={24} />,
      to: "/generator/software-license",
      isVerified: true
    }
  ];

  return (
    <section className="py-16 bg-legal-light/30 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Popular Legal Document Templates
          </h2>
          <p className="text-legal-secondary dark:text-legal-light/70 max-w-2xl mx-auto">
            Choose from our collection of professionally crafted templates, customizable to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {documents.map((doc, index) => (
            <DocumentCard
              key={index}
              title={doc.title}
              description={doc.description}
              time={doc.time}
              icon={doc.icon}
              to={doc.to}
              isVerified={doc.isVerified}
            />
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-legal-primary text-legal-primary hover:bg-legal-primary/10"
          >
            View All Templates
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DocumentCategories;
