
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, CheckCircle } from "lucide-react";
import TrustBadge from "./TrustBadge";

const Hero: React.FC = () => {
  const popularDocuments = [
    {
      title: "NDA Agreement",
      description: "This Non-Disclosure Agreement is generated based on your inputs and customized for your specific jurisdiction."
    },
    {
      title: "Employment Contract",
      description: "This Employment Contract is generated based on your inputs and customized for your specific jurisdiction."
    },
    {
      title: "Service Agreement",
      description: "This Service Agreement is generated based on your inputs and customized for your specific jurisdiction."
    },
    {
      title: "Privacy Policy",
      description: "This Privacy Policy is generated based on your inputs and customized for your specific jurisdiction."
    },
    {
      title: "Terms of Service",
      description: "These Terms of Service are generated based on your inputs and customized for your specific jurisdiction."
    }
  ];

  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [typingKey, setTypingKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDocIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % popularDocuments.length;
        return nextIndex;
      });
      setTypingKey((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentDoc = popularDocuments[currentDocIndex];

  return (
    <section className="pt-12 md:pt-24 pb-16 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950"></div>
      <div className="absolute right-0 top-0 w-2/3 h-full z-0 opacity-20 dark:opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#2c5282" d="M47.5,-51.2C59.1,-34.8,64.8,-17.4,67.1,2.3C69.5,22,68.5,44,56.8,58.3C45.2,72.7,22.6,79.3,1.2,78C-20.3,76.8,-40.6,67.6,-53.5,53.2C-66.4,38.8,-72,19.4,-71.3,0.7C-70.6,-18,-63.7,-36,-51.3,-52.4C-38.8,-68.7,-19.4,-83.4,-0.6,-82.7C18.1,-82,36.2,-65.9,47.5,-51.2Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <div className="flex gap-2 justify-center lg:justify-start mb-5">
              <TrustBadge type="ai" />
              <TrustBadge type="verified" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              AI-Powered Legal <span className="text-legal-primary">Document Generation</span>
            </h1>
            <p className="text-lg text-legal-secondary dark:text-legal-light/90 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Create customized, legally sound documents in minutes. Our AI generates contracts and agreements tailored to your specific needs and jurisdiction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button className="bg-legal-primary hover:bg-legal-primary/90 text-white px-8 py-6 text-lg">
                Create Document
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-legal-primary text-legal-primary hover:bg-legal-primary/10 px-8 py-6 text-lg">
                Browse Templates
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0" />
                <span className="text-legal-secondary dark:text-legal-light/70">100% Legally Sound</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0" />
                <span className="text-legal-secondary dark:text-legal-light/70">Multiple Jurisdictions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0" />
                <span className="text-legal-secondary dark:text-legal-light/70">Simple Questionnaire</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0" />
                <span className="text-legal-secondary dark:text-legal-light/70">Free Basic Templates</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-legal-primary to-legal-accent/70 opacity-75 blur-sm animate-pulse"></div>
              <div className="relative legal-card bg-white dark:bg-legal-dark p-6 w-full max-w-lg transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-legal-primary dark:text-legal-accent h-6 w-6" />
                  <h3 className="font-serif font-medium text-xl">{currentDoc.title}</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-legal-secondary dark:text-legal-light/70 text-sm min-h-[40px]">
                    {currentDoc.description}
                  </p>
                  <div className="legal-input py-3 relative overflow-hidden">
                    <div key={typingKey} className="animate-typing whitespace-nowrap overflow-hidden text-legal-secondary dark:text-legal-light/70 border-r-2 border-legal-primary pr-1">
                      Generating your customized {currentDoc.title.toLowerCase()}...
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-legal-light/50 dark:bg-legal-secondary/20 rounded-full w-full"></div>
                    <div className="h-2 bg-legal-light/50 dark:bg-legal-secondary/20 rounded-full w-5/6"></div>
                    <div className="h-2 bg-legal-light/50 dark:bg-legal-secondary/20 rounded-full w-4/6"></div>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <TrustBadge type="ai" />
                  <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce-slow"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce-slow" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce-slow" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
