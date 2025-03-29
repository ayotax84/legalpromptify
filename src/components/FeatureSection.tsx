
import React from "react";
import { Shield, Globe, Zap, Lock } from "lucide-react";

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-10 h-10 text-legal-primary mb-4" />,
      title: "AI-Powered Generation",
      description: "Our advanced AI technology instantly drafts legally sound documents based on your specific needs and requirements."
    },
    {
      icon: <Globe className="w-10 h-10 text-legal-primary mb-4" />,
      title: "Multi-Jurisdiction Support",
      description: "Generate documents that comply with specific country or state regulations, with support for multiple legal jurisdictions."
    },
    {
      icon: <Zap className="w-10 h-10 text-legal-primary mb-4" />,
      title: "Quick & Customizable",
      description: "Create customized legal documents in minutes, not hours, with our intuitive step-by-step document builder."
    },
    {
      icon: <Lock className="w-10 h-10 text-legal-primary mb-4" />,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We prioritize your privacy with GDPR-compliant data handling practices."
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-legal-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Powerful Features for All Your Legal Needs
          </h2>
          <p className="text-legal-secondary dark:text-legal-light/70 max-w-2xl mx-auto">
            Our AI-powered platform transforms complex legal document creation into a simple, efficient process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="legal-card p-6 text-center hover:border-legal-primary/50 transition-all duration-300"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="font-serif font-medium text-xl mb-3">{feature.title}</h3>
              <p className="text-legal-secondary dark:text-legal-light/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
