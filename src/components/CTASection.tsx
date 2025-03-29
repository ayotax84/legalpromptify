
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-legal-dark">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-legal-primary/10 to-legal-secondary/10 dark:from-legal-primary/20 dark:to-legal-secondary/20 rounded-3xl overflow-hidden relative">
          <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#2c5282" d="M41.9,-63.7C56.1,-54.5,70.4,-45.8,76.4,-33C82.5,-20.2,80.4,-3.2,75.5,11.9C70.6,27,62.8,40.2,51.9,51.3C41,62.3,27,71.2,12.1,73.5C-2.8,75.7,-18.5,71.2,-32.1,63.4C-45.7,55.6,-57.2,44.5,-65.4,30.8C-73.7,17.2,-78.7,0.9,-75.8,-13.6C-72.9,-28.1,-62.1,-40.7,-49.3,-50.4C-36.5,-60.1,-21.7,-66.8,-6.7,-57.6C8.4,-48.4,27.6,-72.9,41.9,-63.7Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="py-16 px-6 md:px-10 lg:p-16 relative z-10">
            <div className="max-w-3xl">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
                Ready to Streamline Your Legal Document Creation?
              </h2>
              <p className="text-legal-secondary dark:text-legal-light/70 text-lg mb-8">
                Join thousands of businesses and individuals who save time and money with our AI-powered legal document generator.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-legal-primary hover:bg-legal-primary/90 text-white">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-legal-primary text-legal-primary hover:bg-legal-primary/10">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
