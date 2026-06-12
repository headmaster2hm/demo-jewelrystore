"use client";

import { FormEvent, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Gem, Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/atelier/auth/session")
      .then((r) => r.ok && router.replace("/atelier/overview"))
      .catch(() => {});
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/atelier/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Invalid email or password");
        return;
      }

      const redirect = searchParams.get("redirect") || "/atelier/overview";
      router.push(redirect);
      router.refresh();
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — brand & imagery */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900/90 via-charcoal-900/75 to-charcoal-900/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,137,46,0.15)_0%,_transparent_60%)]" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          <div>
            <div className="inline-flex items-center gap-3 mb-16">
              <div className="p-2.5 border border-gold-500/40 rounded-full">
                <Gem className="w-5 h-5 text-gold-400" />
              </div>
              <span className="text-gold-400/80 text-xs uppercase tracking-[0.35em]">
                Private Access
              </span>
            </div>

            <h1 className="font-serif text-5xl xl:text-6xl text-white leading-tight mb-6">
              E. Harrington
              <span className="block text-2xl xl:text-3xl text-gold-300 mt-2 font-normal italic">
                Studio Console
              </span>
            </h1>
            <p className="text-charcoal-300 text-lg max-w-md leading-relaxed font-light">
              Delivering quality and service through the years. Manage your
              collection, orders, and clients from one elegant workspace.
            </p>
          </div>

          <div className="space-y-6">
            <div className="h-px bg-gradient-to-r from-gold-500/50 via-gold-400/20 to-transparent w-48" />
            <p className="text-charcoal-400 text-sm italic font-serif">
              &ldquo;We Believe That Good Design is Always in Season&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-b from-gold-50/80 via-white to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-charcoal-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="w-full max-w-[420px] relative z-10">
          {/* Mobile brand header */}
          <div className="lg:hidden text-center mb-10">
            <div className="inline-flex p-3 bg-charcoal-900 rounded-full mb-4">
              <Gem className="w-6 h-6 text-gold-400" />
            </div>
            <h1 className="font-serif text-3xl text-charcoal-900">Studio Console</h1>
            <p className="text-gold-600 text-xs uppercase tracking-[0.3em] mt-1">
              E. Harrington Jewelry
            </p>
          </div>

          <div className="hidden lg:block mb-10">
            <p className="text-gold-600 text-xs uppercase tracking-[0.35em] mb-3">
              Welcome back
            </p>
            <h2 className="font-serif text-4xl text-charcoal-900">Sign In</h2>
            <p className="text-charcoal-500 mt-2">
              Enter your credentials to access the studio console.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-charcoal-100 shadow-xl shadow-charcoal-900/5 p-8 space-y-5"
          >
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl">
                <Lock className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-widest text-charcoal-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@eha-jewelry.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-charcoal-50/50 border border-charcoal-200 rounded-xl text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-charcoal-500 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-charcoal-50/50 border border-charcoal-200 rounded-xl text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 py-4 bg-charcoal-900 text-white rounded-xl uppercase tracking-[0.2em] text-sm font-medium hover:bg-gold-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-charcoal-900/20 hover:shadow-gold-600/30"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-charcoal-400 text-xs mt-8">
            Authorized personnel only. All access is monitored.
          </p>
        </div>
      </div>
    </div>
  );
}

function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gold-50 to-white">
      <div className="text-center">
        <div className="inline-flex p-4 bg-charcoal-900 rounded-full mb-4">
          <Gem className="w-6 h-6 text-gold-400 animate-pulse" />
        </div>
        <p className="text-charcoal-500 text-sm uppercase tracking-widest">Loading...</p>
      </div>
    </div>
  );
}

export default function AtelierLoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}
