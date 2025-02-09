"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useMutation } from "http-react";
import { CalendarIcon, LockIcon, UnlockIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn, formatNumber } from "@/lib/utils";

import {
  createSubscription,
  updateSubscription,
} from "@/actions/subscription-action";
import { category, frequency } from "@/lib";
import { subscriptionSchema } from "@/lib/schema";
import { Category, Currency, Frequency } from "@/types/enums";
import { Tables } from "@/types/supabase";
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
    category: Category.ENTERTAINMENT,
    currency: Currency.TWD,
    // currencyRate: 1,
    amount: 500,
    frequency: Frequency.MONTHLY,
    note: "",
  },
  onSuccess,
  onError,
}: SubscriptionFormProps) => {
  const [readOnly, setReadOnly] = useState(mode === "update");

  const form = useForm<Tables<"subscription">>({
    mode: "onChange",
    resolver: zodResolver(subscriptionSchema),
    defaultValues,
  });

  const currentFrequency = form.watch("frequency");

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

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        onKeyDown={handleKeydown}
        className="grid grid-cols-2 gap-2 px-1 py-2 md:gap-y-4 md:px-4 md:py-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>項目名稱</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  disabled={readOnly}
                  placeholder="輸入項目名稱"
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
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>開始日期</FormLabel>
              <Popover>
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
                        : "選擇日期"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={(date) => {
                      field.onChange(date);
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
          name="end_date"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>截止日期</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id="end_date"
                      variant="outline"
                      disabled={
                        currentFrequency === Frequency.ONE_TIME || readOnly
                      }
                      className={cn(
                        "w-full justify-start truncate text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value
                        ? format(field.value, "yyyy-MM-dd")
                        : "選擇日期"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : new Date()}
                    disabled={{
                      before: new Date(form.watch("start_date")),
                    }}
                    onSelect={field.onChange}
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
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>類別</FormLabel>
              <Select
                disabled={readOnly}
                onValueChange={field.onChange}
                defaultValue={field.value}
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
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>頻率</FormLabel>
              <Select
                disabled={readOnly}
                defaultValue={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value === Frequency.ONE_TIME) {
                    form.setValue("end_date", null);
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="選擇頻率" />
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
            <FormItem className="col-span-2">
              <FormLabel>單位/金額</FormLabel>
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
            <FormItem className="col-span-2">
              <FormLabel>描述</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={readOnly}
                  value={field.value ?? ""}
                  placeholder="輸入描述"
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {mode === "update" && (
          <div className="col-span-1 flex items-center space-x-2">
            <Switch
              id="readonly"
              checked={readOnly}
              onCheckedChange={setReadOnly}
            />
            <Label htmlFor="readonly">
              {readOnly ? <UnlockIcon size={16} /> : <LockIcon size={16} />}
            </Label>
          </div>
        )}
        <Button
          type="submit"
          className={cn(
            "w-full",
            mode === "update" ? "col-span-1" : "col-span-2",
          )}
          disabled={isLoading || !form.formState.isDirty || readOnly}
        >
          {mode === "create" ? "新增" : "更新"}
        </Button>
      </form>
    </Form>
  );
};
