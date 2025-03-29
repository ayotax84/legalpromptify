
import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import DocumentCard from "@/components/DocumentCard";
import { 
  FileText, 
  Briefcase, 
  Users, 
  Home, 
  ShieldCheck, 
  GraduationCap, 
  Share2, 
  Pencil, 
  ArrowRight,
  Search,
  Filter
} from "lucide-react";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const Templates: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  
  const categories = [
    { id: "all", label: "All Categories" },
    { id: "business", label: "Business" },
    { id: "employment", label: "Employment" },
    { id: "property", label: "Property" },
    { id: "ip", label: "Intellectual Property" },
    { id: "personal", label: "Personal" }
  ];
  
  const documents = [
    {
      title: "Non-Disclosure Agreement",
      description: "Protect your confidential information when sharing with partners, employees, or clients.",
      time: "5 min",
      icon: <ShieldCheck size={24} />,
      to: "/generator/nda",
      isVerified: true,
      category: "business"
    },
    {
      title: "Employment Contract",
      description: "Create a comprehensive employment agreement for your new hires.",
      time: "10 min",
      icon: <Briefcase size={24} />,
      to: "/generator/employment",
      isVerified: true,
      category: "employment"
    },
    {
      title: "Service Agreement",
      description: "Define the terms for professional services between you and your clients.",
      time: "8 min",
      icon: <Pencil size={24} />,
      to: "/generator/service",
      isVerified: true,
      category: "business"
    },
    {
      title: "Rental Agreement",
      description: "Establish clear terms for property rental between landlord and tenant.",
      time: "12 min",
      icon: <Home size={24} />,
      to: "/generator/rental",
      isVerified: false,
      category: "property"
    },
    {
      title: "Partnership Agreement",
      description: "Define the terms of your business partnership and protect all parties.",
      time: "15 min",
      icon: <Users size={24} />,
      to: "/generator/partnership",
      isVerified: false,
      category: "business"
    },
    {
      title: "Software License",
      description: "Specify how your software can be used, distributed, and modified.",
      time: "7 min",
      icon: <Share2 size={24} />,
      to: "/generator/software-license",
      isVerified: true,
      category: "ip"
    },
    {
      title: "Last Will and Testament",
      description: "Create a legally binding document to express your final wishes.",
      time: "20 min",
      icon: <FileText size={24} />,
      to: "/generator/will",
      isVerified: true,
      category: "personal"
    },
    {
      title: "Privacy Policy",
      description: "Generate a compliant privacy policy for your website or application.",
      time: "8 min",
      icon: <ShieldCheck size={24} />,
      to: "/generator/privacy-policy",
      isVerified: true,
      category: "ip"
    },
    {
      title: "Terms of Service",
      description: "Create a comprehensive terms of service agreement for your platform.",
      time: "10 min",
      icon: <FileText size={24} />,
      to: "/generator/terms",
      isVerified: true,
      category: "ip"
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="py-12 bg-legal-light/30 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                Legal Document Templates
              </h1>
              <p className="text-legal-secondary dark:text-legal-light/70">
                Browse our library of professionally crafted legal templates, 
                designed to protect your interests and ensure compliance.
              </p>
            </div>

            <div className="max-w-5xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search templates..."
                    className="pl-10 legal-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-legal-secondary/70" />
                </div>
                <div className="w-full md:w-48">
                  <Select 
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="legal-input">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {filteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-legal-secondary/50 mb-4" />
                <h3 className="text-xl font-medium mb-2">No templates found</h3>
                <p className="text-legal-secondary">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {filteredDocuments.map((doc, index) => (
                  <DocumentCard
                    key={index}
                    title={doc.title}
                    description={doc.description}
                    time={doc.time}
                    icon={doc.icon}
                    to={doc.to}
                    isVerified={doc.isVerified}
                  />
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <p className="text-legal-secondary mb-6">
                Don't see what you're looking for? Contact us for custom document creation.
              </p>
              <Button className="bg-legal-primary hover:bg-legal-primary/90 text-white">
                Request Custom Template
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
