import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import Sidebar from "@/components/atelier/Sidebar";
import PortalHeader from "@/components/atelier/PortalHeader";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/atelier");

  return (
    <div className="flex min-h-screen bg-charcoal-50">
      <Sidebar userName={user.name} />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <PortalHeader userName={user.name} userRole={user.role} />
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
