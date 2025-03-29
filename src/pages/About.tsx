import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Scale, Users, BookOpen, ArrowRight, Award, Heart, Lightbulb } from "lucide-react";

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former corporate attorney with 15+ years of experience at top law firms. Sarah founded LegalPromptify to democratize legal services.",
      image: "https://randomuser.me/api/portraits/women/23.jpg"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Tech innovator with background in AI and document automation. Michael leads our technology team in developing our AI legal engine.",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      name: "Elena Rodriguez",
      role: "Legal Content Director",
      bio: "Specialized in contract law with a focus on international business. Elena ensures all templates meet the highest legal standards.",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

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
                Our Mission
              </h1>
              <p className="text-legal-secondary dark:text-legal-light/70 text-lg mb-8">
                We're making legal protection accessible to everyone through technology.
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
                Our Story
              </h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  LegalPromptify was founded in 2021 with a simple but powerful idea: 
                  legal services should be affordable, accessible, and easy to understand for everyone. 
                  Our founders, Sarah Johnson and Michael Chen, came from different worlds—law and technology—but 
                  shared a frustration with the traditional legal system.
                </p>
                <p>
                  Sarah, a corporate attorney with over 15 years of experience, had seen countless clients 
                  struggle with expensive legal fees for relatively straightforward documents. Michael, a 
                  software engineer specializing in AI, believed that technology could transform the legal industry.
                </p>
                <p>
                  Together, they created LegalPromptify to bridge the gap between expensive legal services and 
                  risky DIY solutions. By combining AI technology with legal expertise, we've developed a platform 
                  that generates high-quality legal documents tailored to your specific needs, at a fraction of the cost.
                </p>
                <p>
                  Today, LegalPromptify serves thousands of businesses and individuals across the globe, 
                  helping them protect their interests with properly drafted legal documents. Our team has 
                  grown to include legal experts across various specialties, ensuring our templates are accurate 
                  and up-to-date with current laws.
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

        {/* Awards Section */}
        <section className="py-16 bg-legal-light/30 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl font-semibold mb-4">
                Recognition & Awards
              </h2>
              <p className="text-legal-secondary dark:text-legal-light/70">
                Our commitment to excellence has been recognized
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-legal-dark p-6 rounded-lg text-center">
                <Award className="h-12 w-12 text-legal-accent mx-auto mb-4" />
                <h3 className="font-medium mb-2">Legal Tech Innovator 2023</h3>
                <p className="text-legal-secondary dark:text-legal-light/70 text-sm">
                  Awarded by the American Bar Association
                </p>
              </div>
              
              <div className="bg-white dark:bg-legal-dark p-6 rounded-lg text-center">
                <Award className="h-12 w-12 text-legal-accent mx-auto mb-4" />
                <h3 className="font-medium mb-2">Best Legal Document Service</h3>
                <p className="text-legal-secondary dark:text-legal-light/70 text-sm">
                  Consumer Choice Awards 2022
                </p>
              </div>
              
              <div className="bg-white dark:bg-legal-dark p-6 rounded-lg text-center">
                <Award className="h-12 w-12 text-legal-accent mx-auto mb-4" />
                <h3 className="font-medium mb-2">Top 10 Legal Tech Startups</h3>
                <p className="text-legal-secondary dark:text-legal-light/70 text-sm">
                  Legal Business Magazine 2022
                </p>
              </div>
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
              <Button className="bg-legal-primary hover:bg-legal-primary/90 text-white">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
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
