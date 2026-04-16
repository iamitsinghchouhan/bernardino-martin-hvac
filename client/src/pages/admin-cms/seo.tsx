import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, Save } from "lucide-react";

import { SEO } from "@/components/seo";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { AdminCMSLayout } from "@/pages/admin-cms/layout";

type SeoItem = {
  id: number;
  pageSlug: string;
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string | null;
  isIndexed: boolean;
};

const inputClass =
  "w-full text-lg border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none min-h-[52px]";

export default function AdminCMSSeo() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<SeoItem[]>({
    queryKey: ["/api/admin/cms/seo"],
  });
  const [openId, setOpenId] = useState<number | null>(null);
  const [form, setForm] = useState<Record<string, string | boolean>>({});
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 4000);
    return () => window.clearTimeout(timer);
  }, [message]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!openId) return;
      await apiRequest("PUT", `/api/admin/cms/seo/${openId}`, {
        pageSlug: String(form.pageSlug ?? ""),
        pageTitle: String(form.pageTitle ?? ""),
        metaTitle: String(form.metaTitle ?? ""),
        metaDescription: String(form.metaDescription ?? ""),
        keywords: String(form.keywords ?? ""),
        isIndexed: Boolean(form.isIndexed),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/admin/cms/seo"] });
      setMessage({ type: "success", text: "Saved! The SEO settings were updated." });
    },
    onError: () => {
      setMessage({ type: "error", text: "There was a problem saving the SEO settings." });
    },
  });

  const currentItem = useMemo(
    () => data?.find((item) => item.id === openId) ?? null,
    [data, openId],
  );

  function openEditor(item: SeoItem) {
    setOpenId(item.id);
    setForm({
      pageSlug: item.pageSlug,
      pageTitle: item.pageTitle,
      metaTitle: item.metaTitle,
      metaDescription: item.metaDescription,
      keywords: item.keywords ?? "",
      isIndexed: item.isIndexed,
    });
  }

  return (
    <AdminCMSLayout
      title="SEO Settings"
      subtitle="Control how your pages appear in Google search results"
    >
      <SEO title="Admin Panel" description="Admin panel" noindex={true} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
        <p className="text-lg leading-8 text-gray-700">
          SEO settings help your website appear higher in Google search. Each page has its own title and
          description that Google shows to people searching.
        </p>
      </div>

      {message ? (
        <div
          className={`mb-6 rounded-2xl border px-6 py-4 text-lg font-semibold ${
            message.type === "success"
              ? "border-green-300 bg-green-100 text-green-800"
              : "border-red-300 bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      ) : null}

      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-lg text-gray-600">
          Loading SEO settings...
        </div>
      ) : (
        <div className="space-y-6">
          {(data ?? []).map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="text-lg font-semibold text-blue-700">{item.pageSlug}</div>
                  <div className="mt-2 text-base text-gray-600">{item.metaTitle}</div>
                </div>
                <button
                  type="button"
                  onClick={() => openEditor(item)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-xl transition-colors min-h-[52px]"
                >
                  <span className="inline-flex items-center gap-3">
                    <Search className="h-5 w-5" />
                    Edit SEO
                  </span>
                </button>
              </div>

              {openId === item.id && currentItem ? (
                <div className="mt-8 border-t border-gray-200 pt-8">
                  <div className="grid gap-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Page Title shown in browser tab
                      </label>
                      <p className="mb-2 text-sm text-gray-500">Keep this under 60 characters for best Google results</p>
                      <input
                        className={inputClass}
                        maxLength={60}
                        value={String(form.pageTitle ?? "")}
                        onChange={(event) => setForm({ ...form, pageTitle: event.target.value })}
                      />
                      <p className="mt-2 text-sm text-gray-500">{String(form.pageTitle ?? "").length}/60</p>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Google Search Title
                      </label>
                      <p className="mb-2 text-sm text-gray-500">This is what people see on Google search results</p>
                      <input
                        className={inputClass}
                        maxLength={60}
                        value={String(form.metaTitle ?? "")}
                        onChange={(event) => setForm({ ...form, metaTitle: event.target.value })}
                      />
                      <p className="mt-2 text-sm text-gray-500">{String(form.metaTitle ?? "").length}/60</p>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Google Search Description
                      </label>
                      <p className="mb-2 text-sm text-gray-500">A short description of this page, under 160 characters</p>
                      <Textarea
                        rows={4}
                        maxLength={160}
                        className="w-full text-lg border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none min-h-[140px]"
                        value={String(form.metaDescription ?? "")}
                        onChange={(event) => setForm({ ...form, metaDescription: event.target.value })}
                      />
                      <p className="mt-2 text-sm text-gray-500">{String(form.metaDescription ?? "").length}/160</p>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-2">Keywords</label>
                      <p className="mb-2 text-sm text-gray-500">Words people search for to find this page</p>
                      <input
                        className={inputClass}
                        value={String(form.keywords ?? "")}
                        onChange={(event) => setForm({ ...form, keywords: event.target.value })}
                      />
                    </div>

                    <div className="rounded-xl border-2 border-gray-300 bg-white px-4 py-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-lg font-semibold text-gray-700">Show in Google</div>
                          <div className="text-sm text-gray-500">
                            Turn this OFF only for pages you do not want Google to find
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, isIndexed: !Boolean(form.isIndexed) })}
                          className={`min-h-[52px] rounded-xl px-6 text-lg font-bold transition-colors ${
                            Boolean(form.isIndexed) ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {Boolean(form.isIndexed) ? "On" : "Off"}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                      <div className="text-lg font-semibold text-gray-700 mb-4">
                        This is how your page will look in Google Search
                      </div>
                      <div className="text-2xl text-blue-700">{String(form.metaTitle ?? "") || currentItem.metaTitle}</div>
                      <div className="mt-2 text-base text-green-700">
                        https://bernardinomartinhvac.com{currentItem.pageSlug}
                      </div>
                      <div className="mt-3 text-base text-gray-600">
                        {String(form.metaDescription ?? "") || currentItem.metaDescription}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => saveMutation.mutate()}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-xl transition-colors min-h-[52px] w-full md:w-auto"
                    >
                      <span className="inline-flex items-center gap-3">
                        <Save className="h-5 w-5" />
                        Save SEO Settings
                      </span>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </AdminCMSLayout>
  );
}
