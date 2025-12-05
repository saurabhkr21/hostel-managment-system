import type { Metadata } from 'next';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import BreadcrumbTrail from '@/components/common/BreadcrumbTrail';
import AttendanceTrackingInteractive from './components/AttendanceTrackingInteractive';

export const metadata: Metadata = {
  title: 'Attendance Tracking - HostelHub',
  description: 'Real-time monitoring and recording of student participation across all hostel activities with AI-powered insights and automated notifications.',
};

export default function AttendanceTrackingPage() {
  return (
      
      <main className="pl-0 md:pl-60 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <BreadcrumbTrail />
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-text-primary">Attendance Tracking</h1>
              <p className="text-text-secondary mt-1">
                Monitor and record student participation across all hostel activities in real-time
              </p>
            </div>
          </div>

          {/* Interactive Content */}
          <AttendanceTrackingInteractive />
        </div>
      </main>
  );
}