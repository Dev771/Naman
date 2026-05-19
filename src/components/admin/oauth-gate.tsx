import { signIn } from "@/auth";
import { Lock, ArrowRight } from "lucide-react";

export function OAuthGate() {
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
          <p className="mt-2 font-sans text-[14px] leading-relaxed text-ink-subtle">
            Please sign in with your authorized Google account to unlock the analytics dashboard.
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/admin" });
          }}
          className="mt-8"
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
