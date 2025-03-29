
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { FileText, ArrowRight } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import TrustBadge from "./TrustBadge";

const DocumentGenerator: React.FC = () => {
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
              
              <Button className="mt-8 bg-legal-primary hover:bg-legal-primary/90 text-white">
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
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
                  
                  <Form>
                    <div className="space-y-4">
                      <FormField name="documentType">
                        <FormItem>
                          <FormLabel>Document Type</FormLabel>
                          <FormControl>
                            <DropdownMenu>
                              <DropdownMenuTrigger className="w-full text-left border rounded-md px-4 py-2 bg-white dark:bg-gray-800">
                                Non-Disclosure Agreement (NDA)
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>Non-Disclosure Agreement (NDA)</DropdownMenuItem>
                                <DropdownMenuItem>Employment Contract</DropdownMenuItem>
                                <DropdownMenuItem>Service Agreement</DropdownMenuItem>
                                <DropdownMenuItem>Privacy Policy</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </FormControl>
                        </FormItem>
                      </FormField>
                      
                      <FormField name="jurisdiction">
                        <FormItem>
                          <FormLabel>Jurisdiction</FormLabel>
                          <FormControl>
                            <DropdownMenu>
                              <DropdownMenuTrigger className="w-full text-left border rounded-md px-4 py-2 bg-white dark:bg-gray-800">
                                United States - California
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>United States - California</DropdownMenuItem>
                                <DropdownMenuItem>United States - New York</DropdownMenuItem>
                                <DropdownMenuItem>United Kingdom</DropdownMenuItem>
                                <DropdownMenuItem>Canada</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </FormControl>
                        </FormItem>
                      </FormField>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="w-full bg-legal-primary hover:bg-legal-primary/90 text-white">
                        Continue to Questionnaire
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
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
