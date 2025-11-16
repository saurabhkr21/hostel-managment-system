import type { Metadata } from 'next';
import LeaveManagementInteractive from './components/LeaveManagementInteractive';

export const metadata: Metadata = {
  title: 'Leave Management - HostelHub',
  description: 'Streamline student leave applications and outpass requests with comprehensive tracking, approval workflows, and automated parent notifications.',
};

export default function LeaveManagementPage() {
  return
  
    <LeaveManagementInteractive />
  ;
}