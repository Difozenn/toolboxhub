import Link from "next/link";
import JsonLd from "./JsonLd";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = generateBreadcrumbJsonLd(items);

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <JsonLd data={jsonLd} />

      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-1">
              {index > 0 && (
                <span aria-hidden="true" className="text-gray-400">
                  /
                </span>
              )}

              {isLast ? (
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
