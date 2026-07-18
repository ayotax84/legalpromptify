
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Shield, FileText, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Plan = {
  name: string;
  monthly: number | null;
  yearly: number | null;
  priceLabel?: string;
  description: string;
  icon: React.ReactNode;
  features: { name: string; included: boolean }[];
  buttonText: string;
  buttonTo: string;
  highlighted: boolean;
};

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">("monthly");

  const plans: Plan[] = [
    {
      name: "Basic",
      monthly: 0,
      yearly: 0,
      priceLabel: "Free",
      description: "Perfect for occasional document needs",
      icon: <FileText className="h-8 w-8 text-legal-primary mb-4" />,
      features: [
        { name: "5 Basic Document Templates", included: true },
        { name: "Standard Clauses", included: true },
        { name: "Single Jurisdiction", included: true },
        { name: "Email Support", included: true },
        { name: "Custom Clauses", included: false },
        { name: "Multiple Jurisdictions", included: false },
        { name: "Electronic Signatures", included: false },
        { name: "API Access", included: false },
      ],
      buttonText: "Get Started",
      buttonTo: "/sign-up",
      highlighted: false,
    },
    {
      name: "Professional",
      monthly: 9.99,
      yearly: 95.88,
      description: "For individuals with ongoing legal needs",
      icon: <Shield className="h-8 w-8 text-legal-primary mb-4" />,
      features: [
        { name: "All Basic Templates + Premium", included: true },
        { name: "Advanced Clauses", included: true },
        { name: "Multiple Jurisdictions", included: true },
        { name: "Priority Support", included: true },
        { name: "Custom Clauses", included: true },
        { name: "Electronic Signatures", included: true },
        { name: "Document History & Storage", included: true },
        { name: "API Access", included: false },
      ],
      buttonText: "Subscribe Now",
      buttonTo: "/sign-up",
      highlighted: true,
    },
    {
      name: "Business",
      monthly: 29.99,
      yearly: 287.88,
      description: "For businesses with complex requirements",
      icon: <Users className="h-8 w-8 text-legal-primary mb-4" />,
      features: [
        { name: "All Professional Features", included: true },
        { name: "Unlimited Templates", included: true },
        { name: "All Jurisdictions", included: true },
        { name: "Dedicated Support", included: true },
        { name: "Custom Branding", included: true },
        { name: "Team Collaboration", included: true },
        { name: "Document Analytics", included: true },
        { name: "Full API Access", included: true },
      ],
      buttonText: "Contact Sales",
      buttonTo: "/about",
      highlighted: false,
    },
  ];

  const formatPrice = (plan: Plan) => {
    if (plan.priceLabel) return plan.priceLabel;
    const value = billingCycle === "monthly" ? plan.monthly : plan.yearly;
    return `$${value?.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-legal-dark dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-legal-primary font-medium text-sm uppercase tracking-wider mb-2 block">
                Pricing
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-legal-secondary dark:text-legal-light/70 max-w-2xl mx-auto">
                Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime.
              </p>

              <div className="mt-8 flex justify-center">
                <Tabs
                  value={billingCycle}
                  onValueChange={(v) => setBillingCycle(v as "monthly" | "yearly")}
                >
                  <TabsList>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">
                      Yearly
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-legal-accent text-legal-dark">
                        Save 20%
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`legal-card p-8 relative transition-all duration-300 hover:shadow-xl ${
                    plan.highlighted
                      ? "border-legal-primary dark:border-legal-accent border-2 transform hover:-translate-y-1"
                      : "transform hover:-translate-y-1"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 legal-gradient text-white text-xs font-medium py-1 px-3 rounded-full w-fit">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center">
                    {plan.icon}
                    <h3 className="font-serif font-medium text-2xl mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{formatPrice(plan)}</span>
                      {!plan.priceLabel && (
                        <span className="text-legal-secondary dark:text-legal-light/70 text-sm">
                          {" "}
                          / {billingCycle === "monthly" ? "month" : "year"}
                        </span>
                      )}
                      <p className="text-legal-secondary dark:text-legal-light/70 mt-2">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        {feature.included ? (
                          <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0" />
                        ) : (
                          <XCircle className="text-gray-400 h-5 w-5 flex-shrink-0" />
                        )}
                        <span
                          className={
                            feature.included
                              ? "text-legal-secondary dark:text-legal-light/90"
                              : "text-gray-400"
                          }
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full py-6 ${
                      plan.highlighted
                        ? "bg-legal-primary hover:bg-legal-primary/90 text-white"
                        : "bg-white text-legal-primary border border-legal-primary hover:bg-legal-primary/10 dark:bg-transparent dark:text-legal-light dark:border-legal-light/30"
                    }`}
                  >
                    <Link to={plan.buttonTo}>{plan.buttonText}</Link>
                  </Button>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-20 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6 text-left">
                <div className="legal-card p-6">
                  <h3 className="font-medium text-lg mb-2">Can I change plans later?</h3>
                  <p className="text-legal-secondary dark:text-legal-light/70">
                    Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be prorated.
                  </p>
                </div>
                <div className="legal-card p-6">
                  <h3 className="font-medium text-lg mb-2">What payment methods do you accept?</h3>
                  <p className="text-legal-secondary dark:text-legal-light/70">
                    We accept all major credit cards including Visa, Mastercard, American Express, and Discover, as well as PayPal.
                  </p>
                </div>
                <div className="legal-card p-6">
                  <h3 className="font-medium text-lg mb-2">Are the documents legally binding?</h3>
                  <p className="text-legal-secondary dark:text-legal-light/70">
                    Yes, all templates are created by legal professionals and are designed to be legally binding in their supported jurisdictions. For complex matters, we recommend consulting with a lawyer.
                  </p>
                </div>
                <div className="legal-card p-6">
                  <h3 className="font-medium text-lg mb-2">Can I cancel anytime?</h3>
                  <p className="text-legal-secondary dark:text-legal-light/70">
                    Absolutely. No long-term contracts or cancellation fees — cancel from your account settings at any time.
                  </p>
                </div>
              </div>

              <div className="mt-10 p-8 legal-card">
                <h3 className="font-medium text-lg mb-2">Need a custom plan?</h3>
                <p className="text-legal-secondary dark:text-legal-light/70 mb-4">
                  Contact our sales team for a tailored solution that meets your specific requirements.
                </p>
                <Button asChild className="bg-legal-primary hover:bg-legal-primary/90 text-white">
                  <Link to="/about">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
