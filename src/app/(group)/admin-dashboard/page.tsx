import type { Metadata } from 'next';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import BreadcrumbTrail from '@/components/common/BreadcrumbTrail';
import AdminDashboardInteractive from './components/AdminDashboardInteractive';

export const metadata: Metadata = {
  title: 'Admin Dashboard - HostelHub',
  description: 'Comprehensive hostel management dashboard with real-time statistics, attendance tracking, and administrative controls for efficient hostel operations.',
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Sidebar /> */}
      <div className="md:pl-64 flex flex-col">
        {/* <Header /> */}
        <main className="pt-16 p-6">
          <div className="mx-auto">
            <div className="mb-6">
              <BreadcrumbTrail />
              <div className="mt-4">
                <h1 className="text-2xl font-bold text-text-primary">Dashboard Overview</h1>
                <p className="text-text-secondary mt-1">
                  Monitor hostel operations, track attendance, and manage student activities in real-time.
                </p>
              </div>
            </div>
            
            <AdminDashboardInteractive />
          </div>
        </main>
      </div>
    </div>
  );
}