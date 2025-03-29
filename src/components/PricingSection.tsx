
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

const PricingSection: React.FC = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for occasional document needs",
      features: [
        { name: "5 Basic Document Templates", included: true },
        { name: "Standard Clauses", included: true },
        { name: "Single Jurisdiction", included: true },
        { name: "Email Support", included: true },
        { name: "Custom Clauses", included: false },
        { name: "Multiple Jurisdictions", included: false },
        { name: "Electronic Signatures", included: false },
        { name: "API Access", included: false }
      ],
      buttonText: "Get Started",
      highlighted: false
    },
    {
      name: "Professional",
      price: "$9.99",
      period: "per month",
      description: "For individuals with ongoing legal needs",
      features: [
        { name: "All Basic Templates + Premium", included: true },
        { name: "Advanced Clauses", included: true },
        { name: "Multiple Jurisdictions", included: true },
        { name: "Priority Support", included: true },
        { name: "Custom Clauses", included: true },
        { name: "Electronic Signatures", included: true },
        { name: "Document History & Storage", included: true },
        { name: "API Access", included: false }
      ],
      buttonText: "Subscribe Now",
      highlighted: true
    },
    {
      name: "Business",
      price: "$29.99",
      period: "per month",
      description: "For businesses with complex requirements",
      features: [
        { name: "All Professional Features", included: true },
        { name: "Unlimited Templates", included: true },
        { name: "All Jurisdictions", included: true },
        { name: "Dedicated Support", included: true },
        { name: "Custom Branding", included: true },
        { name: "Team Collaboration", included: true },
        { name: "Document Analytics", included: true },
        { name: "Full API Access", included: true }
      ],
      buttonText: "Contact Sales",
      highlighted: false
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-legal-dark" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-legal-secondary dark:text-legal-light/70 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`legal-card p-6 ${plan.highlighted ? 'border-legal-primary dark:border-legal-accent border-2' : ''}`}
            >
              {plan.highlighted && (
                <div className="legal-gradient text-white text-xs font-medium py-1 px-3 rounded-full w-fit mx-auto -mt-10 mb-6">
                  Most Popular
                </div>
              )}
              <h3 className="font-serif font-medium text-2xl text-center mb-2">{plan.name}</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-legal-secondary dark:text-legal-light/70 text-sm"> {plan.period}</span>}
                <p className="text-legal-secondary dark:text-legal-light/70 mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    {feature.included ? (
                      <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0" />
                    ) : (
                      <XCircle className="text-gray-400 h-5 w-5 flex-shrink-0" />
                    )}
                    <span className={feature.included ? "text-legal-secondary dark:text-legal-light/90" : "text-gray-400"}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              <Button 
                className={plan.highlighted 
                  ? "w-full bg-legal-primary hover:bg-legal-primary/90 text-white" 
                  : "w-full bg-white text-legal-primary border border-legal-primary hover:bg-legal-primary/10 dark:bg-transparent dark:text-legal-light dark:border-legal-light/30"
                }
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
