import AdBanner from "@/components/AdBanner";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Mobile: ad banner above content */}
      <div className="mb-6 lg:hidden">
        <AdBanner slot="tools-top" format="horizontal" />
      </div>

      <div className="flex gap-8">
        {/* Main content */}
        <div className="min-w-0 flex-1">{children}</div>

        {/* Desktop: ad banner in sidebar */}
        <aside className="hidden w-[300px] shrink-0 lg:block">
          <div className="sticky top-24">
            <AdBanner slot="tools-sidebar" format="vertical" />
          </div>
        </aside>
      </div>
    </div>
  );
}
