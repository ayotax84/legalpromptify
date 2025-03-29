
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <Button 
              variant="outline" 
              className="border-legal-primary text-legal-primary hover:bg-legal-primary/10"
            >
              Sign In
            </Button>
            <Button 
              className="bg-legal-primary hover:bg-legal-primary/90 text-white"
            >
              Get Started
            </Button>
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
              <Button 
                variant="outline" 
                className="border-legal-primary text-legal-primary hover:bg-legal-primary/10 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Button>
              <Button 
                className="bg-legal-primary hover:bg-legal-primary/90 text-white w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
