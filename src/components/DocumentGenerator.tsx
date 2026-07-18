
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import TrustBadge from "./TrustBadge";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define form schema using Zod
const formSchema = z.object({
  documentType: z.string().min(1, "Please select a document type"),
  jurisdiction: z.string().min(1, "Please select a jurisdiction")
});

type FormValues = z.infer<typeof formSchema>;

const DocumentGenerator: React.FC = () => {
  // Initialize the form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentType: "nda",
      jurisdiction: "us-california"
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    // Handle form submission logic here
  };

  return (
    <section className="py-16 bg-white dark:bg-legal-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-legal-primary font-medium text-sm uppercase tracking-wider mb-2 block">
                Try It Now
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                Create Your First Document
              </h2>
              <p className="text-legal-secondary dark:text-legal-light/70 mb-8">
                Generate a legally sound document in minutes. Start with a template, answer a few questions, and get your customized document instantly.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-legal-primary/10 dark:bg-legal-primary/20 rounded-full w-8 h-8 flex items-center justify-center text-legal-primary">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Choose a template</h3>
                    <p className="text-legal-secondary dark:text-legal-light/70 text-sm">
                      Select from our library of legally verified templates
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-legal-primary/10 dark:bg-legal-primary/20 rounded-full w-8 h-8 flex items-center justify-center text-legal-primary">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Answer questions</h3>
                    <p className="text-legal-secondary dark:text-legal-light/70 text-sm">
                      Fill out a simple questionnaire with your specific details
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-legal-primary/10 dark:bg-legal-primary/20 rounded-full w-8 h-8 flex items-center justify-center text-legal-primary">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Get your document</h3>
                    <p className="text-legal-secondary dark:text-legal-light/70 text-sm">
                      Download, share, or store your personalized legal document
                    </p>
                  </div>
                </div>
              </div>
              
              <Button asChild className="mt-8 bg-legal-primary hover:bg-legal-primary/90 text-white">
                <Link to="/templates">
                  Start Creating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div>
              <Card className="shadow-lg border-legal-light/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <FileText className="text-legal-primary h-5 w-5" />
                      <h3 className="font-medium">Quick Document Generator</h3>
                    </div>
                    <TrustBadge type="ai" />
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="documentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Document Type</FormLabel>
                            <FormControl>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a document type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="nda">Non-Disclosure Agreement (NDA)</SelectItem>
                                  <SelectItem value="employment">Employment Contract</SelectItem>
                                  <SelectItem value="service">Service Agreement</SelectItem>
                                  <SelectItem value="privacy">Privacy Policy</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="jurisdiction"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jurisdiction</FormLabel>
                            <FormControl>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a jurisdiction" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="us-california">United States - California</SelectItem>
                                  <SelectItem value="us-newyork">United States - New York</SelectItem>
                                  <SelectItem value="uk">United Kingdom</SelectItem>
                                  <SelectItem value="canada">Canada</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <div className="mt-6">
                        <Button type="submit" className="w-full bg-legal-primary hover:bg-legal-primary/90 text-white">
                          Continue to Questionnaire
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </Form>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-legal-secondary dark:text-legal-light/50">
                        Estimated completion time: <span className="font-medium">5 minutes</span>
                      </div>
                      <TrustBadge type="verified" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentGenerator;
