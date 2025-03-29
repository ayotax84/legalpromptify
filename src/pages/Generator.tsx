
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Save,
  Download,
  Share2,
  ChevronRight,
  Check,
  Info,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import TrustBadge from "@/components/TrustBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Document template definitions
const documentTemplates = {
  nda: {
    title: "Non-Disclosure Agreement",
    description:
      "A legally binding contract that establishes a confidential relationship between parties.",
    icon: <FileText className="h-6 w-6" />,
    steps: ["Parties", "Confidential Information", "Term & Jurisdiction", "Review"],
    schema: z.object({
      disclosingPartyName: z.string().min(1, "Required"),
      disclosingPartyAddress: z.string().min(1, "Required"),
      receivingPartyName: z.string().min(1, "Required"),
      receivingPartyAddress: z.string().min(1, "Required"),
      confidentialInfoDescription: z.string().min(1, "Required"),
      allowedUse: z.string().min(1, "Required"),
      exclusions: z.string().optional(),
      term: z.string().min(1, "Required"),
      jurisdiction: z.string().min(1, "Required"),
      signatureDate: z.string().min(1, "Required"),
    }),
  },
  employment: {
    title: "Employment Contract",
    description:
      "A formal agreement between an employer and employee that outlines terms of employment.",
    icon: <FileText className="h-6 w-6" />,
    steps: ["Employer", "Employee", "Position Details", "Compensation", "Term & Termination", "Miscellaneous", "Review"],
    schema: z.object({
      employerName: z.string().min(1, "Required"),
      employerAddress: z.string().min(1, "Required"),
      employeeName: z.string().min(1, "Required"),
      employeeAddress: z.string().min(1, "Required"),
      positionTitle: z.string().min(1, "Required"),
      jobDescription: z.string().min(1, "Required"),
      startDate: z.string().min(1, "Required"),
      salary: z.string().min(1, "Required"),
      paymentFrequency: z.string().min(1, "Required"),
      benefits: z.string().optional(),
      workHours: z.string().min(1, "Required"),
      term: z.string().min(1, "Required"),
      terminationNotice: z.string().min(1, "Required"),
      jurisdiction: z.string().min(1, "Required"),
    }),
  },
  service: {
    title: "Service Agreement",
    description:
      "A contract between a service provider and client detailing services to be performed.",
    icon: <FileText className="h-6 w-6" />,
    steps: ["Provider", "Client", "Services", "Payment", "Term", "Review"],
    schema: z.object({
      providerName: z.string().min(1, "Required"),
      providerAddress: z.string().min(1, "Required"),
      clientName: z.string().min(1, "Required"),
      clientAddress: z.string().min(1, "Required"),
      serviceDescription: z.string().min(1, "Required"),
      deliverables: z.string().min(1, "Required"),
      timeline: z.string().min(1, "Required"),
      paymentAmount: z.string().min(1, "Required"),
      paymentSchedule: z.string().min(1, "Required"),
      term: z.string().min(1, "Required"),
      terminationClause: z.string().min(1, "Required"),
      jurisdiction: z.string().min(1, "Required"),
    }),
  },
};

