import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { COMPANY_NAME } from "@/lib/constants";

export default function About() {
  return (
    <Layout>
      <SEO title="About Us" description={`Learn about ${COMPANY_NAME} - your trusted local partners for heating, cooling, solar energy, and plumbing.`} />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-heading font-bold mb-6">About Us</h1>
        <p className="text-lg text-slate-600 mb-8">
          {COMPANY_NAME} is a locally owned and operated business dedicated to providing top-quality heating, cooling, solar, and plumbing solutions to Los Angeles residents and businesses.
        </p>
        <p className="text-lg text-slate-600">
          With years of experience and a team of certified technicians, we ensure your home stays comfortable, efficient, and safe year-round.
        </p>
      </div>
    </Layout>
  );
}
