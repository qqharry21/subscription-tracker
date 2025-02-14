import { memo, useCallback, useEffect, useState } from "react";

import { useSubscription } from "@/context/subscription-provider";
import { Form } from "../ui/form";
import { UnsavedAlertDialog } from "../unsaved-alert";
import { FormActions } from "./form-actions";
import { FormFields } from "./form-fields";

import {
  defaultFormValues,
  useSubscriptionForm,
} from "./use-subscription-form";

import { Tables } from "@/types/supabase";

interface SubscriptionFormProps {
  mode: "create" | "update";
  defaultValues?: Partial<Tables<"subscription">>;
}

export const SubscriptionForm = memo(
  ({ mode, defaultValues = defaultFormValues }: SubscriptionFormProps) => {
    const [readOnly, setReadOnly] = useState(mode === "update");
    const [showAlert, setShowAlert] = useState(false);
    const { setIsDialogOpen, setIsDirty, setSelectedSubscription } =
      useSubscription();

    const { form, isLoading, isDeleteLoading, handleSubmit, handleDelete } =
      useSubscriptionForm({
        mode,
        defaultValues,
        onSuccess: () => {
          setIsDialogOpen(false);
          setSelectedSubscription(undefined);
        },
      });

    const handleKeydown = useCallback(
      (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter" && !(e.target instanceof HTMLTextAreaElement)) {
          e.preventDefault();
        }
      },
      [],
    );

    const handleSwitchReadOnly = useCallback(
      (checked: boolean) => {
        if (form.formState.isDirty) {
          setShowAlert(true);
        } else {
          setReadOnly(checked);
        }
      },
      [form.formState.isDirty],
    );

    const onContinueAction = useCallback(() => {
      if (mode === "update") {
        form.reset(undefined, { keepDirty: false });
        setShowAlert(false);
        setReadOnly(true);
      }
    }, [mode, form]);

    useEffect(() => {
      setIsDirty(form.formState.isDirty);
    }, [form.formState.isDirty, setIsDirty]);

    return (
      <>
        <Form {...form}>
          <form onSubmit={handleSubmit} onKeyDown={handleKeydown}>
            <FormFields disabled={readOnly || isLoading || isDeleteLoading} />
            <FormActions
              mode={mode}
              form={form}
              readOnly={readOnly}
              isLoading={isLoading}
              isDeleteLoading={isDeleteLoading}
              onDeleteAction={handleDelete}
              onSwitchReadOnly={handleSwitchReadOnly}
            />
          </form>
        </Form>
        <UnsavedAlertDialog
          open={showAlert}
          onOpenChange={setShowAlert}
          onContinueAction={onContinueAction}
        />
      </>
    );
  },
);

SubscriptionForm.displayName = "SubscriptionForm";
