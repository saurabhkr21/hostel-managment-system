import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import type { Metadata } from "next";
import HostelOverviewInteractive from "./components/HostelOverviewInteractive";

export const metadata: Metadata = {
  title: "Hostel Overview - HostelHub",
  description:
    "Comprehensive overview of hostel operations, occupancy, and key metrics.",
};

export default function HostelOverviewPage() {
  return (
    <>
      <HostelOverviewInteractive />
    </>
  );
}
