"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import SpinLoader from "@/components/commonComponents/loader/SpinLoader";

export default function GlobalRouteLoader() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeout;
    const handleStart = () => {
      // Delay showing loader to avoid flicker on fast navs
      timeout = setTimeout(() => setLoading(true), 100);
    };
    const handleComplete = () => {
      clearTimeout(timeout);
      setLoading(false);
    };
    router.events?.on?.("routeChangeStart", handleStart);
    router.events?.on?.("routeChangeComplete", handleComplete);
    router.events?.on?.("routeChangeError", handleComplete);
    return () => {
      router.events?.off?.("routeChangeStart", handleStart);
      router.events?.off?.("routeChangeComplete", handleComplete);
      router.events?.off?.("routeChangeError", handleComplete);
      clearTimeout(timeout);
    };
  }, [router]);

  // Also hide loader on pathname change (for App Router)
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 pointer-events-none">
      <SpinLoader />
    </div>
  );
}
