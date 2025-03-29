
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import DocumentCategories from "@/components/DocumentCategories";
import DocumentGenerator from "@/components/DocumentGenerator";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <FeatureSection />
        <DocumentCategories />
        <DocumentGenerator />
        <HowItWorks />
        <Testimonials />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
