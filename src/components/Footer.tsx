
import React from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-legal-light/30 dark:bg-legal-dark border-t border-legal-light dark:border-legal-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-serif font-bold text-xl text-legal-primary dark:text-white">
              <Shield className="w-6 h-6 text-legal-primary dark:text-legal-accent" />
              <span>LegalPromptify</span>
            </Link>
            <p className="text-legal-secondary dark:text-legal-light/70 text-sm">
              AI-powered legal document generator for instant, customizable, and jurisdiction-specific legal agreements.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-legal-secondary hover:text-legal-primary dark:text-legal-light/70 dark:hover:text-legal-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-legal-secondary hover:text-legal-primary dark:text-legal-light/70 dark:hover:text-legal-accent transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-legal-secondary hover:text-legal-primary dark:text-legal-light/70 dark:hover:text-legal-accent transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-medium text-lg mb-4 text-legal-primary dark:text-white">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/templates" className="text-legal-secondary hover:text-legal-primary dark:text-legal-light/70 dark:hover:text-white transition-colors">
                  Document Templates
                </Link>
              </li>
              <li>
                <Link to="/custom" className="text-legal-secondary hover:text-legal-primary dark:text-legal-light/70 dark:hover:text-white transition-colors">
                  Custom Contracts
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-legal-secondary hover:text-legal-primary dark:text-legal-light/70 dark:hover:text-white transition-colors">
                  API Integration
                </Link>
              </li>
              <li>
                <Link to="/signature" className="text-legal-secondary hover:text-legal-primary dark:text-legal-light/70 dark:hover:text-white transition-colors">
                  E-Signature
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-medium text-lg mb-4 text-legal-primary dark:text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-legal-secondary hover:text-legal-primary dark:text-legal-light/70 dark:hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-legal-secondary hover:text-legal-primary dark:text-legal-light/70 dark:hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-legal-secondary hover:text-legal-primary dark:text-legal-light/70 dark:hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-legal-secondary hover:text-legal-primary dark:text-legal-light/70 dark:hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-medium text-lg mb-4 text-legal-primary dark:text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-legal-secondary dark:text-legal-light/70">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>123 Legal Avenue, Suite 456, San Francisco, CA 94105</span>
              </li>
              <li className="flex items-center gap-2 text-legal-secondary dark:text-legal-light/70">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-legal-secondary dark:text-legal-light/70">
                <Mail size={18} />
                <span>support@legalpromptify.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-legal-light dark:border-legal-secondary/30 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-legal-secondary dark:text-legal-light/70">
          <p>© 2023 LegalPromptify. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-legal-primary dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-legal-primary dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="hover:text-legal-primary dark:hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
