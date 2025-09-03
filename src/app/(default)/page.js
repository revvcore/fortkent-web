import { siteIdentity } from "@/data/siteIdentity";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <img
        src={siteIdentity.logo}
        alt={siteIdentity.name}
        className="w-32 h-auto"
      />
    </div>
  );
}
