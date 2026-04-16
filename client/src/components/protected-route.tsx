import { type ComponentType, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";

export function ProtectedRoute({ component: Component }: { component: ComponentType }) {
  const [, navigate] = useLocation();
  const { data, isLoading } = useQuery<{ isAdmin: boolean } | null>({
    queryKey: ["/api/admin/me"],
  });

  useEffect(() => {
    if (!isLoading && !data?.isAdmin) {
      navigate("/admin/login");
    }
  }, [data, isLoading, navigate]);

  if (isLoading || !data?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-10 w-10 rounded-full border-4 border-blue-700 border-t-transparent animate-spin" />
      </div>
    );
  }

  return <Component />;
}
