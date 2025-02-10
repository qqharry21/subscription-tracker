import SubscriptionCalendar from "@/components/subscription-calendar";
import SelectedDateProvider from "@/context/selected-date-context";
import { SubscriptionSelectedProvider } from "@/context/subscription-selected-provider";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: subscriptions } = await supabase
    .from("subscription")
    .select("*")
    .eq("user_id", user.id);
  console.log("🚨 - subscriptions", subscriptions);

  return (
    <SubscriptionSelectedProvider>
      <SelectedDateProvider>
        <div className="@container mx-auto w-full max-w-6xl flex-1">
          <div className="relative mb-12">
            <SubscriptionCalendar subscriptions={subscriptions ?? []} />
            <div className="text-right">Total amount: $500/per month</div>
          </div>
          <DataTable columns={columns} data={subscriptions ?? []} />
        </div>
      </SelectedDateProvider>
    </SubscriptionSelectedProvider>
  );
}
