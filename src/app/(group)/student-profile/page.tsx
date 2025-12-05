import type { Metadata } from 'next';
import StudentProfileInteractive from './components/StudentProfileInteractive';

export const metadata: Metadata = {
  title: 'Student Profile - HostelHub',
  description: 'Comprehensive student profile management with personal details, attendance tracking, leave records, activity participation, and parent communications.',
};

export default function StudentProfilePage() {
  return (
    <main className="min-h-screen bg-background">
      <StudentProfileInteractive />
    </main>
  );
}