import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, LogOut, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const isAuthenticated = !!user;
  const userName = (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0] ?? user?.email?.split("@")[0] ?? "User";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out" });
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-legal-dark border-b border-legal-light dark:border-legal-secondary/30 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-serif font-bold text-2xl text-legal-primary dark:text-white"
        >
          <Shield className="w-7 h-7 text-legal-primary dark:text-legal-accent" />
          <span>LegalPromptify</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            <Link 
              to="/" 
              className="font-medium text-legal-secondary hover:text-legal-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/templates" 
              className="font-medium text-legal-secondary hover:text-legal-primary transition-colors"
            >
              Templates
            </Link>
            <Link 
              to="/pricing" 
              className="font-medium text-legal-secondary hover:text-legal-primary transition-colors"
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="font-medium text-legal-secondary hover:text-legal-primary transition-colors"
            >
              About
            </Link>
          </div>
          <div className="flex gap-3">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/dashboard")}
                  className="border-legal-primary text-legal-primary hover:bg-legal-primary/10"
                >
                  <User className="mr-2 h-4 w-4" />
                  {userName}'s Dashboard
                </Button>
                <Button 
                  onClick={handleSignOut}
                  className="bg-legal-primary hover:bg-legal-primary/90 text-white"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/sign-in")}
                  className="border-legal-primary text-legal-primary hover:bg-legal-primary/10"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate("/sign-up")}
                  className="bg-legal-primary hover:bg-legal-primary/90 text-white"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-legal-secondary" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-legal-dark border-b border-legal-light dark:border-legal-secondary/30 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="font-medium p-2 text-legal-secondary hover:text-legal-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/templates" 
              className="font-medium p-2 text-legal-secondary hover:text-legal-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
            <Link 
              to="/pricing" 
              className="font-medium p-2 text-legal-secondary hover:text-legal-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="font-medium p-2 text-legal-secondary hover:text-legal-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col gap-3 mt-2">
              {isAuthenticated ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate("/dashboard");
                      setIsMenuOpen(false);
                    }}
                    className="border-legal-primary text-legal-primary hover:bg-legal-primary/10 w-full"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button 
                    onClick={handleSignOut}
                    className="bg-legal-primary hover:bg-legal-primary/90 text-white w-full"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate("/sign-in");
                      setIsMenuOpen(false);
                    }}
                    className="border-legal-primary text-legal-primary hover:bg-legal-primary/10 w-full"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate("/sign-up");
                      setIsMenuOpen(false);
                    }}
                    className="bg-legal-primary hover:bg-legal-primary/90 text-white w-full"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
