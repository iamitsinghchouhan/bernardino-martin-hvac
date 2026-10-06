import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { SEO } from "@/components/seo";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <SEO
        title="Page Not Found"
        description="This page could not be found. Browse our HVAC, solar, plumbing, and electrical services in Los Angeles."
        noindex
      />
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-gray-900">Page not found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            The page you were looking for has moved or doesn't exist.
          </p>
          <p className="mt-4 text-sm">
            <Link href="/" className="font-semibold text-[var(--rb-orange-text)] hover:underline">
              Return to the homepage
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
