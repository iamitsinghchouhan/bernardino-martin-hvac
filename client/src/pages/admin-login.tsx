import { useState } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiRequest("POST", "/api/admin/login", { password });
      navigate("/admin");
    } catch {
      setError("Invalid password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1235] flex items-center justify-center px-4" data-testid="admin-login-page">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#3DB54A] to-[#2d8a38] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl" style={{ fontFamily: "'Outfit', sans-serif" }}>BM</span>
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Admin Panel</h1>
          <p className="text-gray-400 mt-1 text-sm">Bernardino Martin's HVAC</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1a1f4e] rounded-2xl p-8 shadow-2xl border border-white/5">
          <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input
            data-testid="input-admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0f1235] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3DB54A] focus:border-transparent"
            placeholder="Enter admin password"
            autoFocus
          />

          {error && (
            <p className="text-red-400 text-sm mt-3" data-testid="text-login-error">{error}</p>
          )}

          <button
            data-testid="button-admin-login"
            type="submit"
            disabled={loading || !password}
            className="w-full mt-6 py-3 rounded-lg bg-[#3DB54A] hover:bg-[#35a241] text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-6">Secure admin access only</p>
      </div>
    </div>
  );
}
