import {
  createSubscription,
  deleteSubscription,
  updateSubscription,
} from "@/actions/subscription-action";
import { useSelectedDate } from "@/context/selected-date-context";
import { subscriptionSchema } from "@/lib/schema";
import {
  Category,
  Currency,
  Frequency,
  NotificationFrequency,
} from "@/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "http-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SubscriptionFormData, UseSubscriptionFormProps } from "./types";

export const useSubscriptionForm = ({
  mode,
  defaultValues,
  onSuccess,
}: UseSubscriptionFormProps) => {
  const { selectedDate } = useSelectedDate();

  const defaultFormValues: Partial<SubscriptionFormData> = {
    name: "",
    start_date: selectedDate?.toDateString() ?? new Date().toDateString(),
    end_date: undefined,
    category: Category.ENTERTAINMENT,
    currency: Currency.TWD,
    amount: 0,
    frequency: Frequency.MONTHLY,
    note: "",
    notification_frequency: NotificationFrequency.ONE_DAY_BEFORE,
  };

  const form = useForm<SubscriptionFormData>({
    mode: "onChange",
    resolver: zodResolver(subscriptionSchema),
    defaultValues: defaultValues ?? defaultFormValues,
  });

  const { refresh: submitMutation, isLoading } = useMutation(
    mode === "create" ? createSubscription : updateSubscription,
    {
      params: form.getValues(),
      onResolve: () => {
        form.reset();
        toast.success(
          mode === "create" ? "Successfully created" : "Successfully updated",
        );
        onSuccess();
      },
      onError: () => {
        toast.error(
          mode === "create" ? "Failed to create" : "Failed to update",
        );
      },
    },
  );

  const { refresh: deleteMutation, isLoading: isDeleteLoading } = useMutation(
    deleteSubscription,
    {
      params: form.getValues("id"),
      onResolve() {
        toast.success("Successfully deleted");
        onSuccess();
      },
    },
  );

  const handleSubmit = form.handleSubmit(submitMutation);

  return {
    form,
    isLoading,
    isDeleteLoading,
    handleSubmit,
    handleDelete: deleteMutation,
  };
};