const Generator: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinalView, setIsFinalView] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null);

  // Get template info based on URL parameter
  const template = type && documentTemplates[type as keyof typeof documentTemplates];

  // Form validation schema
  const form = useForm<any>({
    resolver: zodResolver(template?.schema || z.object({})),
    defaultValues: {},
    mode: "onChange",
  });

  useEffect(() => {
    // Redirect if template not found
    if (!template && type) {
      toast({
        title: "Template not found",
        description: "The requested document template does not exist.",
        variant: "destructive",
      });
      navigate("/templates");
    }
  }, [template, type, navigate, toast]);

  useEffect(() => {
    // Update progress based on current step
    if (template) {
      const newProgress = ((currentStep + 1) / (template.steps.length)) * 100;
      setProgress(newProgress);
    }
  }, [currentStep, template]);

  const goToNextStep = () => {
    if (template && currentStep < template.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // On final step, generate document
      setIsFinalView(true);
      generateDocument();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      // On first step, go back to templates
      navigate("/templates");
    }
  };

  const handleSubmitStep = (data: any) => {
    console.log("Form data for current step:", data);
    goToNextStep();
  };

  const generateDocument = () => {
    // In a real application, this would call an API to generate the document
    // For now, we'll simulate it with a timeout
    
    const formData = form.getValues();
    console.log("Generating document with data:", formData);
    
    // Example document generation for NDA
    if (type === 'nda') {
      const documentText = `
NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement (the "Agreement") is entered into as of ${formData.signatureDate} by and between:

${formData.disclosingPartyName} ("Disclosing Party"), located at ${formData.disclosingPartyAddress}

and

${formData.receivingPartyName} ("Receiving Party"), located at ${formData.receivingPartyAddress}

1. CONFIDENTIAL INFORMATION
   
   For purposes of this Agreement, "Confidential Information" shall mean:
   ${formData.confidentialInfoDescription}

2. OBLIGATIONS OF RECEIVING PARTY

   The Receiving Party shall:
   a) Keep the Confidential Information strictly confidential;
   b) Use the Confidential Information only for: ${formData.allowedUse};
   c) Not disclose such Confidential Information to any third parties;
   d) Restrict disclosure of Confidential Information to its employees with a need to know;
   e) Advise those employees of their obligations with respect to the Confidential Information;
   f) Copy the Confidential Information only as necessary for those employees who need it;
   g) Protect the Confidential Information with the same degree of care it uses to protect its own information.

3. EXCLUSIONS

   This Agreement does not apply to information that:
   ${formData.exclusions || "a) Was in the public domain at the time of disclosure;\nb) Becomes public through no fault of the Receiving Party;\nc) Was known to the Receiving Party prior to disclosure;\nd) Is independently developed by the Receiving Party without use of the Confidential Information;\ne) Is disclosed pursuant to the requirement of a governmental agency or law."}

4. TERM

   The obligations of this Agreement shall remain in effect for: ${formData.term}.

5. JURISDICTION

   This Agreement shall be governed by the laws of ${formData.jurisdiction}.

6. ENTIRE AGREEMENT

   This Agreement constitutes the entire understanding between the parties and supersedes all prior discussions.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

DISCLOSING PARTY:
${formData.disclosingPartyName}

By: ____________________________
Name:
Title:

RECEIVING PARTY:
${formData.receivingPartyName}

By: ____________________________
Name:
Title:
      `;
      
      setGeneratedDocument(documentText);
    }
    
    toast({
      title: "Document Generated",
      description: "Your legal document has been successfully created."
    });
  };

  const handleDownload = () => {
    if (!generatedDocument) return;
    
    // Create a blob from the document text
    const blob = new Blob([generatedDocument], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link and trigger it
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template?.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your document is being downloaded."
    });
  };

  const renderStepContent = () => {
    if (!template) return null;
    
    // For NDA template
    if (type === 'nda') {
      switch (currentStep) {
        case 0: // Parties
          return (
            <>
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Disclosing Party Information</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="disclosingPartyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Legal Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company or Individual Name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the full legal name of the person or entity disclosing confidential information.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="disclosingPartyAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter complete address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">Receiving Party Information</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="receivingPartyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Legal Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company or Individual Name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the full legal name of the person or entity receiving confidential information.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="receivingPartyAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter complete address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </>
          );
          
        case 1: // Confidential Information
          return (
            <>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="confidentialInfoDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description of Confidential Information</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the confidential information covered by this agreement" 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Be specific about what information is considered confidential under this agreement.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="allowedUse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Permitted Use of Information</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe how the receiving party is allowed to use the confidential information" 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Specify the allowed purposes for which the confidential information can be used.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="exclusions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exclusions (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Specify any exclusions to what is considered confidential information" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Standard exclusions will be included automatically. Add any additional exclusions here.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          );
          
        case 2: // Term & Jurisdiction
          return (
            <>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="term"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration of Agreement</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 year from the date of this Agreement">1 Year</SelectItem>
                            <SelectItem value="2 years from the date of this Agreement">2 Years</SelectItem>
                            <SelectItem value="3 years from the date of this Agreement">3 Years</SelectItem>
                            <SelectItem value="5 years from the date of this Agreement">5 Years</SelectItem>
                            <SelectItem value="perpetual (does not expire)">Perpetual</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        How long should the confidentiality obligations last?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="jurisdiction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Governing Law</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select jurisdiction" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="the State of California, United States">California</SelectItem>
                            <SelectItem value="the State of New York, United States">New York</SelectItem>
                            <SelectItem value="the State of Texas, United States">Texas</SelectItem>
                            <SelectItem value="the State of Florida, United States">Florida</SelectItem>
                            <SelectItem value="the Province of Ontario, Canada">Ontario, Canada</SelectItem>
                            <SelectItem value="England and Wales">England and Wales</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Which laws will govern the interpretation of this agreement?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="signatureDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Effective Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        When will this agreement take effect?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          );
          
        case 3: // Review
          return (
            <>
              <div className="space-y-6">
                <div className="bg-legal-light/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Disclosing Party</h3>
                  <p>{form.getValues().disclosingPartyName}</p>
                  <p className="text-legal-secondary text-sm mt-1">
                    {form.getValues().disclosingPartyAddress}
                  </p>
                </div>
                
                <div className="bg-legal-light/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Receiving Party</h3>
                  <p>{form.getValues().receivingPartyName}</p>
                  <p className="text-legal-secondary text-sm mt-1">
                    {form.getValues().receivingPartyAddress}
                  </p>
                </div>
                
                <div className="bg-legal-light/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Confidential Information</h3>
                  <p className="text-sm">{form.getValues().confidentialInfoDescription}</p>
                </div>
                
                <div className="bg-legal-light/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Permitted Use</h3>
                  <p className="text-sm">{form.getValues().allowedUse}</p>
                </div>
                
                <div className="bg-legal-light/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Term & Jurisdiction</h3>
                  <p className="text-sm">
                    <strong>Duration:</strong> {form.getValues().term}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Governing Law:</strong> {form.getValues().jurisdiction}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Effective Date:</strong> {form.getValues().signatureDate}
                  </p>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-amber-800">Please Review Carefully</h3>
                      <p className="text-amber-700 text-sm mt-1">
                        Ensure all information is correct before generating your document.
                        While our templates are designed by legal professionals, we recommend having
                        the final document reviewed by your attorney before signing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
          
        default:
          return null;
      }
    }
    
    // For other templates, you would add similar case handling
    return (
      <div className="text-center p-12">
        <FileText className="h-12 w-12 text-legal-secondary/50 mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">Document Questionnaire</h3>
        <p className="text-legal-secondary">
          This template's questionnaire is under development.
        </p>
      </div>
    );
  };

  if (!template) {
    return null; // Redirect will happen in useEffect
  }

  if (isFinalView && generatedDocument) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <section className="py-8 bg-white dark:bg-legal-dark">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsFinalView(false)}
                  className="mb-4"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Review
                </Button>
                
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="font-serif text-2xl md:text-3xl font-semibold">
                      {template.title}
                    </h1>
                    <div className="flex items-center mt-2">
                      <TrustBadge type="verified" />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        toast({
                          title: "Document Saved",
                          description: "Your document has been saved to your account."
                        });
                      }}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Link Copied",
                          description: "Document link copied to clipboard."
                        });
                      }}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    
                    <Button onClick={handleDownload}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <Tabs defaultValue="preview">
                    <TabsList>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="edit">Edit</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="mt-4">
                      <Card>
                        <CardContent className="p-6">
                          <div className="prose prose-sm max-w-none whitespace-pre-line">
                            {generatedDocument}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="edit" className="mt-4">
                      <Card>
                        <CardContent className="p-6">
                          <Textarea
                            value={generatedDocument}
                            onChange={(e) => setGeneratedDocument(e.target.value)}
                            className="font-mono text-sm min-h-[600px]"
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="text-center mt-8">
                  <p className="text-legal-secondary text-sm mb-4">
                    Need help with this document? Our legal experts are here to assist you.
                  </p>
                  <Button variant="outline">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="py-8 bg-white dark:bg-legal-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button 
                variant="ghost" 
                onClick={goToPreviousStep}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {currentStep === 0 ? "Back to Templates" : "Previous Step"}
              </Button>
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="flex items-center">
                    {template.icon}
                    <h1 className="font-serif text-2xl md:text-3xl font-semibold ml-2">
                      {template.title}
                    </h1>
                  </div>
                  <p className="text-legal-secondary dark:text-legal-light/70 mt-1">
                    {template.description}
                  </p>
                </div>
                
                <TrustBadge type="verified" />
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">
                    Step {currentStep + 1} of {template.steps.length}: {template.steps[currentStep]}
                  </div>
                  <div className="text-sm text-legal-secondary">
                    {Math.round(progress)}% Complete
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitStep)}>
                      {renderStepContent()}
                      
                      <div className="mt-8 flex justify-end">
                        <Button 
                          type="submit"
                          className="bg-legal-primary hover:bg-legal-primary/90 text-white"
                        >
                          {currentStep < template.steps.length - 1 ? (
                            <>
                              Continue
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Generate Document
                              <FileText className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3">Document Creation Progress</h3>
                <div className="space-y-4">
                  {template.steps.map((step, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center ${
                        index < currentStep 
                          ? "text-legal-primary" 
                          : index === currentStep 
                            ? "text-black dark:text-white" 
                            : "text-legal-secondary/50"
                      }`}
                    >
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center mr-3
                        ${
                          index < currentStep 
                            ? "bg-legal-primary text-white" 
                            : index === currentStep 
                              ? "border-2 border-legal-primary text-legal-primary" 
                              : "border-2 border-legal-secondary/30"
                        }
                      `}>
                        {index < currentStep ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>
                      <span className="font-medium">{step}</span>
                      {index < template.steps.length - 1 && (
                        <ChevronRight className="h-4 w-4 mx-3 text-legal-secondary/30" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Generator;
