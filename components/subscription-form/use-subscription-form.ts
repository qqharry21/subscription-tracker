import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "http-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCallback, useEffect } from "react";
import {
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from "@/actions/subscription-action";
import { subscriptionSchema } from "@/lib/schema";
import { Tables } from "@/types/supabase";
import { Category, Currency, Frequency } from "@/types/enums";

interface UseSubscriptionFormProps {
  mode: "create" | "update";
  defaultValues?: Partial<Tables<"subscription">>;
  onSuccess: () => void;
}

export const defaultFormValues = {
  name: "",
  start_date: new Date().toDateString(),
  end_date: undefined,
  category: Category.ENTERTAINMENT,
  currency: Currency.TWD,
  amount: 500,
  frequency: Frequency.MONTHLY,
  note: "",
};

export const useSubscriptionForm = ({
  mode,
  defaultValues = defaultFormValues,
  onSuccess,
}: UseSubscriptionFormProps) => {
  const form = useForm<Tables<"subscription">>({
    mode: "onChange",
    resolver: zodResolver(subscriptionSchema),
    defaultValues,
  });

  const { refresh, isLoading } = useMutation(
    mode === "create" ? createSubscription : updateSubscription,
    {
      params: form.getValues(),
      onResolve() {
        form.reset();
        toast.success(
          mode === "create" ? "Successfully created" : "Successfully updated",
        );
        onSuccess();
      },
      onError() {
        toast.error(
          mode === "create" ? "Failed to create" : "Failed to update",
        );
      },
    },
  );

  const { refresh: deleteAction, isLoading: isDeleteLoading } = useMutation(
    deleteSubscription,
    {
      params: form.getValues("id"),
      onResolve() {
        toast.success("Successfully deleted");
        onSuccess();
      },
    },
  );

  return {
    form,
    isLoading,
    isDeleteLoading,
    submitForm: form.handleSubmit(refresh),
    deleteAction,
  };
};
