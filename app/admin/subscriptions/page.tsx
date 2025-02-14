import { redirect } from "next/navigation";

import { columns } from "./columns";
import { DataTable } from "./data-table";

import { createClient } from "@/utils/supabase/server";

export default async function SubscriptionsPage() {
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

  return (
    <div className="@container mx-auto w-full max-w-6xl flex-1">
      <h1 className="mb-4 text-2xl font-bold">All Your Subscriptions</h1>
      <DataTable columns={columns} data={subscriptions ?? []} />
    </div>
  );
}
