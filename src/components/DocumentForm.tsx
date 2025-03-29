
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

interface DocumentFormProps {
  documentType: string;
  onComplete: (data: any) => void;
}

// Generic form schema for NDA document
const ndaFormSchema = z.object({
  disclosingParty: z.object({
    name: z.string().min(2, { message: "Name is required" }),
    address: z.string().min(5, { message: "Address is required" }),
    repName: z.string().min(2, { message: "Representative name is required" }),
    repTitle: z.string().min(2, { message: "Representative title is required" }),
  }),
  receivingParty: z.object({
    name: z.string().min(2, { message: "Name is required" }),
    address: z.string().min(5, { message: "Address is required" }),
    repName: z.string().min(2, { message: "Representative name is required" }),
    repTitle: z.string().min(2, { message: "Representative title is required" }),
  }),
  agreement: z.object({
    purpose: z.string().min(10, { message: "Purpose description is required" }),
    term: z.string().min(1, { message: "Term is required" }),
    jurisdiction: z.string().min(2, { message: "Jurisdiction is required" }),
    effectiveDate: z.string().min(2, { message: "Effective date is required" }),
    restrictedUse: z.boolean().default(true),
    returnOfInfo: z.boolean().default(true),
  })
});

// Employment agreement schema
const employmentFormSchema = z.object({
  employer: z.object({
    name: z.string().min(2, { message: "Name is required" }),
    address: z.string().min(5, { message: "Address is required" }),
    repName: z.string().min(2, { message: "Representative name is required" }),
    repTitle: z.string().min(2, { message: "Representative title is required" }),
  }),
  employee: z.object({
    name: z.string().min(2, { message: "Name is required" }),
    address: z.string().min(5, { message: "Address is required" }),
    position: z.string().min(2, { message: "Position is required" }),
    startDate: z.string().min(2, { message: "Start date is required" }),
  }),
  terms: z.object({
    compensation: z.string().min(1, { message: "Compensation is required" }),
    compensationType: z.string().min(2, { message: "Compensation type is required" }),
    benefitsEligible: z.boolean().default(true),
    terminationNoticePeriod: z.string().min(1, { message: "Notice period is required" }),
    nonCompete: z.boolean().default(false),
    confidentiality: z.boolean().default(true),
  })
});

// Service agreement schema
const serviceFormSchema = z.object({
  provider: z.object({
    name: z.string().min(2, { message: "Name is required" }),
    address: z.string().min(5, { message: "Address is required" }),
    repName: z.string().min(2, { message: "Representative name is required" }),
    repTitle: z.string().min(2, { message: "Representative title is required" }),
  }),
  client: z.object({
    name: z.string().min(2, { message: "Name is required" }),
    address: z.string().min(5, { message: "Address is required" }),
    repName: z.string().min(2, { message: "Representative name is required" }),
    repTitle: z.string().min(2, { message: "Representative title is required" }),
  }),
  serviceDetails: z.object({
    description: z.string().min(10, { message: "Service description is required" }),
    deliverables: z.string().min(5, { message: "Deliverables are required" }),
    startDate: z.string().min(2, { message: "Start date is required" }),
    endDate: z.string().min(2, { message: "End date is required" }),
    paymentTerms: z.string().min(5, { message: "Payment terms are required" }),
    paymentAmount: z.string().min(1, { message: "Payment amount is required" }),
    termination: z.string().min(5, { message: "Termination terms are required" }),
    warranties: z.boolean().default(true),
    liabilityLimit: z.boolean().default(true),
  })
});

