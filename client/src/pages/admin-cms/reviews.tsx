import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Star, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

import { SEO } from "@/components/seo";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { AdminCMSLayout } from "@/pages/admin-cms/layout";

type ReviewItem = {
  id: number;
  customerName: string;
  location: string;
  service: string;
  review: string;
  rating: number;
  isActive: boolean;
};

const inputClass =
  "w-full text-lg border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none min-h-[52px]";

const emptyForm = {
  customerName: "",
  location: "",
  service: "",
  review: "",
  rating: 5,
  isActive: true,
};

export default function AdminCMSReviews() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<ReviewItem[]>({
    queryKey: ["/api/admin/cms/reviews"],
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 4000);
    return () => window.clearTimeout(timer);
  }, [message]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/admin/cms/reviews/${editingId}` : "/api/admin/cms/reviews";
      await apiRequest(method, url, form);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/admin/cms/reviews"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/cms/reviews"] });
      setMessage({ type: "success", text: "Saved! The review has been updated." });
      setEditingId(null);
      setForm(emptyForm);
    },
    onError: () => {
      setMessage({ type: "error", text: "There was a problem saving the review." });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (item: ReviewItem) => {
      await apiRequest("PUT", `/api/admin/cms/reviews/${item.id}`, {
        customerName: item.customerName,
        location: item.location,
        service: item.service,
        review: item.review,
        rating: item.rating,
        isActive: !item.isActive,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/admin/cms/reviews"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/cms/reviews"] });
      setMessage({ type: "success", text: "Saved! The review visibility was updated." });
    },
    onError: () => {
      setMessage({ type: "error", text: "There was a problem updating the review visibility." });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/cms/reviews/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/admin/cms/reviews"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/cms/reviews"] });
      setDeleteId(null);
      setMessage({ type: "success", text: "Deleted! The review has been removed." });
    },
    onError: () => {
      setMessage({ type: "error", text: "There was a problem deleting the review." });
    },
  });

  const activeDeleteReview = useMemo(
    () => data?.find((item) => item.id === deleteId) ?? null,
    [data, deleteId],
  );

  function startEdit(item?: ReviewItem) {
    if (item) {
      setEditingId(item.id);
      setForm({
        customerName: item.customerName,
        location: item.location,
        service: item.service,
        review: item.review,
        rating: item.rating,
        isActive: item.isActive,
      });
      return;
    }

    setEditingId(null);
    setForm(emptyForm);
  }

  return (
    <AdminCMSLayout
      title="Customer Reviews"
      subtitle="Add, edit, or remove reviews shown on your homepage"
    >
      <SEO title="Admin Panel" description="Admin panel" noindex={true} />

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

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-base text-gray-600">These reviews can appear in the homepage slider.</div>
        <button
          type="button"
          onClick={() => startEdit()}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-xl transition-colors min-h-[52px]"
        >
          <span className="inline-flex items-center gap-3">
            <Plus className="h-6 w-6" />
            Add New Review
          </span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {editingId ? "Edit Review" : "Add a New Review"}
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Customer Name</label>
            <input
              className={inputClass}
              value={form.customerName}
              onChange={(event) => setForm({ ...form, customerName: event.target.value })}
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Location</label>
            <input
              className={inputClass}
              value={form.location}
              onChange={(event) => setForm({ ...form, location: event.target.value })}
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Service</label>
            <input
              className={inputClass}
              value={form.service}
              onChange={(event) => setForm({ ...form, service: event.target.value })}
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Star Rating</label>
            <div className="flex min-h-[52px] items-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-4 py-3">
              {Array.from({ length: 5 }).map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <button
                    key={ratingValue}
                    type="button"
                    onClick={() => setForm({ ...form, rating: ratingValue })}
                    className="text-yellow-400"
                  >
                    <Star className={`h-8 w-8 ${ratingValue <= form.rating ? "fill-current" : ""}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Review Text</label>
          <Textarea
            rows={6}
            className="w-full text-lg border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none min-h-[180px]"
            value={form.review}
            onChange={(event) => setForm({ ...form, review: event.target.value })}
          />
        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl border-2 border-gray-300 bg-white px-4 py-3">
          <div>
            <div className="text-lg font-semibold text-gray-700">Show on Website</div>
            <div className="text-sm text-gray-500">Turn this on to show the review publicly.</div>
          </div>
          <button
            type="button"
            onClick={() => setForm({ ...form, isActive: !form.isActive })}
            className={`min-h-[52px] rounded-xl px-6 text-lg font-bold transition-colors ${
              form.isActive ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"
            }`}
          >
            {form.isActive ? "On" : "Off"}
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3 md:flex-row">
          <button
            type="button"
            onClick={() => saveMutation.mutate()}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-xl transition-colors min-h-[52px]"
          >
            Save Review
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

      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-lg text-gray-600">
          Loading reviews...
        </div>
      ) : (
        <div className="space-y-6">
          {(data ?? []).map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-semibold text-gray-800">{item.customerName}</h2>
                    <span className={`rounded-full px-4 py-2 text-base font-bold ${item.isActive ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"}`}>
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="mt-2 text-base text-gray-500">
                    {item.service} • {item.location}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: item.rating }).map((_, index) => (
                      <Star key={index} className="h-6 w-6 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-base leading-8 text-gray-700">{item.review}</p>
                </div>

                <div className="flex flex-col gap-3 md:flex-row lg:flex-col">
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
                  <button
                    type="button"
                    onClick={() => toggleMutation.mutate(item)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg font-bold px-8 py-4 rounded-xl transition-colors min-h-[52px]"
                  >
                    <span className="inline-flex items-center gap-3">
                      {item.isActive ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      {item.isActive ? "Hide from Website" : "Show on Website"}
                    </span>
                  </button>
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

      {activeDeleteReview ? (
        <div className="fixed inset-0 z-50 bg-black/50 p-4">
          <div className="mx-auto mt-24 max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900">Delete Review</h2>
            <p className="mt-4 text-lg text-gray-700">
              Are you sure you want to delete this review? This cannot be undone.
            </p>
            <div className="mt-8 flex flex-col gap-3 md:flex-row">
              <button
                type="button"
                onClick={() => deleteMutation.mutate(activeDeleteReview.id)}
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
