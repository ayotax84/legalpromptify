import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, Scale, Users, ArrowRight, Heart, Lightbulb } from "lucide-react";

const About: React.FC = () => {

  const values = [
    {
      title: "Accessibility",
      description: "We believe legal services should be accessible to everyone, not just those who can afford expensive legal consultations.",
      icon: <Users className="h-6 w-6 text-legal-primary" />
    },
    {
      title: "Accuracy",
      description: "All our templates are crafted by experienced attorneys and regularly updated to reflect the latest legal developments.",
      icon: <Scale className="h-6 w-6 text-legal-primary" />
    },
    {
      title: "Transparency",
      description: "We're committed to clear, straightforward pricing and honest communication about our services and limitations.",
      icon: <Heart className="h-6 w-6 text-legal-primary" />
    },
    {
      title: "Innovation",
      description: "We continuously explore new technologies to improve our platform and provide better legal solutions.",
      icon: <Lightbulb className="h-6 w-6 text-legal-primary" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-legal-ink text-white overflow-hidden">
          {/* Ambient glow */}
          <div className="about-hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none" />

          {/* Technical grid */}
          <div className="about-hero-grid absolute inset-0 pointer-events-none" />

          {/* Corner frame accents */}
          <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-legal-secondary/30" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-legal-secondary/30" />

          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Refined Shield Icon */}
              <div className="mb-10 md:mb-12 inline-flex items-center justify-center relative animate-fade-in">
                <div className="absolute inset-0 bg-legal-primary/30 blur-2xl rounded-full" />
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-b from-legal-secondary to-legal-dark rounded-2xl border border-legal-secondary/50 flex items-center justify-center shadow-2xl backdrop-blur-sm">
                  <Shield className="w-10 h-10 md:w-12 md:h-12 text-legal-primary/90 drop-shadow-[0_0_8px_rgba(44,82,130,0.5)]" />
                </div>
                {/* Decorative technical lines */}
                <div className="absolute -left-10 md:-left-12 top-1/2 w-8 h-px bg-gradient-to-r from-transparent to-legal-primary/50" />
                <div className="absolute -right-10 md:-right-12 top-1/2 w-8 h-px bg-gradient-to-l from-transparent to-legal-primary/50" />
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-legal-light mb-6 md:mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                About <span className="italic font-normal">LegalPromptify</span>
              </h1>

              {/* Subtitle */}
              <div className="max-w-2xl mx-auto space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <p className="text-base md:text-lg lg:text-xl text-legal-secondary/80 leading-relaxed font-light tracking-wide">
                  A test-level concept exploring how AI can make legal document creation faster, more accessible, and more precise.
                </p>

                {/* Decorative Accent */}
                <div className="flex justify-center pt-4 md:pt-6">
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-legal-secondary/50 to-transparent" />
                </div>

                {/* Tech Stats / Tags */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-2">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-legal-secondary/60 mb-1">Concept</span>
                    <span className="text-legal-light font-medium text-sm md:text-base">Taha Benbrahim</span>
                  </div>
                  <div className="w-px h-8 bg-legal-secondary/30" />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-legal-secondary/60 mb-1">Status</span>
                    <span className="text-legal-light font-medium text-sm md:text-base">Experimental</span>
                  </div>
                  <div className="w-px h-8 bg-legal-secondary/30" />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-legal-secondary/60 mb-1">Method</span>
                    <span className="text-legal-light font-medium text-sm md:text-base">AI-Powered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white dark:bg-legal-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl font-semibold mb-6 text-center">
                The Idea Behind It
              </h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  LegalPromptify is a test-level idea built to explore how AI can help people generate 
                  legal documents without expensive consultations or complex legal software. It is not a 
                  fully launched law firm, legal service, or substitute for professional legal advice.
                </p>
                <p>
                  The project is being developed by Taha Benbrahim, who is behind the concept, design, 
                  and technical direction. The goal is to experiment with AI-powered contract generation, 
                  jurisdiction-aware templates, and a clean user experience that makes legal paperwork 
                  feel less intimidating.
                </p>
                <p>
                  While the platform generates structured documents and guides users through common legal 
                  scenarios, it remains an experimental product. Any document produced should be reviewed by 
                  a qualified attorney before it is used in a real legal or business situation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-legal-light/30 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl font-semibold mb-4">
                Our Core Values
              </h2>
              <p className="text-legal-secondary dark:text-legal-light/70">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-white dark:bg-legal-dark/80 rounded-full p-3 mr-4">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium mb-2">{value.title}</h3>
                    <p className="text-legal-secondary dark:text-legal-light/70">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white dark:bg-legal-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-semibold mb-4">
                Join Us in Our Mission
              </h2>
              <p className="text-legal-secondary dark:text-legal-light/70 mb-8">
                Experience the future of legal document creation today.
              </p>
              <Button className="bg-legal-primary hover:bg-legal-primary/90 text-white" asChild>
                <Link to="/templates">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
