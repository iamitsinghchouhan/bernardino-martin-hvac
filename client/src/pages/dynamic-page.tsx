import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";

import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import NotFound from "@/pages/not-found";

type DynamicCmsPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  content: string;
  heroImage: string | null;
};

export default function DynamicPage() {
  const [match, params] = useRoute("/:slug");
  const slug = params?.slug;

  const { data, isLoading, error } = useQuery<DynamicCmsPage>({
    queryKey: slug ? [`/api/cms/pages/${slug}`] : ["/api/cms/pages/unknown"],
    enabled: Boolean(match && slug),
  });

  if (!match || !slug) {
    return <NotFound />;
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center bg-white">
          <div className="h-10 w-10 rounded-full border-4 border-blue-700 border-t-transparent animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return <NotFound />;
  }

  return (
    <Layout>
      <SEO title={data.metaTitle} description={data.metaDescription} />

      <section className="relative overflow-hidden py-24 text-white">
        {data.heroImage ? (
          <img
            src={data.heroImage}
            alt={data.h1}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        ) : null}
        <div className="absolute inset-0 bg-blue-950/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <p className="text-lg font-semibold text-blue-100">{data.title}</p>
            <h1 className="mt-4 text-4xl font-bold md:text-6xl">{data.h1}</h1>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="whitespace-pre-line text-lg leading-8 text-slate-700">{data.content}</div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
