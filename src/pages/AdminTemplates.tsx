import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Loader2,
  ShieldCheck,
  Plus,
  Pencil,
  Trash2,
  KeyRound,
} from "lucide-react";

interface TemplateRow {
  id: string;
  slug: string;
  name: string;
  category: string | null;
  description: string | null;
  jurisdictions: string[] | null;
  field_schema: unknown;
  required_clauses: string[] | null;
  prompt_template: string | null;
  is_premium: boolean;
  is_active: boolean;
}

const empty: Partial<TemplateRow> = {
  slug: "",
  name: "",
  category: "",
  description: "",
  jurisdictions: ["US"],
  field_schema: { sections: [] },
  required_clauses: [],
  prompt_template: "",
  is_premium: false,
  is_active: true,
};

const AdminTemplatesInner: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const { user } = useAuth();

  const [bootstrapping, setBootstrapping] = useState(false);
  const [templates, setTemplates] = useState<TemplateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<TemplateRow> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-templates", {
      method: "GET",
    });
    if (error) {
      toast({ title: "Failed to load", description: error.message, variant: "destructive" });
    } else if (data?.templates) {
      setTemplates(data.templates as TemplateRow[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  const handleBootstrap = async () => {
    setBootstrapping(true);
    const { data, error } = await supabase.functions.invoke("bootstrap-admin", {
      method: "POST",
    });
    setBootstrapping(false);
    if (error) {
      toast({ title: "Bootstrap failed", description: error.message, variant: "destructive" });
      return;
    }
    if ((data as { ok?: boolean })?.ok) {
      toast({ title: "You are now an admin", description: "Reloading…" });
      window.location.reload();
    } else {
      toast({
        title: "Already initialized",
        description: "An admin already exists. Ask them to grant you access.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const isUpdate = !!editing.id;

    // Validate JSON fields
    let field_schema = editing.field_schema;
    if (typeof field_schema === "string") {
      try {
        field_schema = JSON.parse(field_schema);
      } catch {
        setSaving(false);
        toast({ title: "Invalid field_schema JSON", variant: "destructive" });
        return;
      }
    }

    const payload = {
      ...editing,
      field_schema,
      jurisdictions:
        typeof editing.jurisdictions === "string"
          ? (editing.jurisdictions as unknown as string)
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : editing.jurisdictions,
      required_clauses:
        typeof editing.required_clauses === "string"
          ? (editing.required_clauses as unknown as string)
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean)
          : editing.required_clauses,
    };

    const { error } = await supabase.functions.invoke(
      `admin-templates?action=${isUpdate ? "update" : "create"}`,
      { body: payload },
    );

    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Saved" });
    setEditing(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Deactivate this template? It will be hidden from users.")) return;
    const { error } = await supabase.functions.invoke(
      "admin-templates?action=delete",
      { body: { id } },
    );
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Template deactivated" });
      load();
    }
  };

  if (adminLoading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="h-10 w-10 animate-spin text-legal-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-xl text-center">
        <ShieldCheck className="h-16 w-16 text-legal-primary mx-auto mb-4" />
        <h1 className="text-2xl font-serif font-bold mb-2">Admin Area</h1>
        <p className="text-legal-secondary mb-6">
          You do not have admin privileges. If you are the first user setting up
          this instance, you can claim admin access below — this only works if
          no admin exists yet.
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
          <Button
            onClick={handleBootstrap}
            disabled={bootstrapping || !user}
            className="bg-legal-primary text-white hover:bg-legal-primary/90"
          >
            {bootstrapping && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <KeyRound className="mr-2 h-4 w-4" />
            Claim Admin Access
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-legal-primary">
            Template Governance
          </h1>
          <p className="text-legal-secondary">
            Manage AI prompt templates, field schemas, and required clauses.
          </p>
        </div>
        <Button
          onClick={() => setEditing({ ...empty })}
          className="bg-legal-primary text-white hover:bg-legal-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" /> New Template
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-legal-primary" />
        </div>
      ) : (
        <div className="grid gap-4">
          {templates.map((t) => (
            <Card key={t.id} className="border-legal-light">
              <CardContent className="pt-5 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-lg font-semibold text-legal-primary">
                      {t.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {t.slug}
                    </Badge>
                    {t.is_premium && (
                      <Badge className="bg-legal-accent text-white text-xs">
                        Premium
                      </Badge>
                    )}
                    {!t.is_active && (
                      <Badge variant="destructive" className="text-xs">
                        Inactive
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-legal-secondary mb-2">
                    {t.description}
                  </p>
                  <div className="flex gap-2 flex-wrap text-xs">
                    {t.category && (
                      <Badge variant="secondary">{t.category}</Badge>
                    )}
                    {(t.jurisdictions ?? []).map((j) => (
                      <Badge key={j} variant="outline">
                        {j}
                      </Badge>
                    ))}
                    <Badge variant="outline">
                      {(t.required_clauses ?? []).length} clauses
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing(t)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(t.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing?.id ? "Edit Template" : "New Template"}
            </DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Slug</Label>
                  <Input
                    value={editing.slug ?? ""}
                    disabled={!!editing.id}
                    onChange={(e) =>
                      setEditing({ ...editing, slug: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Name</Label>
                  <Input
                    value={editing.name ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input
                    value={editing.category ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, category: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Jurisdictions (comma-separated)</Label>
                  <Input
                    value={
                      Array.isArray(editing.jurisdictions)
                        ? editing.jurisdictions.join(", ")
                        : (editing.jurisdictions as unknown as string) ?? ""
                    }
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        jurisdictions: e.target.value as unknown as string[],
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={editing.description ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Required Clauses (one per line)</Label>
                <Textarea
                  rows={5}
                  value={
                    Array.isArray(editing.required_clauses)
                      ? editing.required_clauses.join("\n")
                      : (editing.required_clauses as unknown as string) ?? ""
                  }
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      required_clauses:
                        e.target.value as unknown as string[],
                    })
                  }
                />
              </div>

              <div>
                <Label>AI Prompt Template</Label>
                <Textarea
                  rows={6}
                  className="font-mono text-sm"
                  value={editing.prompt_template ?? ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      prompt_template: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Field Schema (JSON)</Label>
                <Textarea
                  rows={10}
                  className="font-mono text-xs"
                  value={
                    typeof editing.field_schema === "string"
                      ? editing.field_schema
                      : JSON.stringify(editing.field_schema, null, 2)
                  }
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      field_schema: e.target.value as unknown,
                    })
                  }
                />
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <Switch
                    checked={!!editing.is_premium}
                    onCheckedChange={(v) =>
                      setEditing({ ...editing, is_premium: v })
                    }
                  />
                  <span className="text-sm">Premium</span>
                </label>
                <label className="flex items-center gap-2">
                  <Switch
                    checked={editing.is_active !== false}
                    onCheckedChange={(v) =>
                      setEditing({ ...editing, is_active: v })
                    }
                  />
                  <span className="text-sm">Active</span>
                </label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-legal-primary text-white hover:bg-legal-primary/90"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AdminTemplates: React.FC = () => (
  <AuthGuard>
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-legal-dark">
      <Navbar />
      <main className="flex-1">
        <AdminTemplatesInner />
      </main>
      <Footer />
    </div>
  </AuthGuard>
);

export default AdminTemplates;
