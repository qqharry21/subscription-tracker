"use server";

// import { auth } from "@/auth";
import { subscriptionSchema } from "@/lib/schema";
import { createClient } from "@/utils/supabase/server";
import { actionData } from "http-react";
import { revalidatePath } from "next/cache";

export async function createSubscription(data: any) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user)
      return actionData("UnAuthorization", {
        status: 401,
      });

    const parsed = subscriptionSchema.safeParse(data);
    if (!parsed.success) {
      console.log("parsed.error.format()", parsed.error.format());
      return actionData(parsed.error.format(), { status: 400 });
    }

    const { data: newSubscription, error } = await supabase
      .from("subscription")
      .insert({ ...data, user_id: user.id, should_notify: false })
      .select();

    if (error) {
      return actionData(error, { status: 500 });
    }

    revalidatePath("/admin");
    return actionData(newSubscription, { status: 201 });
  } catch (error) {
    console.log("🚨 - error", error);
    return actionData(error, { status: 500 });
  }
}
export async function updateSubscription(data: any) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user)
      return actionData("UnAuthorization", {
        status: 401,
      });

    const parsed = subscriptionSchema.safeParse(data);
    console.log("🚨 - parsed", parsed);
    if (!parsed.success) {
      console.log("parsed.error.format()", parsed.error.format());
      return actionData(parsed.error.format(), { status: 400 });
    }

    const { data: updateSubscription, error } = await supabase
      .from("subscription")
      .update(data)
      .eq("id", data.id)
      .select();
    console.log("🚨 - error", error);

    if (error) {
      return actionData(error, { status: 500 });
    }

    revalidatePath("/admin");
    return actionData(updateSubscription, { status: 201 });
  } catch (error) {
    console.log("🚨 - error", error);
    return actionData(error, { status: 500 });
  }
}

export async function deleteSubscription(id: string) {
  console.log("🚨 - id", id);
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user)
      return actionData("UnAuthorization", {
        status: 401,
      });

    const { data: deletedSubscription, error } = await supabase
      .from("subscription")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);
    console.log("🚨 - error", error);

    revalidatePath("/admin");
    return actionData(deletedSubscription, { status: 204 });
  } catch (error) {
    return actionData(error, { status: 500 });
  }
}
