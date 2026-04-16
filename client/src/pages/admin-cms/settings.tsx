import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Facebook, Instagram, Save, Youtube } from "lucide-react";

import { SEO } from "@/components/seo";
import { Switch } from "@/components/ui/switch";
import { apiRequest } from "@/lib/queryClient";
import { AdminCMSLayout } from "@/pages/admin-cms/layout";

type SettingItem = {
  id: number;
  key: string;
  value: string;
  label: string;
  type: string;
};

const inputClass =
  "w-full text-lg border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none min-h-[52px]";

function helperFor(key: string) {
  switch (key) {
    case "phone":
      return "This phone number appears on your website and call buttons.";
    case "email":
      return "Customers will use this email to contact your business.";
    case "address":
      return "Show the main city or business address visitors should see.";
    case "whatsapp":
      return "Enter the WhatsApp number without symbols if possible.";
    case "tagline":
      return "This is the short line shown near your business name.";
    default:
      return "Update this information carefully, then save your changes.";
  }
}

export default function AdminCMSSettings() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<SettingItem[]>({
    queryKey: ["/api/admin/cms/settings"],
  });
  const [form, setForm] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (data) {
      setForm(Object.fromEntries(data.map((item) => [item.key, item.value])));
    }
  }, [data]);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 4000);
    return () => window.clearTimeout(timer);
  }, [message]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!data) return;
      for (const item of data) {
        await apiRequest("PUT", `/api/admin/cms/settings/${item.key}`, { value: form[item.key] ?? "" });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/admin/cms/settings"] });
      setMessage({ type: "success", text: "Saved! Your business information has been updated." });
    },
    onError: () => {
      setMessage({ type: "error", text: "There was a problem saving your changes. Please try again." });
    },
  });

  const sections = useMemo(
    () => ({
      contact: ["phone", "email", "address", "whatsapp"],
      social: ["facebook", "instagram", "youtube"],
      tagline: ["tagline"],
    }),
    [],
  );

  const settingsByKey = useMemo(
    () => new Map((data ?? []).map((item) => [item.key, item])),
    [data],
  );

  const socialIcons: Record<string, typeof Facebook> = {
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
  };

  function renderField(key: string) {
    const item = settingsByKey.get(key);
    if (!item) return null;

    const isBoolean = item.type === "boolean";
    const SocialIcon = socialIcons[key];

    return (
      <div key={key} className="mb-6">
        <label className="mb-2 block text-lg font-semibold text-gray-700">
          <span className="inline-flex items-center gap-2">
            {SocialIcon ? <SocialIcon className="h-5 w-5" /> : null}
            {item.label}
          </span>
        </label>
        <p className="mb-3 text-sm text-gray-500">{helperFor(key)}</p>
        {isBoolean ? (
          <div className="flex min-h-[52px] items-center justify-between rounded-xl border-2 border-gray-300 bg-white px-4 py-3">
            <span className="text-lg text-gray-700">{form[key] === "true" ? "On" : "Off"}</span>
            <Switch
              checked={form[key] === "true"}
              onCheckedChange={(checked) => setForm((current) => ({ ...current, [key]: String(checked) }))}
              className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300 scale-125"
            />
          </div>
        ) : (
          <input
            value={form[key] ?? ""}
            onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
            className={inputClass}
          />
        )}
      </div>
    );
  }

  return (
    <AdminCMSLayout
      title="Business Information"
      subtitle="Update your phone number, email, address, and social media links"
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

      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-lg text-gray-600">
          Loading your business information...
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {sections.contact.map(renderField)}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Social Media Links</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {sections.social.map(renderField)}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Business Tagline</h2>
            {sections.tagline.map(renderField)}
          </div>
          <button
            type="button"
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="bg-green-600 hover:bg-green-700 text-white text-lg font-bold px-8 py-4 rounded-xl transition-colors min-h-[52px] w-full md:w-auto"
          >
            <span className="inline-flex items-center gap-3">
              <Save className="h-5 w-5" />
              {saveMutation.isPending ? "Saving Changes..." : "Save All Changes"}
            </span>
          </button>
        </>
      )}
    </AdminCMSLayout>
  );
}