const DocumentForm: React.FC<DocumentFormProps> = ({ documentType, onComplete }) => {
  const { toast } = useToast();
  
  let formSchema;
  let defaultValues;
  
  // Select schema based on document type
  switch (documentType) {
    case "nda":
    case "template-001":
      formSchema = ndaFormSchema;
      defaultValues = {
        disclosingParty: {
          name: "",
          address: "",
          repName: "",
          repTitle: ""
        },
        receivingParty: {
          name: "",
          address: "",
          repName: "",
          repTitle: ""
        },
        agreement: {
          purpose: "",
          term: "2",
          jurisdiction: "",
          effectiveDate: new Date().toISOString().split('T')[0],
          restrictedUse: true,
          returnOfInfo: true
        }
      };
      break;
    case "employment":
    case "template-003":
      formSchema = employmentFormSchema;
      defaultValues = {
        employer: {
          name: "",
          address: "",
          repName: "",
          repTitle: ""
        },
        employee: {
          name: "",
          address: "",
          position: "",
          startDate: new Date().toISOString().split('T')[0],
        },
        terms: {
          compensation: "",
          compensationType: "annual",
          benefitsEligible: true,
          terminationNoticePeriod: "2 weeks",
          nonCompete: false,
          confidentiality: true
        }
      };
      break;
    case "service":
    case "template-002":
      formSchema = serviceFormSchema;
      defaultValues = {
        provider: {
          name: "",
          address: "",
          repName: "",
          repTitle: ""
        },
        client: {
          name: "",
          address: "",
          repName: "",
          repTitle: ""
        },
        serviceDetails: {
          description: "",
          deliverables: "",
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
          paymentTerms: "Net 30",
          paymentAmount: "",
          termination: "30 days notice",
          warranties: true,
          liabilityLimit: true
        }
      };
      break;
    default:
      formSchema = ndaFormSchema;
      defaultValues = {
        disclosingParty: {
          name: "",
          address: "",
          repName: "",
          repTitle: ""
        },
        receivingParty: {
          name: "",
          address: "",
          repName: "",
          repTitle: ""
        },
        agreement: {
          purpose: "",
          term: "2",
          jurisdiction: "",
          effectiveDate: new Date().toISOString().split('T')[0],
          restrictedUse: true,
          returnOfInfo: true
        }
      };
  }
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form values:", values);
    
    // Validate form
    if (Object.keys(form.formState.errors).length > 0) {
      toast({
        title: "Form validation error",
        description: "Please check the form for errors and try again.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate document based on form data
    toast({
      title: "Generating document",
      description: "Your legal document is being generated...",
    });
    
    // Simulate processing time
    setTimeout(() => {
      onComplete(values);
    }, 1500);
  };

  // Render NDA form
  const renderNDAForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Disclosing Party</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="disclosingParty.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company/Entity Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Legal name of disclosing party" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="disclosingParty.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full business address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="disclosingParty.repName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Authorized individual" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="disclosingParty.repTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Title of representative" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Receiving Party</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="receivingParty.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company/Entity Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Legal name of receiving party" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="receivingParty.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full business address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="receivingParty.repName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Authorized individual" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="receivingParty.repTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Title of representative" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Agreement Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="agreement.purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose of Disclosure</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Describe the business purpose for sharing confidential information" 
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="agreement.term"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (Years)</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select term" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Year</SelectItem>
                            <SelectItem value="2">2 Years</SelectItem>
                            <SelectItem value="3">3 Years</SelectItem>
                            <SelectItem value="5">5 Years</SelectItem>
                            <SelectItem value="10">10 Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="agreement.jurisdiction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Governing Law</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="State or jurisdiction" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="agreement.effectiveDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Effective Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex flex-col space-y-4 mt-2">
                <FormField
                  control={form.control}
                  name="agreement.restrictedUse"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Restricted Use Clause</FormLabel>
                        <FormDescription>
                          Include a clause prohibiting use of confidential information beyond the stated purpose
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="agreement.returnOfInfo"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Return of Information</FormLabel>
                        <FormDescription>
                          Include a clause requiring return or destruction of confidential information upon request
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-legal-primary hover:bg-legal-primary/90 text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Generating Document..." : "Generate Document"}
          </Button>
        </div>
      </form>
    </Form>
  );
  
  // Render Employment Agreement form
  const renderEmploymentForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Employer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="employer.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company/Entity Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Legal name of employer" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="employer.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full business address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="employer.repName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Authorized individual" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="employer.repTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Title of representative" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Employee Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="employee.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Employee's full legal name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="employee.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Employee's residential address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="employee.position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position/Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Job title or position" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="employee.startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Employment Terms</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="terms.compensation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compensation Amount</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Salary/wage amount" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="terms.compensationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compensation Type</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="biweekly">Bi-weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="annual">Annual</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="terms.terminationNoticePeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Termination Notice Period</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="at will">At Will</SelectItem>
                            <SelectItem value="1 week">1 Week</SelectItem>
                            <SelectItem value="2 weeks">2 Weeks</SelectItem>
                            <SelectItem value="30 days">30 Days</SelectItem>
                            <SelectItem value="60 days">60 Days</SelectItem>
                            <SelectItem value="90 days">90 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex flex-col space-y-4 mt-2">
                <FormField
                  control={form.control}
                  name="terms.benefitsEligible"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Benefits Eligible</FormLabel>
                        <FormDescription>
                          Employee is eligible for company benefits as per company policy
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="terms.nonCompete"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Non-Compete Clause</FormLabel>
                        <FormDescription>
                          Include a clause prohibiting employee from working with competitors
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="terms.confidentiality"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Confidentiality Clause</FormLabel>
                        <FormDescription>
                          Include a clause requiring employee to maintain confidentiality of company information
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-legal-primary hover:bg-legal-primary/90 text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Generating Document..." : "Generate Document"}
          </Button>
        </div>
      </form>
    </Form>
  );
  
  // Render Service Agreement form
  const renderServiceForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Service Provider</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="provider.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company/Entity Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Legal name of service provider" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="provider.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full business address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="provider.repName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Authorized individual" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="provider.repTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Title of representative" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Client</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="client.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company/Entity Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Legal name of client" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="client.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full business address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="client.repName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Authorized individual" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="client.repTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Title of representative" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Service Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="serviceDetails.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Detailed description of services to be provided" 
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="serviceDetails.deliverables"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deliverables</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Specific deliverables or outputs expected" 
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="serviceDetails.startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="serviceDetails.endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="serviceDetails.paymentAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Amount</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Total payment amount" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="serviceDetails.paymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Terms</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select terms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Upon completion">Upon Completion</SelectItem>
                            <SelectItem value="Net 15">Net 15</SelectItem>
                            <SelectItem value="Net 30">Net 30</SelectItem>
                            <SelectItem value="Net 60">Net 60</SelectItem>
                            <SelectItem value="50% upfront">50% Upfront, 50% on Completion</SelectItem>
                            <SelectItem value="Milestone based">Milestone-based</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="serviceDetails.termination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Termination Terms</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select termination terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15 days notice">15 Days Notice</SelectItem>
                          <SelectItem value="30 days notice">30 Days Notice</SelectItem>
                          <SelectItem value="60 days notice">60 Days Notice</SelectItem>
                          <SelectItem value="Immediate for cause">Immediate for Cause</SelectItem>
                          <SelectItem value="Custom">Custom Terms</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex flex-col space-y-4 mt-2">
                <FormField
                  control={form.control}
                  name="serviceDetails.warranties"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Warranties Clause</FormLabel>
                        <FormDescription>
                          Include warranties for services provided
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="serviceDetails.liabilityLimit"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Limitation of Liability</FormLabel>
                        <FormDescription>
                          Include a clause limiting liability to the contract value
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-legal-primary hover:bg-legal-primary/90 text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Generating Document..." : "Generate Document"}
          </Button>
        </div>
      </form>
    </Form>
  );

  // Select the appropriate form to render based on document type
  const renderForm = () => {
    switch (documentType) {
      case "nda":
      case "template-001":
        return renderNDAForm();
      case "employment":
      case "template-003":
        return renderEmploymentForm();
      case "service":
      case "template-002":
        return renderServiceForm();
      default:
        return renderNDAForm();
    }
  };

  return (
    <div>
      {renderForm()}
    </div>
  );
};

export default DocumentForm;
