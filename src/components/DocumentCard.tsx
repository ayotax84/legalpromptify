
import React from "react";
import { FileText, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import TrustBadge from "./TrustBadge";

interface DocumentCardProps {
  title: string;
  description: string;
  time: string;
  icon?: React.ReactNode;
  to: string;
  isVerified?: boolean;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  description,
  time,
  icon,
  to,
  isVerified = false,
}) => {
  return (
    <Link 
      to={to} 
      className="legal-card p-5 group hover:translate-y-[-2px] block"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3 items-center">
          <div className="text-legal-primary dark:text-legal-accent">
            {icon || <FileText size={24} />}
          </div>
          <h3 className="font-serif font-medium text-lg">{title}</h3>
        </div>
        <ChevronRight 
          size={20} 
          className="text-legal-secondary/50 transition-transform duration-300 group-hover:translate-x-1" 
        />
      </div>
      <p className="text-legal-secondary dark:text-legal-light/70 text-sm mb-4">
        {description}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-xs text-legal-secondary/70">
          <Clock size={14} />
          <span>{time}</span>
        </div>
        {isVerified && <TrustBadge type="verified" />}
      </div>
    </Link>
  );
};

export default DocumentCard;
