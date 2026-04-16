import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, FilePlus2, Pencil, Trash2 } from "lucide-react";

import { SEO } from "@/components/seo";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { AdminCMSLayout } from "@/pages/admin-cms/layout";

type CmsPageItem = {
  id: number;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  content: string;
  heroImage: string | null;
  isPublished: boolean;
};

const inputClass =
  "w-full text-lg border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none min-h-[52px]";

const emptyForm = {
  slug: "",
  title: "",
  metaTitle: "",
  metaDescription: "",
  h1: "",
  content: "",
  heroImage: "",
  isPublished: false,
};

export default function AdminCMSPages() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<CmsPageItem[]>({
    queryKey: ["/api/admin/cms/pages"],
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 4000);
    return () => window.clearTimeout(timer);
  }, [message]);

  const deleteItem = useMemo(
    () => data?.find((item) => item.id === deleteId) ?? null,
    [data, deleteId],
  );

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        slug: form.slug.trim().toLowerCase(),
      };
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/admin/cms/pages/${editingId}` : "/api/admin/cms/pages";
      await apiRequest(method, url, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/admin/cms/pages"] });
      setMessage({ type: "success", text: "Saved! Your custom page has been updated." });
      setEditingId(null);
      setForm(emptyForm);
    },
    onError: () => {
      setMessage({ type: "error", text: "There was a problem saving the page." });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/cms/pages/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/admin/cms/pages"] });
      setDeleteId(null);
      setMessage({ type: "success", text: "Deleted! The custom page has been removed." });
    },
    onError: () => {
      setMessage({ type: "error", text: "There was a problem deleting the page." });
    },
  });

  function startEdit(item?: CmsPageItem) {
    if (item) {
      setEditingId(item.id);
      setForm({
        slug: item.slug,
        title: item.title,
        metaTitle: item.metaTitle,
        metaDescription: item.metaDescription,
        h1: item.h1,
        content: item.content,
        heroImage: item.heroImage ?? "",
        isPublished: item.isPublished,
      });
      return;
    }

    setEditingId(null);
    setForm(emptyForm);
  }

  return (
    <AdminCMSLayout
      title="Custom Web Pages"
      subtitle="Create new pages to appear on Google for specific services and cities"
    >
      <SEO title="Admin Panel" description="Admin panel" noindex={true} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
        <p className="text-lg leading-8 text-gray-700">
          Each page you create will get its own URL on your website. Creating pages for specific services and cities
          helps more customers find you on Google.
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

      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={() => startEdit()}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-xl transition-colors min-h-[52px]"
        >
          <span className="inline-flex items-center gap-3">
            <FilePlus2 className="h-6 w-6" />
            Create New Page
          </span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {editingId ? "Edit Page" : "Create a New Page"}
        </h2>

        <div className="grid gap-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Page URL</h3>
            <label className="block text-lg font-semibold text-gray-700 mb-2">URL Slug</label>
            <div className="flex items-center rounded-xl border-2 border-gray-300 bg-white">
              <span className="px-4 text-lg text-gray-500">/</span>
              <input
                className="w-full rounded-r-xl px-4 py-3 text-lg focus:outline-none min-h-[52px]"
                value={form.slug}
                onChange={(event) =>
                  setForm({
                    ...form,
                    slug: event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                  })
                }
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">Use lowercase letters and hyphens only. No spaces.</p>
            <p className="mt-3 text-base text-gray-700">
              Your page will be at: <span className="font-semibold">bernardinomartinhvac.com/{form.slug || "your-page-slug"}</span>
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Page Content</h3>
            <div className="grid gap-5">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Page Title</label>
                <p className="mb-2 text-sm text-gray-500">The main title shown at the top of your page</p>
                <input className={inputClass} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Google Search Title</label>
                <input className={inputClass} maxLength={60} value={form.metaTitle} onChange={(event) => setForm({ ...form, metaTitle: event.target.value })} />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Google Search Description</label>
                <Textarea
                  rows={4}
                  maxLength={160}
                  className="w-full text-lg border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none min-h-[140px]"
                  value={form.metaDescription}
                  onChange={(event) => setForm({ ...form, metaDescription: event.target.value })}
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Main Heading H1</label>
                <p className="mb-2 text-sm text-gray-500">The big heading people see when they visit the page</p>
                <input className={inputClass} value={form.h1} onChange={(event) => setForm({ ...form, h1: event.target.value })} />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Page Content</label>
                <p className="mb-2 text-sm text-gray-500">Write the main content of the page here. Describe the service in detail.</p>
                <Textarea
                  rows={10}
                  className="w-full text-lg border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none min-h-[260px]"
                  value={form.content}
                  onChange={(event) => setForm({ ...form, content: event.target.value })}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Page Image</h3>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Hero Image URL</label>
            <p className="mb-2 text-sm text-gray-500">Paste an image URL from your Media Library</p>
            <input className={inputClass} value={form.heroImage} onChange={(event) => setForm({ ...form, heroImage: event.target.value })} />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Publish</h3>
            <div className="rounded-xl border-2 border-gray-300 bg-white px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-gray-700">Make this page live on the website</div>
                  <div className="text-sm text-gray-500">When OFF: page exists but is not visible to visitors</div>
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, isPublished: !form.isPublished })}
                  className={`min-h-[52px] rounded-xl px-6 text-lg font-bold transition-colors ${
                    form.isPublished ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {form.isPublished ? "Published" : "Draft"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <button
              type="button"
              onClick={() => saveMutation.mutate()}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-xl transition-colors min-h-[52px]"
            >
              Save Page
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg font-bold px-8 py-4 rounded-xl transition-colors min-h-[52px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-lg text-gray-600">
          Loading custom pages...
        </div>
      ) : (
        <div className="space-y-6">
          {(data ?? []).map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="text-lg font-semibold text-blue-700">/{item.slug}</div>
                  <div className="mt-2 text-base text-gray-700">{item.title}</div>
                  <div className="mt-3">
                    <span className={`rounded-full px-4 py-2 text-base font-bold ${item.isPublished ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"}`}>
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-xl transition-colors min-h-[52px]"
                  >
                    <span className="inline-flex items-center gap-3">
                      <Pencil className="h-5 w-5" />
                      Edit
                    </span>
                  </button>
                  <a
                    href={`/${item.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg font-bold px-8 py-4 rounded-xl transition-colors min-h-[52px] inline-flex items-center gap-3"
                  >
                    <ExternalLink className="h-5 w-5" />
                    View Page
                  </a>
                  <button
                    type="button"
                    onClick={() => setDeleteId(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-lg font-bold px-8 py-4 rounded-xl transition-colors min-h-[52px]"
                  >
                    <span className="inline-flex items-center gap-3">
                      <Trash2 className="h-5 w-5" />
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteItem ? (
        <div className="fixed inset-0 z-50 bg-black/50 p-4">
          <div className="mx-auto mt-24 max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900">Delete Page</h2>
            <p className="mt-4 text-lg text-gray-700">
              Are you sure you want to delete this page? This cannot be undone.
            </p>
            <div className="mt-8 flex flex-col gap-3 md:flex-row">
              <button
                type="button"
                onClick={() => deleteMutation.mutate(deleteItem.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-lg font-bold px-8 py-4 rounded-xl transition-colors min-h-[52px]"
              >
                Yes Delete It
              </button>
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="bg-green-600 hover:bg-green-700 text-white text-lg font-bold px-8 py-4 rounded-xl transition-colors min-h-[52px]"
              >
                No Keep It
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AdminCMSLayout>
  );
}
