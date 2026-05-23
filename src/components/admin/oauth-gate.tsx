'use client';

import { useState, useEffect } from "react";
import { loginWithGoogle } from "./auth-actions";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";

function clearAuthCookies() {
  try {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      
      // Target authjs and next-auth cookies
      if (name.toLowerCase().includes("authjs") || name.toLowerCase().includes("next-auth")) {
        const path = "/";
        const hostname = window.location.hostname;
        
        // Clear cookie for all possible paths and domains
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path};`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=.${hostname};`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${hostname};`;
        
        // Also clear secure variants explicitly
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; secure;`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=.${hostname}; secure;`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${hostname}; secure;`;
      }
    }
  } catch (e) {
    console.error("Failed to clear auth cookies:", e);
  }
}

export function OAuthGate() {
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Read the query parameters using window.location.search to avoid Next.js Suspense deopt issues
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get('error');
    if (errorParam) {
      setAuthError(errorParam);
      clearAuthCookies();
      // Clean the URL without page reload
      window.history.replaceState({}, document.title, '/admin');
    }
  }, []);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-12">
      <div className="w-full max-w-[420px] rounded-[16px] border border-[rgba(186,169,148,0.25)] bg-[#fffefc] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.03)] md:rounded-[12px]">
        
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/5 text-[#2f5bff]">
            <Lock size={22} className="stroke-[2.2]" />
          </div>
          <h2 className="font-sans text-[22px] font-semibold tracking-[-0.5px] text-ink">
            Admin Cockpit
          </h2>
          <p className="mt-2 mb-6 font-sans text-[14px] leading-relaxed text-ink-subtle">
            Please sign in with your authorized Google account to unlock the analytics dashboard.
          </p>
        </div>

        {authError && (
          <div className="mb-6 flex gap-3 rounded-[10px] bg-amber-500/10 border border-amber-500/20 p-4 text-left">
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-sans text-[13px] font-semibold text-amber-800 leading-normal">
                Connection Reset
              </p>
              <p className="mt-1 font-sans text-[12px] text-amber-700/90 leading-normal">
                An authentication sync error ({authError}) occurred. We have cleared your cookies and refreshed the state. Please try logging in again.
              </p>
            </div>
          </div>
        )}

        <form
          action={loginWithGoogle}
        >
          <button
            type="submit"
            className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#2f5bff] font-sans text-[14px] font-semibold text-white transition-all hover:bg-blue-600 active:scale-[0.98]"
          >
            Continue with Google
            <ArrowRight size={16} strokeWidth={2.2} />
          </button>
        </form>

        <div className="mt-8 border-t border-[rgba(186,169,148,0.15)] pt-6 text-center">
          <p className="font-sans text-[12px] leading-normal text-ink-muted">
            Securely encrypted analytics. Direct OAuth integration with Google GA4 Data API.
          </p>
        </div>
      </div>
    </div>
  );
}
