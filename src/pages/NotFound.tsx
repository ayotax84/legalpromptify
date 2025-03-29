
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center px-4">
          <div className="flex justify-center mb-6">
            <div className="bg-legal-light/50 dark:bg-legal-dark/50 h-24 w-24 rounded-full flex items-center justify-center">
              <FileQuestion className="h-12 w-12 text-legal-primary dark:text-legal-accent" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">404</h1>
          <p className="text-xl text-legal-secondary dark:text-legal-light/70 mb-8 max-w-lg mx-auto">
            Oops! We couldn't find the legal document you're looking for. It may have been moved or doesn't exist.
          </p>
          <Link to="/">
            <Button className="bg-legal-primary hover:bg-legal-primary/90 text-white">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
