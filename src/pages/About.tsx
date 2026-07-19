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
        <section className="py-16 bg-gradient-to-br from-legal-primary/10 to-legal-primary/5 dark:bg-legal-dark/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                About LegalPromptify
              </h1>
              <p className="text-legal-secondary dark:text-legal-light/70 text-lg mb-8">
                A test-level concept exploring how AI can make legal document creation faster and more accessible.
              </p>
              <div className="flex justify-center">
                <Shield className="h-24 w-24 text-legal-primary/30 dark:text-legal-primary/20" />
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
