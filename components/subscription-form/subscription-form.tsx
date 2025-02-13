import { memo, useState, useCallback, useEffect } from "react";

import { useSubscription } from "@/context/subscription-provider";
import { FormFields } from "./form-fields";
import { FormActions } from "./form-actions";
import { UnsavedAlertDialog } from "../unsaved-alert";
import { Form } from "../ui/form";

import {
  useSubscriptionForm,
  defaultFormValues,
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
    const { setIsDialogOpen, setIsDirty } = useSubscription();

    const { form, isLoading, isDeleteLoading, submitForm, deleteAction } =
      useSubscriptionForm({
        mode,
        defaultValues,
        onSuccess: () => setIsDialogOpen(false),
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
          <form onSubmit={submitForm} onKeyDown={handleKeydown}>
            <FormFields
              form={form}
              readOnly={readOnly}
              isDeleteLoading={isDeleteLoading}
            />
            <FormActions
              mode={mode}
              form={form}
              readOnly={readOnly}
              isLoading={isLoading}
              isDeleteLoading={isDeleteLoading}
              onDeleteAction={deleteAction}
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
