import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Toaster } from "@/components/ui/sonner";
import { ZoneAlerts } from "@/components/cameras/zone-alerts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
      <ZoneAlerts />
      <Toaster position="top-right" richColors closeButton />
    </DashboardLayout>
  );
}
