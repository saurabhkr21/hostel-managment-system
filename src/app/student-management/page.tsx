import type { Metadata } from 'next';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import StudentManagementInteractive from './components/StudentManagementInteractive';

export const metadata: Metadata = {
  title: 'Student Management - HostelHub',
  description: 'Manage comprehensive student records, track attendance, and maintain detailed profiles with emergency contacts and communication history.',
};

export default function StudentManagementPage() {
  return (
    <>
      <StudentManagementInteractive />
    </>
  );
}