import SubscriptionCalendar from "@/components/subscription-calendar";
import { SubscriptionCreateButton } from "@/components/subscription-create-button";
import SelectedDateProvider from "@/context/selected-date-context";
import { SubscriptionProvider } from "@/context/subscription-provider";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
  // console.log("🚨 - subscriptions", subscriptions);

  return (
    <SelectedDateProvider>
      <SubscriptionProvider>
        <div className="@container relative mx-auto w-full max-w-6xl flex-1">
          <SubscriptionCalendar subscriptions={subscriptions ?? []} />
          <div className="text-right">Total amount: $500/per month</div>
        </div>

        <SubscriptionCreateButton />
      </SubscriptionProvider>
    </SelectedDateProvider>
  );
}
