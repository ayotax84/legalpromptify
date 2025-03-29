
import React from "react";
import { FileQuestion, FileText, CheckSquare, Download } from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <FileQuestion className="h-10 w-10 text-white" />,
      title: "Answer Questions",
      description: "Complete a simple questionnaire about your specific needs and requirements.",
      color: "bg-legal-primary"
    },
    {
      icon: <FileText className="h-10 w-10 text-white" />,
      title: "AI Generation",
      description: "Our AI creates a tailored legal document based on your answers and selected jurisdiction.",
      color: "bg-legal-secondary"
    },
    {
      icon: <CheckSquare className="h-10 w-10 text-white" />,
      title: "Review & Edit",
      description: "Review your document and make any final adjustments to the generated text.",
      color: "bg-legal-primary"
    },
    {
      icon: <Download className="h-10 w-10 text-white" />,
      title: "Download & Use",
      description: "Download your completed document in PDF, Word, or other formats for immediate use.",
      color: "bg-legal-secondary"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-legal-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            How It Works
          </h2>
          <p className="text-legal-secondary dark:text-legal-light/70 max-w-2xl mx-auto">
            Creating legal documents has never been easier. Follow these simple steps to generate customized contracts in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`${step.color} h-20 w-20 rounded-full flex items-center justify-center mb-6 relative`}>
                {step.icon}
                <div className="absolute -right-2 -top-2 bg-white dark:bg-legal-dark h-8 w-8 rounded-full flex items-center justify-center border-2 border-legal-accent">
                  <span className="font-bold">{index + 1}</span>
                </div>
              </div>
              <h3 className="font-serif font-medium text-xl mb-3 text-center">{step.title}</h3>
              <p className="text-legal-secondary dark:text-legal-light/70 text-center">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block h-0.5 w-full bg-legal-light dark:bg-legal-secondary/30 absolute left-1/2 top-36 -z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
