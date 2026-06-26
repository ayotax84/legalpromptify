import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, Clock, CheckCircle, AlertCircle, ArrowRight, User, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

type DocRow = {
  id: string;
  title: string;
  template_slug: string;
  status: string;
  created_at: string;
};

const statusIcon: Record<string, JSX.Element> = {
  ready: <CheckCircle className="h-5 w-5 text-green-500" />,
  signed: <CheckCircle className="h-5 w-5 text-green-600" />,
  draft: <AlertCircle className="h-5 w-5 text-blue-500" />,
  generating: <Clock className="h-5 w-5 text-yellow-500" />,
  archived: <Clock className="h-5 w-5 text-gray-400" />,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [docs, setDocs] = useState<DocRow[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const userName =
    (user?.user_metadata?.full_name as string | undefined) ?? user?.email?.split("@")[0] ?? "there";

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [{ data: docRows, error: docErr }, { data: tplRows }] = await Promise.all([
        supabase
          .from("documents")
          .select("id, title, template_slug, status, created_at")
          .order("created_at", { ascending: false })
          .limit(10),
        supabase.from("templates").select("*").eq("is_active", true).limit(4),
      ]);
      if (docErr) toast({ title: "Could not load documents", description: docErr.message, variant: "destructive" });
      setDocs((docRows as DocRow[]) ?? []);
      setTemplates(tplRows ?? []);
      setLoading(false);
    };
    load();
  }, [user, toast]);

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(new Date(iso));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-gray-900">Welcome, {userName}</h1>
            <p className="text-legal-secondary mt-2">Manage your legal documents and create new ones</p>
          </div>

          <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-lg">Create Document</CardTitle></CardHeader>
              <CardContent className="text-sm text-legal-secondary">Generate a new legal document from our templates</CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/templates")} className="w-full bg-legal-primary text-white hover:bg-legal-primary/90">
                  <Plus className="mr-2 h-4 w-4" /> New Document
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-lg">Templates</CardTitle></CardHeader>
              <CardContent className="text-sm text-legal-secondary">Browse our library of legal document templates</CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => navigate("/templates")} className="w-full border-legal-primary text-legal-primary hover:bg-legal-primary/10">
                  <ArrowRight className="mr-2 h-4 w-4" /> Browse
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-lg">Account</CardTitle></CardHeader>
              <CardContent className="text-sm text-legal-secondary">Manage your account and subscription</CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => navigate("/pricing")} className="w-full border-legal-primary text-legal-primary hover:bg-legal-primary/10">
                  <User className="mr-2 h-4 w-4" /> Plans
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-medium mb-4 text-gray-900">Recent Documents</h2>
            <div className="bg-white rounded-lg shadow">
              {loading ? (
                <div className="p-12 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-legal-primary" /></div>
              ) : docs.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-legal-secondary">You haven't created any documents yet.</p>
                  <Button onClick={() => navigate("/templates")} className="mt-4 bg-legal-primary text-white hover:bg-legal-primary/90">
                    <Plus className="mr-2 h-4 w-4" /> Create Your First Document
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm border-b">
                        <th className="px-6 py-3 font-medium text-gray-500">Title</th>
                        <th className="px-6 py-3 font-medium text-gray-500">Type</th>
                        <th className="px-6 py-3 font-medium text-gray-500">Date</th>
                        <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                        <th className="px-6 py-3 font-medium text-gray-500"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {docs.map((d) => (
                        <tr key={d.id} className="border-b last:border-0">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-legal-primary" />
                              <span className="ml-2 font-medium text-gray-900">{d.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{d.template_slug}</td>
                          <td className="px-6 py-4 text-gray-600">{formatDate(d.created_at)}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {statusIcon[d.status] ?? <AlertCircle className="h-5 w-5 text-gray-400" />}
                              <span className="ml-2 capitalize text-gray-600">{d.status}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" onClick={() => navigate(`/document/${d.id}`)} className="text-legal-primary">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900">Popular Templates</h2>
              <Button variant="ghost" onClick={() => navigate("/templates")} className="text-legal-primary">
                Browse all <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            {templates.length === 0 ? (
              <p className="text-sm text-legal-secondary">No templates yet — they'll appear once seeded.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {templates.map((t) => (
                  <Card key={t.id}>
                    <CardHeader>
                      <div className="p-3 bg-legal-primary/10 rounded-lg w-fit">
                        <FileText className="h-8 w-8 text-legal-primary" />
                      </div>
                      <CardTitle className="mt-2 text-lg">{t.name}</CardTitle>
                      <CardDescription>{t.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-legal-secondary line-clamp-3">{t.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => navigate(`/create/${t.slug}`)} className="w-full bg-legal-primary text-white hover:bg-legal-primary/90">
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
