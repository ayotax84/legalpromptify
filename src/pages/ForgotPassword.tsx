import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Could not send email", description: error.message, variant: "destructive" });
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-br from-legal-primary/5 to-legal-primary/10">
        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <Shield className="h-12 w-12 text-legal-primary mx-auto" />
            <h2 className="mt-4 text-2xl font-serif font-bold">Reset your password</h2>
            <p className="mt-2 text-sm text-legal-secondary">We'll send a reset link to your email.</p>
          </div>
          {sent ? (
            <div className="text-center text-sm text-legal-secondary">
              Check your inbox for a reset link.
              <div className="mt-4"><Link to="/sign-in" className="text-legal-primary hover:underline">Back to sign in</Link></div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label>Email address</Label>
                <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <Button type="submit" className="w-full bg-legal-primary text-white hover:bg-legal-primary/90" disabled={loading}>
                {loading ? "Sending..." : "Send reset link"}
              </Button>
              <div className="text-center text-sm"><Link to="/sign-in" className="text-legal-primary hover:underline">Back to sign in</Link></div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
