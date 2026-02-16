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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Why Choose Us?</h2>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="bg-blue-100 p-2 h-fit rounded-lg text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Licensed, Bonded & Insured</h3>
                  <p className="text-slate-600">State Contractor License #109283. We carry comprehensive liability and workers' compensation insurance for your peace of mind.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-blue-100 p-2 h-fit rounded-lg text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Reliable & Punctual</h3>
                  <p className="text-slate-600">We respect your time. Our technicians arrive on schedule, in uniform, and ready to work with a fully stocked truck.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-blue-100 p-2 h-fit rounded-lg text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Satisfaction Guaranteed</h3>
                  <p className="text-slate-600">We stand behind our work. If you're not happy with our service, we'll make it right.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="space-y-6">
             <h2 className="text-2xl font-bold text-slate-900">Payment Convenience</h2>
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <p className="text-slate-600 mb-4">
                  We make it easy to do business with us. We accept all major credit cards, checks, and offer secure online bill pay.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                     <div className="w-2 h-2 rounded-full bg-green-500"></div> Visa / MasterCard
                   </div>
                   <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                     <div className="w-2 h-2 rounded-full bg-green-500"></div> American Express
                   </div>
                   <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                     <div className="w-2 h-2 rounded-full bg-green-500"></div> Discover
                   </div>
                   <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                     <div className="w-2 h-2 rounded-full bg-green-500"></div> Online Portal
                   </div>
                </div>
                <div className="flex flex-col gap-3">
                  <a href="/payment" className="w-full block text-center py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-colors">
                    Pay Invoice Online
                  </a>
                  <a href="/dashboard" className="w-full block text-center py-3 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                    Customer Portal Login
                  </a>
                </div>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
