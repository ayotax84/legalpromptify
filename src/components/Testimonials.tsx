
import React from "react";
import { Quote } from "lucide-react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "LegalPromptify has revolutionized our contract creation process. What used to take days now takes minutes, and the documents are always legally sound.",
      name: "Sarah Johnson",
      title: "CEO, TechStart Inc.",
      image: "https://randomuser.me/api/portraits/women/18.jpg"
    },
    {
      quote: "As a small business owner, I couldn't afford a legal team. LegalPromptify gives me access to professional legal documents at a fraction of the cost.",
      name: "Michael Thompson",
      title: "Founder, Craft Brewing Co.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The jurisdiction-specific customization is incredible. We operate in multiple states, and LegalPromptify ensures our contracts are compliant everywhere.",
      name: "Emily Rodriguez",
      title: "Legal Director, Eastcoast Retail",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-legal-primary/90 to-legal-secondary/90 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust LegalPromptify for their legal document needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <Quote className="text-legal-accent h-8 w-8 mb-4" />
              <p className="text-white/90 mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-white/70 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
