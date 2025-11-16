import type { Metadata } from 'next';
import LoginInteractive from './components/LoginInteractive';

export const metadata: Metadata = {
  title: 'Login - HostelHub',
  description: 'Secure authentication portal for hostel administrators, staff, students, and parents to access their respective HostelHub management system accounts.',
};

export default function LoginPage() {
  return (
    <main>
      <LoginInteractive />
    </main>
  );
}