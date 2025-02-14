import { CurrencySelectInput } from "@/components/currency-select-input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { category, frequency } from "@/lib";
import { cn, formatNumber } from "@/lib/utils";
import { Currency, Frequency } from "@/types/enums";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSubscriptionForm } from "./use-subscription-form";

export const FormFields = ({
  form,
  readOnly,
  isLoading,
  isDeleteLoading,
}: {
  form: ReturnType<typeof useSubscriptionForm>["form"];
  readOnly: boolean;
  isLoading: boolean;
  isDeleteLoading: boolean;
}) => {
  return (
    <div className="grid max-h-[450px] grid-cols-4 gap-2 overflow-auto px-1 py-2 md:gap-y-4 md:px-4 md:py-4">
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
                className="disabled:opacity-80"
                disabled={readOnly || isDeleteLoading}
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
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    id="start_date"
                    disabled={readOnly || isDeleteLoading}
                    variant="outline"
                    className={cn(
                      "w-full justify-start truncate text-left font-normal disabled:opacity-80",
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
                      readOnly ||
                      isLoading ||
                      isDeleteLoading
                    }
                    className={cn(
                      "w-full justify-start truncate text-left font-normal disabled:opacity-80",
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
                  selected={field.value ? new Date(field.value) : new Date()}
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
              disabled={readOnly || isDeleteLoading}
              value={field.value}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger id="category" className="disabled:opacity-80">
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
              disabled={readOnly || isDeleteLoading}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                if (value === Frequency.ONE_TIME) {
                  form.setValue("end_date", null);
                }
              }}
            >
              <FormControl>
                <SelectTrigger id="frequency" className="disabled:opacity-80">
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
                classNames={{
                  selectClassName: "disabled:opacity-80",
                  inputClassName: "disabled:opacity-80",
                }}
                disabled={readOnly || isDeleteLoading}
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
                disabled={readOnly || isDeleteLoading}
                className="disabled:opacity-80"
                value={field.value ?? ""}
                placeholder="Enter some notes..."
                rows={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
