
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, Clock, CheckCircle, AlertCircle, ArrowRight, Landmark, Briefcase, Building, User } from "lucide-react";

interface Document {
  id: string;
  title: string;
  type: string;
  status: "draft" | "completed" | "pending";
  createdAt: string;
  icon: React.ReactNode;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState<string>("");
  const [userDocuments, setUserDocuments] = useState<Document[]>([]);
  const [recentTemplates, setRecentTemplates] = useState<any[]>([]);
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }
    
    // Get user name from local storage
    const storedName = localStorage.getItem("userName") || "User";
    setUserName(storedName);
    
    // Mock data for documents
    const mockDocuments: Document[] = [
      {
        id: "doc-001",
        title: "Non-Disclosure Agreement",
        type: "NDA",
        status: "completed",
        createdAt: "2023-05-15T10:30:00Z",
        icon: <FileText className="h-5 w-5 text-green-500" />
      },
      {
        id: "doc-002",
        title: "Service Contract",
        type: "Contract",
        status: "draft",
        createdAt: "2023-06-02T14:22:00Z",
        icon: <FileText className="h-5 w-5 text-blue-500" />
      },
      {
        id: "doc-003",
        title: "Employment Agreement",
        type: "Employment",
        status: "pending",
        createdAt: "2023-06-10T09:15:00Z",
        icon: <FileText className="h-5 w-5 text-yellow-500" />
      }
    ];
    
    setUserDocuments(mockDocuments);
    
    // Mock data for recent templates
    const mockTemplates = [
      {
        id: "template-001",
        title: "Non-Disclosure Agreement",
        category: "Business",
        description: "Protect your confidential information when sharing with partners.",
        icon: <Briefcase className="h-8 w-8 text-legal-primary" />
      },
      {
        id: "template-002",
        title: "Service Agreement",
        category: "Services",
        description: "Define the terms of service between provider and client.",
        icon: <Landmark className="h-8 w-8 text-legal-primary" />
      },
      {
        id: "template-003",
        title: "LLC Operating Agreement",
        category: "Business",
        description: "Establish the operating procedures for your LLC.",
        icon: <Building className="h-8 w-8 text-legal-primary" />
      },
      {
        id: "template-004",
        title: "Employment Contract",
        category: "Employment",
        description: "Set clear terms for employer-employee relationships.",
        icon: <User className="h-8 w-8 text-legal-primary" />
      }
    ];
    
    setRecentTemplates(mockTemplates);
  }, [navigate]);
  
  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
    
    navigate("/");
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "draft":
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-legal-dark">
      <Navbar />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
              Welcome, {userName}
            </h1>
            <p className="text-legal-secondary dark:text-legal-light/70 mt-2">
              Manage your legal documents and create new ones
            </p>
          </div>
          
          {/* Quick Actions */}
          <div className="mb-10">
            <h2 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border border-gray-200 dark:border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Create Document</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-legal-secondary dark:text-legal-light/70">
                  Generate a new legal document from our templates
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => navigate("/templates")}
                    className="w-full bg-legal-primary hover:bg-legal-primary/90 text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" /> New Document
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border border-gray-200 dark:border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">My Documents</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-legal-secondary dark:text-legal-light/70">
                  View and manage all your legal documents
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline"
                    className="w-full border-legal-primary text-legal-primary hover:bg-legal-primary/10"
                  >
                    <FileText className="mr-2 h-4 w-4" /> View All
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border border-gray-200 dark:border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Templates</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-legal-secondary dark:text-legal-light/70">
                  Browse our library of legal document templates
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/templates")}
                    className="w-full border-legal-primary text-legal-primary hover:bg-legal-primary/10"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" /> Browse
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border border-gray-200 dark:border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Account</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-legal-secondary dark:text-legal-light/70">
                  Manage your account settings and subscription
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline"
                    className="w-full border-legal-primary text-legal-primary hover:bg-legal-primary/10"
                  >
                    <User className="mr-2 h-4 w-4" /> Settings
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* Recent Documents */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Recent Documents
              </h2>
              <Button variant="ghost" className="text-legal-primary hover:text-legal-primary/80">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              {userDocuments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm border-b border-gray-200 dark:border-gray-700">
                        <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Title</th>
                        <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Type</th>
                        <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                        <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                        <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userDocuments.map((doc) => (
                        <tr key={doc.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {doc.icon}
                              <span className="ml-2 font-medium text-gray-900 dark:text-white">{doc.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{doc.type}</td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{formatDate(doc.createdAt)}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {getStatusIcon(doc.status)}
                              <span className="ml-2 capitalize text-gray-600 dark:text-gray-300">{doc.status}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Button 
                              variant="ghost" 
                              onClick={() => navigate(`/document/${doc.id}`)}
                              className="text-legal-primary hover:text-legal-primary/80"
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-legal-secondary dark:text-legal-light/70">
                    You haven't created any documents yet.
                  </p>
                  <Button 
                    onClick={() => navigate("/templates")}
                    className="mt-4 bg-legal-primary hover:bg-legal-primary/90 text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Create Your First Document
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Popular Templates */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Popular Templates
              </h2>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/templates")}
                className="text-legal-primary hover:text-legal-primary/80"
              >
                Browse all <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentTemplates.map((template) => (
                <Card 
                  key={template.id} 
                  className="border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-legal-primary/10 rounded-lg">
                        {template.icon}
                      </div>
                    </div>
                    <CardTitle className="mt-2 text-lg">{template.title}</CardTitle>
                    <CardDescription>{template.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-legal-secondary dark:text-legal-light/70">
                      {template.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => navigate(`/generator/${template.id}`)}
                      className="w-full bg-legal-primary hover:bg-legal-primary/90 text-white"
                    >
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
