import MarkDownRenderer from "@/components/commonComponents/markdown/MarkDownRenderer";
import { privacyPolicyContent } from "@/data/privacyPolicy";

export default function PrivacyPolicyPage() {
  return (
    <div>
      <div className="section-container py-12">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <MarkDownRenderer content={privacyPolicyContent} />
      </div>
    </div>
  );
}
