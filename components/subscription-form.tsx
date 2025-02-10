"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useMutation } from "http-react";
import {
  ArrowRightIcon,
  CalendarIcon,
  LockIcon,
  TrashIcon,
  UnlockIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  createSubscription,
  updateSubscription,
} from "@/actions/subscription-action";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CurrencySelectInput } from "./currency-select-input";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

import { category, frequency } from "@/lib";
import { subscriptionSchema } from "@/lib/schema";
import { cn, formatNumber } from "@/lib/utils";
import { Category, Currency, Frequency } from "@/types/enums";
import { Tables } from "@/types/supabase";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface SubscriptionFormProps {
  mode: "create" | "update";
  defaultValues?: Partial<Tables<"subscription">>;
  onSuccess?: () => void;
  onError?: () => void;
}

export const SubscriptionForm = ({
  mode,
  defaultValues = {
    name: "",
    start_date: new Date().toDateString(),
    end_date: undefined,
    category: Category.ENTERTAINMENT,
    currency: Currency.TWD,
    amount: 500,
    frequency: Frequency.MONTHLY,
    note: "",
  },
  onSuccess,
  onError,
}: SubscriptionFormProps) => {
  const [readOnly, setReadOnly] = useState(mode === "update");
  const [showAlert, setShowAlert] = useState(false);

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
        toast.success(mode === "create" ? "新增支出成功" : "更新支出成功");
        onSuccess?.();
      },
      onError() {
        toast.error(mode === "create" ? "新增支出失敗" : "更新支出失敗");
        onError?.();
      },
    },
  );

  const onSubmit = form.handleSubmit(refresh);

  const handleKeydown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !(e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault();
    }
  };

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

  const onContinueAction = () => {
    if (mode === "update") {
      form.reset(undefined, { keepDirty: false });
      setShowAlert(false);
      setReadOnly(true);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          onKeyDown={handleKeydown}
          className="grid grid-cols-4 gap-2 px-1 py-2 md:gap-y-4 md:px-4 md:py-4"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-4 grid">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    disabled={readOnly}
                    placeholder="Enter subscription name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="start_date"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-4 grid md:col-span-2">
                <FormLabel>Start Date</FormLabel>
                <div className="grid">
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          id="start_date"
                          disabled={readOnly}
                          variant="outline"
                          className={cn(
                            "w-full justify-start truncate text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "yyyy-MM-dd")
                            : "Choose date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={(date) => {
                          field.onChange(date?.toDateString());
                        }}
                        className="mx-auto w-full max-w-[280px]"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="end_date"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-4 grid md:col-span-2">
                <FormLabel>
                  End Date
                  {form.watch("frequency") === Frequency.ONE_TIME && (
                    <span className="text-muted-foreground ml-2 text-xs leading-none font-normal">
                      (One-time subscription)
                    </span>
                  )}
                </FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="end_date"
                        variant="outline"
                        disabled={
                          form.watch("frequency") === Frequency.ONE_TIME ||
                          readOnly
                        }
                        className={cn(
                          "w-full justify-start truncate text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "yyyy-MM-dd")
                          : "Choose date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        field.value ? new Date(field.value) : new Date()
                      }
                      disabled={{
                        before: new Date(form.watch("start_date")),
                      }}
                      onSelect={(date) => {
                        field.onChange(date?.toDateString());
                      }}
                      className="mx-auto w-full max-w-[280px]"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-4 grid md:col-span-2">
                <FormLabel>Category</FormLabel>
                <Select
                  disabled={readOnly}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="選擇類別" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    {Object.entries(category).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        <span className="flex items-center gap-2">
                          <value.icon size={16} />
                          <span>{value.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="frequency"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-4 grid md:col-span-2">
                <FormLabel>Frequency</FormLabel>
                <Select
                  disabled={readOnly}
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (value === Frequency.ONE_TIME) {
                      form.setValue("end_date", null);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(frequency).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-4 grid">
                <FormLabel>Unit/Amount</FormLabel>
                <FormControl>
                  <CurrencySelectInput
                    {...field}
                    disabled={readOnly}
                    onChange={(event) => {
                      field.onChange(formatNumber(event.target.value));
                    }}
                    selectedOption={form.watch("currency")}
                    onSelectChange={(value) => {
                      form.setValue("currency", value as Currency, {
                        shouldDirty: true,
                      });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="note"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-4 grid">
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={readOnly}
                    value={field.value ?? ""}
                    placeholder="Enter some notes..."
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                        onCheckedChange={handleSwitchReadOnly}
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
            <Button
              type="button"
              // className="w-full"
              variant="destructive"
              disabled={isLoading || readOnly}
            >
              <TrashIcon size={16} className="shrink-0" />
              Delete
            </Button>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !form.formState.isDirty || readOnly}
            >
              {mode === "create" ? "Create" : "Update"}
              <ArrowRightIcon size={16} className="shrink-0" />
            </Button>
          </div>
        </form>
      </Form>
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Unsaved changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onContinueAction}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
