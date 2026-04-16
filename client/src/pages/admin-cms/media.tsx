import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Copy, ImagePlus, Trash2 } from "lucide-react";

import { SEO } from "@/components/seo";
import { apiRequest } from "@/lib/queryClient";
import { AdminCMSLayout } from "@/pages/admin-cms/layout";

type MediaItem = {
  id: number;
  filename: string;
  originalName: string;
  url: string;
  size: number | null;
  mimeType: string | null;
  altText: string | null;
};

export default function AdminCMSMedia() {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data, isLoading } = useQuery<MediaItem[]>({
    queryKey: ["/api/admin/cms/media"],
  });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 4000);
    return () => window.clearTimeout(timer);
  }, [message]);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("Unable to read image"));
        reader.readAsDataURL(file);
      });

      await apiRequest("POST", "/api/admin/cms/media/upload", {
        base64,
        filename: file.name,
        mimeType: file.type,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/admin/cms/media"] });
      setMessage({ type: "success", text: "Image uploaded successfully!" });
    },
    onError: () => {
      setMessage({ type: "error", text: "There was a problem uploading the image." });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/cms/media/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/admin/cms/media"] });
      setDeleteId(null);
      setMessage({ type: "success", text: "Deleted! The image has been removed." });
    },
    onError: () => {
      setMessage({ type: "error", text: "There was a problem deleting the image." });
    },
  });

  async function copyUrl(url: string) {
    const fullUrl = `${window.location.origin}${url}`;
    await navigator.clipboard.writeText(fullUrl);
    setMessage({ type: "success", text: "Image URL copied! You can now paste it anywhere." });
  }

  return (
    <AdminCMSLayout
      title="Media Library"
      subtitle="Upload, view, and manage all your website images"
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            if (file.size > 5 * 1024 * 1024) {
              setMessage({ type: "error", text: "Please choose an image under 5MB." });
              return;
            }
            uploadMutation.mutate(file);
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full rounded-3xl border-2 border-dashed border-blue-300 bg-blue-50 px-6 py-12 text-center transition-colors hover:bg-blue-100"
        >
          <ImagePlus className="mx-auto h-16 w-16 text-blue-600" />
          <div className="mt-4 text-2xl font-bold text-gray-900">Click here to upload an image</div>
          <div className="mt-2 text-base text-gray-600">
            Accepted formats: JPG, PNG, WebP. Maximum size: 5MB
          </div>
        </button>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-lg text-gray-600">
          Loading images...
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {(data ?? []).map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-[200px] bg-gray-100">
                <img
                  src={item.url}
                  alt={item.altText || item.originalName}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-5">
                <div className="truncate text-base font-semibold text-gray-800">{item.originalName}</div>
                <div className="mt-4 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-6 py-3 rounded-xl transition-colors min-h-[52px]"
                  >
                    <span className="inline-flex items-center gap-3">
                      <Copy className="h-5 w-5" />
                      Copy URL
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-lg font-bold px-6 py-3 rounded-xl transition-colors min-h-[52px]"
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

      {deleteId ? (
        <div className="fixed inset-0 z-50 bg-black/50 p-4">
          <div className="mx-auto mt-24 max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900">Delete Image</h2>
            <p className="mt-4 text-lg text-gray-700">
              Are you sure you want to delete this image? This cannot be undone.
            </p>
            <div className="mt-8 flex flex-col gap-3 md:flex-row">
              <button
                type="button"
                onClick={() => deleteMutation.mutate(deleteId)}
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
