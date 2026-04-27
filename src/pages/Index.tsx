import { AppLayout } from "@/components/layout/AppLayout";
import { ClientDashboard } from "@/components/dashboard/ClientDashboard";
import { ReceptionistDashboard } from "@/components/dashboard/ReceptionistDashboard";
import { useRole } from "@/contexts/RoleContext";

const Index = () => {
  const { role } = useRole();
  return (
    <AppLayout>
      {role === "client" ? <ClientDashboard /> : <ReceptionistDashboard />}
    </AppLayout>
  );
};

export default Index;
