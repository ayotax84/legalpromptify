
import React from "react";
import { Shield, CheckCircle } from "lucide-react";

interface TrustBadgeProps {
  type: "ai" | "verified";
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ type }) => {
  if (type === "ai") {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
        <Shield size={12} className="text-blue-500" />
        <span>AI Secured</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
      <CheckCircle size={12} className="text-green-500" />
      <span>Legally Verified</span>
    </div>
  );
};

export default TrustBadge;
