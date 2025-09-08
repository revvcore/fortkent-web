import { useEffect, useState } from "react";

export const useDevice = () => {
  const [IsWeb, setIsWeb] = useState(false);
  const [IsTab, setIsTab] = useState(false);
  const [IsMob, setIsMob] = useState(false);

  useEffect(() => {
    setIsWeb(window.innerWidth >= 1024);
    setIsTab(window.innerWidth < 1024 && window.innerWidth >= 768);
    setIsMob(window.innerWidth < 768);
    window.addEventListener("resize", () => {
      setIsWeb(window.innerWidth >= 1024);
      setIsTab(window.innerWidth < 1024 && window.innerWidth >= 768);
      setIsMob(window.innerWidth < 768);
    });
  }, []);

  return { IsWeb, IsTab, IsMob };
};
