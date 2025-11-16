import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "HostelHub - Hostel Management System",
  description:
    "Comprehensive hostel management system with AI-powered features for student tracking, attendance monitoring, and administrative oversight.",
};

export default function HomePage() {
  // Redirect to the main dashboard or login page
  redirect("/login");
}
