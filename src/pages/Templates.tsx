import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Search, Filter, Loader2, ShieldCheck, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TemplateRow {
  id: string;
  slug: string;
  name: string;
  category: string | null;
  description: string | null;
  jurisdictions: string[] | null;
  is_premium: boolean;
}

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<TemplateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [jurisdiction, setJurisdiction] = useState("all");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("id, slug, name, category, description, jurisdictions, is_premium")
        .eq("is_active", true)
        .order("category", { ascending: true })
        .order("name", { ascending: true });
      if (!error && data) setTemplates(data as TemplateRow[]);
      setLoading(false);
    })();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    templates.forEach((t) => t.category && set.add(t.category));
    return ["all", ...Array.from(set).sort()];
  }, [templates]);

  const jurisdictions = ["all", "US", "UK", "EU"];

  const filtered = templates.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      (t.description ?? "").toLowerCase().includes(q);
    const matchCat = category === "all" || t.category === category;
    const matchJur =
      jurisdiction === "all" || (t.jurisdictions ?? []).includes(jurisdiction);
    return matchSearch && matchCat && matchJur;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="py-12 bg-legal-light/30 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                Legal Document Templates
              </h1>
              <p className="text-legal-secondary dark:text-legal-light/70">
                Browse our library of professionally crafted, jurisdiction-aware
                legal templates.
              </p>
            </div>

            <div className="max-w-5xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search templates..."
                    className="pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-legal-secondary/70" />
                </div>
                <div className="w-full md:w-56">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c === "all" ? "All Categories" : c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-40">
                  <Select value={jurisdiction} onValueChange={setJurisdiction}>
                    <SelectTrigger>
                      <SelectValue placeholder="Jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      {jurisdictions.map((j) => (
                        <SelectItem key={j} value={j}>
                          {j === "all" ? "All Jurisdictions" : j}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-legal-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-legal-secondary/50 mb-4" />
                <h3 className="text-xl font-medium mb-2">No templates found</h3>
                <p className="text-legal-secondary">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {filtered.map((t) => (
                  <Link key={t.id} to={`/create/${t.slug}`} className="block group">
                    <Card className="h-full hover:shadow-lg transition-all border-legal-light hover:border-legal-primary/40">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="h-10 w-10 rounded-lg bg-legal-primary/10 flex items-center justify-center text-legal-primary">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="flex gap-1">
                            {t.is_premium && (
                              <Badge className="bg-legal-accent text-white">Premium</Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                            </Badge>
                          </div>
                        </div>
                        <h3 className="font-serif text-xl font-semibold text-legal-primary mb-2 group-hover:underline">
                          {t.name}
                        </h3>
                        <p className="text-sm text-legal-secondary mb-4 line-clamp-3">
                          {t.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-legal-secondary">
                          <div className="flex gap-1">
                            {(t.jurisdictions ?? []).map((j) => (
                              <Badge key={j} variant="secondary" className="text-[10px]">
                                {j}
                              </Badge>
                            ))}
                          </div>
                          <span className="flex items-center gap-1 text-legal-primary font-medium">
                            Generate <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <p className="text-legal-secondary mb-6">
                Don't see what you're looking for? Contact us for custom document creation.
              </p>
              <Button className="bg-legal-primary hover:bg-legal-primary/90 text-white">
                Request Custom Template
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
