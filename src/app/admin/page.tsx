import { auth } from '@/auth';
import { OAuthGate } from '@/components/admin/oauth-gate';
import { AdminDashboard } from '@/components/admin/dashboard';

export const metadata = {
  title: 'Admin Analytics · Naman Bhateja',
  description: 'Private Recruiter Analytics Cockpit and Google Analytics insights.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <main className="min-h-screen bg-cream px-4 pb-24 pt-20 md:px-0">
      <div className="mx-auto w-full max-w-page">
        {isAuthenticated ? <AdminDashboard /> : <OAuthGate />}
      </div>
    </main>
  );
}
