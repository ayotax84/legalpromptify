
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import DocumentForm from "@/components/DocumentForm";
import { FileText, ArrowLeft, CheckCircle, PenSquare, Download, Printer, CopyPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Template {
  id: string;
  title: string;
  description: string;
  type: string;
  icon: React.ReactNode;
}

const GeneratorPage = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [documentGenerated, setDocumentGenerated] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [formData, setFormData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  
  
  useEffect(() => {
    // Fetch template information based on the type parameter
    const fetchTemplate = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call to fetch template data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock template data based on the type parameter
        let mockTemplate: Template;
        
        switch (type) {
          case "template-001":
            mockTemplate = {
              id: "template-001",
              title: "Non-Disclosure Agreement",
              description: "Protect your confidential information when sharing with partners or contractors.",
              type: "nda",
              icon: <FileText className="h-6 w-6" />
            };
            break;
          case "template-002":
            mockTemplate = {
              id: "template-002",
              title: "Service Agreement",
              description: "Define the terms of service between a service provider and client.",
              type: "service",
              icon: <FileText className="h-6 w-6" />
            };
            break;
          case "template-003":
            mockTemplate = {
              id: "template-003",
              title: "Employment Contract",
              description: "Establish clear terms for employer-employee relationships.",
              type: "employment",
              icon: <FileText className="h-6 w-6" />
            };
            break;
          case "nda":
            mockTemplate = {
              id: "nda",
              title: "Non-Disclosure Agreement",
              description: "Protect your confidential information when sharing with partners or contractors.",
              type: "nda",
              icon: <FileText className="h-6 w-6" />
            };
            break;
          case "employment":
            mockTemplate = {
              id: "employment",
              title: "Employment Contract",
              description: "Establish clear terms for employer-employee relationships.",
              type: "employment",
              icon: <FileText className="h-6 w-6" />
            };
            break;
          case "service":
            mockTemplate = {
              id: "service",
              title: "Service Agreement",
              description: "Define the terms of service between a service provider and client.",
              type: "service",
              icon: <FileText className="h-6 w-6" />
            };
            break;
          default:
            mockTemplate = {
              id: "default",
              title: "Legal Document",
              description: "Generate a custom legal document with your specific requirements.",
              type: "nda", // Default to NDA
              icon: <FileText className="h-6 w-6" />
            };
        }
        
        setTemplate(mockTemplate);
      } catch (error) {
        console.error("Error fetching template:", error);
        toast({
          title: "Error",
          description: "Failed to load template information. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTemplate();
  }, [type, toast]);
  
  const handleFormComplete = (data: any) => {
    console.log("Form data for document generation:", data);
    
    // Generate document HTML based on form data
    let documentHtml = "";
    
    // Generate different document HTML based on document type
    if (template?.type === "nda") {
      documentHtml = `
        <div class="document-container">
          <h1 class="text-center text-2xl font-bold mb-6">NON-DISCLOSURE AGREEMENT</h1>
          
          <p class="mb-4">THIS AGREEMENT is made and entered into as of ${data.agreement.effectiveDate}, by and between:</p>
          
          <p class="mb-2"><strong>Party A:</strong> ${data.disclosingParty.name}, with its principal place of business at ${data.disclosingParty.address} ("Disclosing Party")</p>
          
          <p class="mb-6"><strong>Party B:</strong> ${data.receivingParty.name}, with its principal place of business at ${data.receivingParty.address} ("Receiving Party")</p>
          
          <h2 class="text-xl font-bold mb-2">1. Purpose</h2>
          <p class="mb-4">The parties wish to explore a potential business relationship in connection with ${data.agreement.purpose} (the "Purpose"). In connection with the Purpose, the Disclosing Party may disclose to the Receiving Party certain confidential and proprietary information.</p>
          
          <h2 class="text-xl font-bold mb-2">2. Definition of Confidential Information</h2>
          <p class="mb-4">"Confidential Information" means any information disclosed by the Disclosing Party to the Receiving Party, either directly or indirectly, in writing, orally or by inspection of tangible objects, which is designated as "Confidential," "Proprietary" or some similar designation, or that should reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure.</p>
          
          <h2 class="text-xl font-bold mb-2">3. Non-use and Non-disclosure</h2>
          <p class="mb-4">The Receiving Party agrees not to use any Confidential Information for any purpose except to evaluate and engage in discussions concerning the Purpose. The Receiving Party agrees not to disclose any Confidential Information to third parties or to its employees, except to those employees who are required to have the information in order to evaluate or engage in discussions concerning the Purpose.</p>
          
          ${data.agreement.restrictedUse ? `
          <h2 class="text-xl font-bold mb-2">4. Restricted Use</h2>
          <p class="mb-4">The Receiving Party agrees not to use any Confidential Information for any purpose beyond the Purpose stated in this Agreement without the prior written consent of the Disclosing Party.</p>
          ` : ''}
          
          ${data.agreement.returnOfInfo ? `
          <h2 class="text-xl font-bold mb-2">${data.agreement.restrictedUse ? '5' : '4'}. Return of Materials</h2>
          <p class="mb-4">Upon the request of the Disclosing Party, the Receiving Party will promptly return to the Disclosing Party all copies, whether in written, electronic, or other form or media, of the Disclosing Party's Confidential Information, or destroy all such copies and certify in writing to the Disclosing Party that such Confidential Information has been destroyed.</p>
          ` : ''}
          
          <h2 class="text-xl font-bold mb-2">${data.agreement.restrictedUse && data.agreement.returnOfInfo ? '6' : data.agreement.restrictedUse || data.agreement.returnOfInfo ? '5' : '4'}. Term</h2>
          <p class="mb-4">This Agreement shall remain in effect for a period of ${data.agreement.term} years from the Effective Date, unless terminated earlier by mutual written agreement of the parties.</p>
          
          <h2 class="text-xl font-bold mb-2">${data.agreement.restrictedUse && data.agreement.returnOfInfo ? '7' : data.agreement.restrictedUse || data.agreement.returnOfInfo ? '6' : '5'}. Governing Law</h2>
          <p class="mb-6">This Agreement shall be governed by and construed in accordance with the laws of ${data.agreement.jurisdiction}, without regard to its conflicts of law provisions.</p>
          
          <div class="mt-12 grid grid-cols-2 gap-8">
            <div>
              <p><strong>${data.disclosingParty.name}</strong></p>
              <p class="mt-6 border-t border-gray-400 pt-2">Signature</p>
              <p class="mt-4">By: ${data.disclosingParty.repName}</p>
              <p>Title: ${data.disclosingParty.repTitle}</p>
              <p>Date: ___________________</p>
            </div>
            
            <div>
              <p><strong>${data.receivingParty.name}</strong></p>
              <p class="mt-6 border-t border-gray-400 pt-2">Signature</p>
              <p class="mt-4">By: ${data.receivingParty.repName}</p>
              <p>Title: ${data.receivingParty.repTitle}</p>
              <p>Date: ___________________</p>
            </div>
          </div>
        </div>
      `;
    } else if (template?.type === "employment") {
      documentHtml = `
        <div class="document-container">
          <h1 class="text-center text-2xl font-bold mb-6">EMPLOYMENT AGREEMENT</h1>
          
          <p class="mb-4">THIS EMPLOYMENT AGREEMENT (the "Agreement") is made and entered into as of ${data.employee.startDate}, by and between:</p>
          
          <p class="mb-2"><strong>Employer:</strong> ${data.employer.name}, with its principal place of business at ${data.employer.address} ("Employer")</p>
          
          <p class="mb-6"><strong>Employee:</strong> ${data.employee.name}, residing at ${data.employee.address} ("Employee")</p>
          
          <h2 class="text-xl font-bold mb-2">1. Position and Duties</h2>
          <p class="mb-4">Employer hereby employs Employee as ${data.employee.position}. Employee shall perform all duties and responsibilities associated with this position and such other duties as may be assigned by Employer from time to time.</p>
          
          <h2 class="text-xl font-bold mb-2">2. Term</h2>
          <p class="mb-4">The employment relationship shall commence on ${data.employee.startDate} and shall continue until terminated in accordance with the provisions of this Agreement.</p>
          
          <h2 class="text-xl font-bold mb-2">3. Compensation</h2>
          <p class="mb-4">Employer shall pay Employee ${data.terms.compensation} on a ${data.terms.compensationType} basis, subject to all applicable withholdings and deductions required by law.</p>
          
          ${data.terms.benefitsEligible ? `
          <h2 class="text-xl font-bold mb-2">4. Benefits</h2>
          <p class="mb-4">Employee shall be eligible to participate in the employee benefit plans and programs maintained by Employer and offered to similarly situated employees, subject to the terms and conditions of such plans and programs.</p>
          ` : ''}
          
          <h2 class="text-xl font-bold mb-2">${data.terms.benefitsEligible ? '5' : '4'}. Termination</h2>
          <p class="mb-4">Either party may terminate this employment relationship at any time by providing the other party with at least ${data.terms.terminationNoticePeriod} advance written notice.</p>
          
          ${data.terms.confidentiality ? `
          <h2 class="text-xl font-bold mb-2">${data.terms.benefitsEligible ? '6' : '5'}. Confidentiality</h2>
          <p class="mb-4">Employee acknowledges that during employment, Employee will have access to confidential information belonging to Employer. Employee agrees not to disclose or use any confidential information, except as required in the course of employment.</p>
          ` : ''}
          
          ${data.terms.nonCompete ? `
          <h2 class="text-xl font-bold mb-2">${data.terms.benefitsEligible && data.terms.confidentiality ? '7' : data.terms.benefitsEligible || data.terms.confidentiality ? '6' : '5'}. Non-Competition</h2>
          <p class="mb-4">For a period of one (1) year following the termination of employment, Employee shall not, directly or indirectly, engage in any business that competes with Employer within a 50-mile radius of Employer's principal place of business.</p>
          ` : ''}
          
          <h2 class="text-xl font-bold mb-2">${data.terms.benefitsEligible && data.terms.confidentiality && data.terms.nonCompete ? '8' : (data.terms.benefitsEligible && data.terms.confidentiality) || (data.terms.benefitsEligible && data.terms.nonCompete) || (data.terms.confidentiality && data.terms.nonCompete) ? '7' : data.terms.benefitsEligible || data.terms.confidentiality || data.terms.nonCompete ? '6' : '5'}. Governing Law</h2>
          <p class="mb-6">This Agreement shall be governed by and construed in accordance with the laws of the state where Employer is located, without regard to its conflicts of law provisions.</p>
          
          <div class="mt-12 grid grid-cols-2 gap-8">
            <div>
              <p><strong>${data.employer.name}</strong></p>
              <p class="mt-6 border-t border-gray-400 pt-2">Signature</p>
              <p class="mt-4">By: ${data.employer.repName}</p>
              <p>Title: ${data.employer.repTitle}</p>
              <p>Date: ___________________</p>
            </div>
            
            <div>
              <p><strong>${data.employee.name}</strong></p>
              <p class="mt-6 border-t border-gray-400 pt-2">Signature</p>
              <p class="mt-4">Date: ___________________</p>
            </div>
          </div>
        </div>
      `;
    } else if (template?.type === "service") {
      documentHtml = `
        <div class="document-container">
          <h1 class="text-center text-2xl font-bold mb-6">SERVICE AGREEMENT</h1>
          
          <p class="mb-4">THIS SERVICE AGREEMENT (the "Agreement") is made and entered into as of ${data.serviceDetails.startDate}, by and between:</p>
          
          <p class="mb-2"><strong>Service Provider:</strong> ${data.provider.name}, with its principal place of business at ${data.provider.address} ("Provider")</p>
          
          <p class="mb-6"><strong>Client:</strong> ${data.client.name}, with its principal place of business at ${data.client.address} ("Client")</p>
          
          <h2 class="text-xl font-bold mb-2">1. Services</h2>
          <p class="mb-4">Provider agrees to provide the following services to Client:</p>
          <p class="mb-4">${data.serviceDetails.description}</p>
          
          <h2 class="text-xl font-bold mb-2">2. Term</h2>
          <p class="mb-4">This Agreement shall commence on ${data.serviceDetails.startDate} and continue until ${data.serviceDetails.endDate}, unless terminated earlier in accordance with this Agreement.</p>
          
          <h2 class="text-xl font-bold mb-2">3. Deliverables</h2>
          <p class="mb-4">Provider shall deliver the following deliverables to Client:</p>
          <p class="mb-4">${data.serviceDetails.deliverables}</p>
          
          <h2 class="text-xl font-bold mb-2">4. Compensation</h2>
          <p class="mb-4">Client shall pay Provider ${data.serviceDetails.paymentAmount} for the Services. Payment shall be made ${data.serviceDetails.paymentTerms}.</p>
          
          <h2 class="text-xl font-bold mb-2">5. Termination</h2>
          <p class="mb-4">Either party may terminate this Agreement by providing ${data.serviceDetails.termination} to the other party.</p>
          
          ${data.serviceDetails.warranties ? `
          <h2 class="text-xl font-bold mb-2">6. Warranties</h2>
          <p class="mb-4">Provider warrants that all Services will be performed in a professional and workmanlike manner in accordance with industry standards.</p>
          ` : ''}
          
          ${data.serviceDetails.liabilityLimit ? `
          <h2 class="text-xl font-bold mb-2">${data.serviceDetails.warranties ? '7' : '6'}. Limitation of Liability</h2>
          <p class="mb-4">Provider's liability under this Agreement shall be limited to the amount paid by Client for the Services provided under this Agreement.</p>
          ` : ''}
          
          <h2 class="text-xl font-bold mb-2">${data.serviceDetails.warranties && data.serviceDetails.liabilityLimit ? '8' : data.serviceDetails.warranties || data.serviceDetails.liabilityLimit ? '7' : '6'}. Governing Law</h2>
          <p class="mb-6">This Agreement shall be governed by and construed in accordance with the laws of the state where Provider is located, without regard to its conflicts of law provisions.</p>
          
          <div class="mt-12 grid grid-cols-2 gap-8">
            <div>
              <p><strong>${data.provider.name}</strong></p>
              <p class="mt-6 border-t border-gray-400 pt-2">Signature</p>
              <p class="mt-4">By: ${data.provider.repName}</p>
              <p>Title: ${data.provider.repTitle}</p>
              <p>Date: ___________________</p>
            </div>
            
            <div>
              <p><strong>${data.client.name}</strong></p>
              <p class="mt-6 border-t border-gray-400 pt-2">Signature</p>
              <p class="mt-4">By: ${data.client.repName}</p>
              <p>Title: ${data.client.repTitle}</p>
              <p>Date: ___________________</p>
            </div>
          </div>
        </div>
      `;
    }
    
    setGeneratedHtml(documentHtml);
    setFormData(data);
    setDocumentGenerated(true);

    toast({
      title: "Document generated",
      description: "Your legal document has been successfully generated.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const blob = new Blob(
      [`<!doctype html><html><head><meta charset="utf-8"><title>${template?.title ?? "Document"}</title></head><body>${generatedHtml}</body></html>`],
      { type: "text/html" }
    );
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${(template?.title ?? "document").replace(/\s+/g, "-").toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    if (!user || !template) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("documents")
      .insert({
        user_id: user.id,
        title: template.title,
        template_slug: template.type,
        status: "ready",
        jurisdiction: formData?.agreement?.jurisdiction ?? "US",
        form_data: formData ?? {},
        content_html: generatedHtml,
      })
      .select("id")
      .single();
    setSaving(false);

    if (error || !data) {
      toast({ title: "Save failed", description: error?.message ?? "Unknown error", variant: "destructive" });
      return;
    }

    toast({ title: "Document saved", description: "Your document is now in your dashboard." });
    navigate(`/document/${data.id}`);
  };
  
  const handleCreateNew = () => {
    setDocumentGenerated(false);
    setGeneratedHtml("");
    
    // Reset form or reload page
    window.scrollTo(0, 0);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-legal-dark">
        <Navbar />
        
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(documentGenerated ? "/dashboard" : "/templates")}
              className="mb-6 flex items-center text-legal-secondary hover:text-legal-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> 
              Back to {documentGenerated ? "Dashboard" : "Templates"}
            </Button>
            
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-pulse flex flex-col items-center w-full max-w-3xl">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-10"></div>
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </div>
              </div>
            ) : template ? (
              <>
                {!documentGenerated ? (
                  <>
                    <div className="mb-8">
                      <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                        {template.title}
                      </h1>
                      <p className="text-legal-secondary dark:text-legal-light/70">
                        {template.description}
                      </p>
                    </div>
                    
                    <div className="max-w-4xl mx-auto">
                      <DocumentForm 
                        documentType={template.type} 
                        onComplete={handleFormComplete} 
                      />
                    </div>
                  </>
                ) : (
                  <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-1">
                          {template.title}
                        </h1>
                        <p className="text-legal-secondary dark:text-legal-light/70 flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Document successfully generated
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          onClick={handlePrint}
                          className="border-legal-primary text-legal-primary hover:bg-legal-primary/10"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={handleDownload}
                          className="border-legal-primary text-legal-primary hover:bg-legal-primary/10"
                        >
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={handleCreateNew}
                          className="border-legal-primary text-legal-primary hover:bg-legal-primary/10"
                        >
                          <CopyPlus className="mr-2 h-4 w-4" /> Create New
                        </Button>
                        <Button
                          onClick={handleSave}
                          disabled={saving}
                          className="bg-legal-primary hover:bg-legal-primary/90 text-white"
                        >
                          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PenSquare className="mr-2 h-4 w-4" />}
                          {saving ? "Saving..." : "Save"}
                        </Button>
                      </div>
                    </div>
                    
                    <Card className="p-8 mb-10 shadow-sm border border-gray-200 dark:border-gray-800 print:shadow-none print:border-none">
                      <div 
                        className="prose prose-gray dark:prose-invert max-w-none" 
                        dangerouslySetInnerHTML={{ __html: generatedHtml }}
                      />
                    </Card>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">
                  Template not found
                </h2>
                <p className="text-legal-secondary dark:text-legal-light/70 mb-6">
                  The template you're looking for doesn't exist or you don't have permission to access it.
                </p>
                <Button 
                  onClick={() => navigate("/templates")}
                  className="bg-legal-primary hover:bg-legal-primary/90 text-white"
                >
                  Browse Templates
                </Button>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default GeneratorPage;
