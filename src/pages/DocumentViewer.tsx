
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Share, Printer, ArrowLeft, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DocumentRow {
  id: string;
  title: string;
  template_slug: string;
  status: string;
  created_at: string;
  updated_at: string;
  content_html: string | null;
  jurisdiction: string;
}

const DocumentViewer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [doc, setDoc] = useState<DocumentRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("documents")
        .select("id, title, template_slug, status, created_at, updated_at, content_html, jurisdiction")
        .eq("id", id)
        .maybeSingle();
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
      setDoc((data as DocumentRow) ?? null);
      setIsLoading(false);
    };
    load();
  }, [id, toast]);

  const getStatusBadge = (status: string) => {
    const map: Record<string, { cls: string; icon: JSX.Element; label: string }> = {
      ready: { cls: "bg-green-100 text-green-800", icon: <CheckCircle className="h-3 w-3" />, label: "Ready" },
      signed: { cls: "bg-emerald-100 text-emerald-800", icon: <CheckCircle className="h-3 w-3" />, label: "Signed" },
      draft: { cls: "bg-blue-100 text-blue-800", icon: <AlertCircle className="h-3 w-3" />, label: "Draft" },
      generating: { cls: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-3 w-3" />, label: "Generating" },
      archived: { cls: "bg-gray-100 text-gray-700", icon: <Clock className="h-3 w-3" />, label: "Archived" },
    };
    const cfg = map[status] ?? map.draft;
    return <Badge className={`${cfg.cls} flex items-center gap-1`}>{cfg.icon} {cfg.label}</Badge>;
  };

  const formatDate = (s: string) =>
    new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(s));

  const handlePrint = () => window.print();

  const handleDownload = () => {
    if (!doc?.content_html) return;
    const blob = new Blob(
      [`<!doctype html><html><head><meta charset="utf-8"><title>${doc.title}</title></head><body>${doc.content_html}</body></html>`],
      { type: "text/html" }
    );
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${doc.title.replace(/\s+/g, "-").toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied", description: "Share link copied to clipboard." });
    } catch {
      toast({ title: "Share", description: url });
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-gray-50">
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
                <div className="animate-pulse w-full max-w-3xl">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-10" />
                  <div className="h-64 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ) : doc ? (
              <>
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">{doc.title}</h1>
                    <div className="flex flex-wrap items-center gap-3 text-legal-secondary">
                      <span>Last updated: {formatDate(doc.updated_at)}</span>
                      <span>Type: {doc.template_slug}</span>
                      <span>Jurisdiction: {doc.jurisdiction}</span>
                      {getStatusBadge(doc.status)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                    <Button variant="outline" onClick={handlePrint} className="border-legal-primary text-legal-primary hover:bg-legal-primary/10">
                      <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                    <Button variant="outline" onClick={handleDownload} className="border-legal-primary text-legal-primary hover:bg-legal-primary/10">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                    <Button variant="outline" onClick={handleShare} className="border-legal-primary text-legal-primary hover:bg-legal-primary/10">
                      <Share className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </div>
                </div>

                <Card className="p-8 mb-10 shadow-sm">
                  <div
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ __html: doc.content_html ?? "<p>No content.</p>" }}
                  />
                </Card>
              </>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-medium text-gray-900 mb-4">Document not found</h2>
                <p className="text-legal-secondary mb-6">
                  The document you're looking for doesn't exist or you don't have permission to view it.
                </p>
                <Button onClick={() => navigate("/dashboard")} className="bg-legal-primary hover:bg-legal-primary/90 text-white">
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
