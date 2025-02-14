import { ArrowRightIcon, LockIcon, TrashIcon, UnlockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useSubscriptionForm } from "./use-subscription-form";

import { cn } from "@/lib/utils";
export const FormActions = ({
  mode,
  form,
  readOnly,
  isLoading,
  isDeleteLoading,
  onSwitchReadOnly,
  onDeleteAction,
}: {
  form: ReturnType<typeof useSubscriptionForm>["form"];
  mode: "create" | "update";
  readOnly: boolean;
  isLoading: boolean;
  isDeleteLoading: boolean;
  onSwitchReadOnly: (checked: boolean) => void;
  onDeleteAction: () => void;
}) => {
  return (
    <div className="mt-4 grid w-full grid-cols-4">
      {mode === "update" && (
        <div
          className="col-span-1 flex items-center"
          onFocusCapture={(e) => e.stopPropagation()}
        >
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-flex items-center space-x-2">
                  <Switch
                    id="readonly"
                    checked={readOnly}
                    onCheckedChange={onSwitchReadOnly}
                  />
                  <Label htmlFor="readonly">
                    {readOnly ? (
                      <UnlockIcon size={16} className="shrink-0" />
                    ) : (
                      <LockIcon size={16} className="shrink-0" />
                    )}
                  </Label>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={8}>
                {readOnly
                  ? "Unlock to edit"
                  : "Lock to prevent further changes"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      <div
        className={cn(
          "flex items-center gap-x-2",
          mode === "update" ? "col-span-3" : "col-span-4",
        )}
      >
        {mode === "update" && (
          <Button
            type="button"
            className="w-full"
            variant="destructive"
            disabled={readOnly || isDeleteLoading}
            onClick={onDeleteAction}
          >
            <TrashIcon size={16} className="shrink-0" />
            Delete
          </Button>
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !form.formState.isDirty || readOnly}
        >
          {mode === "create" ? "Create" : "Update"}
          <ArrowRightIcon size={16} className="shrink-0" />
        </Button>
      </div>
    </div>
  );
};
