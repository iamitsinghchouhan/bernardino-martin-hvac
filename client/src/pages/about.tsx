import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";

export default function About() {
  return (
    <Layout>
      <SEO title="About Us" description="Learn about LA Solar & HVAC Experts - your trusted local partners for heating, cooling, and solar energy." />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-heading font-bold mb-6">About Us</h1>
        <p className="text-lg text-slate-600 mb-8">
          LA Solar & HVAC Experts is a locally owned and operated business dedicated to providing top-quality heating, cooling, and solar solutions to Los Angeles residents and businesses.
        </p>
        <p className="text-lg text-slate-600">
          With years of experience and a team of certified technicians, we ensure your home stays comfortable and energy-efficient year-round.
        </p>
      </div>
    </Layout>
  );
}
