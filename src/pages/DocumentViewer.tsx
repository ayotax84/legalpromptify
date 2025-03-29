
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Share, Edit, Printer, ArrowLeft, CheckCircle, AlertCircle, Clock } from "lucide-react";

interface DocumentData {
  id: string;
  title: string;
  type: string;
  status: "draft" | "completed" | "pending";
  createdAt: string;
  updatedAt: string;
  content: string;
}

const DocumentViewer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching document data
    const fetchDocument = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call to fetch the document
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock document data
        const mockDocument: DocumentData = {
          id: id || "doc-001",
          title: "Non-Disclosure Agreement",
          type: "NDA",
          status: "completed",
          createdAt: "2023-05-15T10:30:00Z",
          updatedAt: "2023-05-16T14:22:00Z",
          content: `
            <h1>NON-DISCLOSURE AGREEMENT</h1>
            <p>THIS AGREEMENT is made and entered into as of [Date], by and between:</p>
            <p><strong>Party A:</strong> [Company Name], with its principal place of business at [Address] ("Disclosing Party")</p>
            <p><strong>Party B:</strong> [Recipient Name], with its principal place of business at [Address] ("Receiving Party")</p>
            <h2>1. Purpose</h2>
            <p>The parties wish to explore a potential business relationship in connection with [describe purpose] (the "Purpose"). In connection with the Purpose, the Disclosing Party may disclose to the Receiving Party certain confidential and proprietary information.</p>
            <h2>2. Definition of Confidential Information</h2>
            <p>"Confidential Information" means any information disclosed by the Disclosing Party to the Receiving Party, either directly or indirectly, in writing, orally or by inspection of tangible objects, which is designated as "Confidential," "Proprietary" or some similar designation, or that should reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure.</p>
            <h2>3. Non-use and Non-disclosure</h2>
            <p>The Receiving Party agrees not to use any Confidential Information for any purpose except to evaluate and engage in discussions concerning the Purpose. The Receiving Party agrees not to disclose any Confidential Information to third parties or to its employees, except to those employees who are required to have the information in order to evaluate or engage in discussions concerning the Purpose.</p>
            <h2>4. Term</h2>
            <p>This Agreement shall remain in effect for a period of [Term] years from the Effective Date, unless terminated earlier by mutual written agreement of the parties.</p>
            <h2>5. Governing Law</h2>
            <p>This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflicts of law provisions.</p>
            <div class="signature-section">
              <div class="signature-block">
                <p><strong>Party A:</strong> ____________________</p>
                <p>Name: ____________________</p>
                <p>Title: ____________________</p>
                <p>Date: ____________________</p>
              </div>
              <div class="signature-block">
                <p><strong>Party B:</strong> ____________________</p>
                <p>Name: ____________________</p>
                <p>Title: ____________________</p>
                <p>Date: ____________________</p>
              </div>
            </div>
          `
        };
        
        setDocument(mockDocument);
      } catch (error) {
        console.error("Error fetching document:", error);
        toast({
          title: "Error",
          description: "Failed to load document. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDocument();
  }, [id, toast]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Draft
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF
    toast({
      title: "Download started",
      description: "Your document is being downloaded.",
    });
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast({
      title: "Share document",
      description: "Share functionality would be implemented here.",
    });
  };

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-legal-dark">
        <Navbar />
        
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/dashboard")}
              className="mb-6 flex items-center text-legal-secondary hover:text-legal-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
            
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-10"></div>
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </div>
              </div>
            ) : document ? (
              <>
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                      {document.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-legal-secondary dark:text-legal-light/70">
                        Last updated: {formatDate(document.updatedAt)}
                      </span>
                      <span className="text-legal-secondary dark:text-legal-light/70">
                        Type: {document.type}
                      </span>
                      {getStatusBadge(document.status)}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
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
                      onClick={handleShare}
                      className="border-legal-primary text-legal-primary hover:bg-legal-primary/10"
                    >
                      <Share className="mr-2 h-4 w-4" /> Share
                    </Button>
                    <Button 
                      onClick={() => navigate(`/edit/${document.id}`)}
                      className="bg-legal-primary hover:bg-legal-primary/90 text-white"
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </div>
                </div>
                
                <Card className="p-8 mb-10 shadow-sm">
                  <div 
                    className="prose prose-gray dark:prose-invert max-w-none" 
                    dangerouslySetInnerHTML={{ __html: document.content }}
                  />
                </Card>
              </>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">
                  Document not found
                </h2>
                <p className="text-legal-secondary dark:text-legal-light/70 mb-6">
                  The document you're looking for doesn't exist or you don't have permission to view it.
                </p>
                <Button 
                  onClick={() => navigate("/dashboard")}
                  className="bg-legal-primary hover:bg-legal-primary/90 text-white"
                >
                  Return to Dashboard
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

export default DocumentViewer;
