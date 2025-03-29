
import React from "react";
import { Shield, CheckCircle } from "lucide-react";

interface TrustBadgeProps {
  type: "ai" | "verified";
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ type }) => {
  if (type === "ai") {
    return (
      <div className="trust-badge-ai">
        <Shield size={12} />
        <span>AI Secured</span>
      </div>
    );
  }

  return (
    <div className="trust-badge-verified">
      <CheckCircle size={12} />
      <span>Legally Verified</span>
    </div>
  );
};

export default TrustBadge;
