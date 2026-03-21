"use client";

import { useEffect, useRef } from "react";

/**
 * Google AdSense Ad Banner Component
 *
 * To get your real AdSense publisher ID and ad slot:
 * 1. Sign up at https://www.google.com/adsense/
 * 2. Get approved for your site
 * 3. Replace "ca-pub-XXXXXXXXXX" below with your actual publisher ID (e.g. "ca-pub-1234567890123456")
 * 4. Create ad units in your AdSense dashboard and use the slot IDs when rendering this component
 */

const AD_CLIENT = "ca-pub-1707684527667915";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical";
  className?: string;
}

export default function AdBanner({
  slot,
  format = "auto",
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    if (isAdLoaded.current) return;

    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      isAdLoaded.current = true;
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  const minHeight =
    format === "horizontal"
      ? "min-h-[90px]"
      : format === "vertical"
        ? "min-h-[250px]"
        : "min-h-[100px]";

  return (
    <div
      ref={adRef}
      className={`flex items-center justify-center overflow-hidden ${minHeight} ${className}`}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
