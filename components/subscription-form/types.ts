import { Tables } from "@/types/supabase";
import { UseFormReturn } from "react-hook-form";

export interface SubscriptionFormData extends Tables<"subscription"> {}

export interface FormProps {
  mode: "create" | "update";
  form: UseFormReturn<SubscriptionFormData>;
  readOnly: boolean;
  isLoading: boolean;
  isDeleteLoading: boolean;
}

export interface UseSubscriptionFormProps {
  mode: "create" | "update";
  defaultValues?: Partial<SubscriptionFormData>;
  onSuccess: () => void;
}
