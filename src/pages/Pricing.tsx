
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = React.useState("monthly");

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small businesses",
      priceMonthly: 29,
      priceYearly: 290,
      features: [
        "5 documents per month",
        "Basic templates",
        "Email support",
        "PDF downloads",
        "1 user account"
      ],
      notIncluded: [
        "Advanced templates",
        "Priority support",
        "Multiple user accounts",
        "Custom branding",
        "API access"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      description: "Great for growing businesses and legal teams",
      priceMonthly: 79,
      priceYearly: 790,
      features: [
        "20 documents per month",
        "All templates including advanced",
        "Priority email support",
        "PDF & Word downloads",
        "Up to 5 user accounts",
        "Custom branding"
      ],
      notIncluded: [
        "Unlimited documents",
        "Dedicated account manager",
        "API access"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex needs",
      priceMonthly: 199,
      priceYearly: 1990,
      features: [
        "Unlimited documents",
        "All templates including custom",
        "24/7 priority support",
        "All file formats for download",
        "Unlimited user accounts",
        "Custom branding",
        "Dedicated account manager",
        "API access"
      ],
      notIncluded: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="py-16 bg-white dark:bg-legal-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-legal-secondary dark:text-legal-light/70 max-w-2xl mx-auto">
                Choose the plan that fits your needs. All plans include a 14-day free trial, no credit card required.
              </p>
              
              <div className="mt-8">
                <Tabs 
                  defaultValue="monthly" 
                  onValueChange={setBillingCycle}
                  className="inline-flex bg-legal-light/30 p-1 rounded-lg"
                >
                  <TabsList className="grid w-full grid-cols-2">
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
              {pricingPlans.map((plan, index) => (
                <div key={index} className="flex flex-col h-full">
                  <Card className={`h-full flex flex-col overflow-hidden border-2 ${plan.popular ? 'border-legal-primary' : 'border-legal-light/20'}`}>
                    {plan.popular && (
                      <div className="bg-legal-primary text-white text-center py-1 text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    <CardContent className="flex-grow p-6 pt-6">
                      <div className="mb-5">
                        <h3 className="font-serif text-2xl font-semibold">{plan.name}</h3>
                        <p className="text-legal-secondary dark:text-legal-light/70 text-sm mt-1">
                          {plan.description}
                        </p>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold">
                            ${billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly}
                          </span>
                          <span className="text-legal-secondary ml-2">
                            /{billingCycle === "monthly" ? "month" : "year"}
                          </span>
                        </div>
                        {billingCycle === "yearly" && (
                          <p className="text-legal-primary text-sm mt-1">
                            ${plan.priceMonthly * 12 - plan.priceYearly} savings/year
                          </p>
                        )}
                      </div>
                      
                      <Button 
                        className={`w-full mb-6 ${plan.popular ? 'bg-legal-primary hover:bg-legal-primary/90 text-white' : 'bg-legal-light/40 hover:bg-legal-light/60 text-legal-primary'}`}
                      >
                        {plan.cta}
                      </Button>
                      
                      <div className="space-y-3">
                        <p className="font-medium mb-2">What's included:</p>
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-legal-primary mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                        
                        {plan.notIncluded.length > 0 && (
                          <>
                            <p className="font-medium mt-4 mb-2 text-legal-secondary">Not included:</p>
                            {plan.notIncluded.map((feature, i) => (
                              <div key={i} className="flex items-start">
                                <X className="h-5 w-5 text-legal-secondary/60 mr-2 flex-shrink-0" />
                                <span className="text-sm text-legal-secondary">{feature}</span>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="max-w-3xl mx-auto mt-16 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-6">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="font-medium text-lg mb-2">Can I change plans later?</h3>
                  <p className="text-legal-secondary dark:text-legal-light/70">
                    Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be prorated.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">What payment methods do you accept?</h3>
                  <p className="text-legal-secondary dark:text-legal-light/70">
                    We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also support payment via PayPal.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Are the documents legally binding?</h3>
                  <p className="text-legal-secondary dark:text-legal-light/70">
                    Yes, all of our templates are created by legal professionals and are designed to be legally binding in the jurisdictions they cover. However, for complex legal matters, we recommend consulting with a lawyer.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Can I cancel my subscription anytime?</h3>
                  <p className="text-legal-secondary dark:text-legal-light/70">
                    Absolutely! There are no long-term contracts or cancellation fees. You can cancel your subscription at any time from your account settings.
                  </p>
                </div>
              </div>
              
              <div className="mt-10 p-6 bg-legal-light/30 dark:bg-legal-dark/30 rounded-xl">
                <h3 className="font-medium text-lg mb-2">Need a custom plan?</h3>
                <p className="text-legal-secondary dark:text-legal-light/70 mb-4">
                  Contact our sales team for a tailored solution that meets your specific requirements.
                </p>
                <Button className="bg-legal-primary hover:bg-legal-primary/90 text-white">
                  Contact Sales
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
