import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import DynamicDocumentForm, {
  FieldSchema,
} from "@/components/DynamicDocumentForm";
import {
  ArrowLeft,
  CheckCircle,
  PenSquare,
  Download,
  Printer,
  CopyPlus,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Template {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  field_schema: FieldSchema | null;
  jurisdictions: string[] | null;
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
  const [formData, setFormData] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("templates")
        .select("id, slug, name, description, field_schema, jurisdictions")
        .eq("slug", type as string)
        .eq("is_active", true)
        .maybeSingle();
      if (!error && data) setTemplate(data as unknown as Template);
      setIsLoading(false);
    };
    if (type) fetchTemplate();
  }, [type]);

  const handleFormComplete = async (data: Record<string, unknown>) => {
    if (!template) return;
    setGenerating(true);
    try {
      const jurisdiction =
        (data.jurisdiction as string) ||
        template.jurisdictions?.[0] ||
        "United States";

      const { data: result, error } = await supabase.functions.invoke(
        "generate-document",
        {
          body: {
            documentType: template.name,
            title: template.name,
            templateSlug: template.slug,
            jurisdiction,
            formData: data,
          },
        },
      );

      if (error) throw error;
      if ((result as { error?: string })?.error)
        throw new Error(
          (result as { message?: string; error?: string }).message ??
            (result as { error?: string }).error,
        );

      setGeneratedHtml((result as { html: string }).html);
      setFormData(data);
      setDocumentGenerated(true);

      toast({
        title: "Document generated",
        description: (result as { verified?: boolean }).verified
          ? "AI-drafted and verified for completeness."
          : "Document drafted by AI.",
      });
    } catch (e) {
      console.error(e);
      const msg = e instanceof Error ? e.message : "Could not generate document.";
      toast({
        title: "Generation failed",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const blob = new Blob(
      [
        `<!doctype html><html><head><meta charset="utf-8"><title>${
          template?.name ?? "Document"
        }</title></head><body>${generatedHtml}</body></html>`,
      ],
      { type: "text/html" },
    );
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${(template?.name ?? "document")
      .replace(/\s+/g, "-")
      .toLowerCase()}.html`;
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
        title: template.name,
        template_slug: template.slug,
        status: "ready",
        jurisdiction: (formData?.jurisdiction as string) ?? "US",
        form_data: (formData ?? {}) as never,
        content_html: generatedHtml,
      })
      .select("id")
      .single();
    setSaving(false);

    if (error || !data) {
      toast({
        title: "Save failed",
        description: error?.message ?? "Unknown error",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Document saved",
      description: "Your document is now in your dashboard.",
    });
    navigate(`/document/${data.id}`);
  };

  const handleCreateNew = () => {
    setDocumentGenerated(false);
    setGeneratedHtml("");
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
              onClick={() =>
                navigate(documentGenerated ? "/dashboard" : "/templates")
              }
              className="mb-6 flex items-center text-legal-secondary hover:text-legal-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {documentGenerated ? "Dashboard" : "Templates"}
            </Button>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-legal-primary" />
              </div>
            ) : template ? (
              <>
                {!documentGenerated ? (
                  <>
                    <div className="mb-8">
                      <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                        {template.name}
                      </h1>
                      <p className="text-legal-secondary dark:text-legal-light/70">
                        {template.description}
                      </p>
                    </div>

                    <div className="max-w-4xl mx-auto relative">
                      {generating && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-legal-dark/80 rounded-lg backdrop-blur-sm">
                          <div className="flex flex-col items-center gap-3 text-legal-primary">
                            <Loader2 className="h-10 w-10 animate-spin" />
                            <p className="font-medium">
                              AI is drafting your document…
                            </p>
                            <p className="text-sm text-legal-secondary">
                              Running verification pass for legal completeness.
                            </p>
                          </div>
                        </div>
                      )}
                      {template.field_schema ? (
                        <DynamicDocumentForm
                          schema={template.field_schema}
                          submitting={generating}
                          onSubmit={handleFormComplete}
                        />
                      ) : (
                        <div className="text-center py-12 text-legal-secondary">
                          This template has no field schema configured.
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                      <div>
                        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-1">
                          {template.name}
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
                          {saving ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <PenSquare className="mr-2 h-4 w-4" />
                          )}
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
                  The template you're looking for doesn't exist or is no longer
                  available.
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
