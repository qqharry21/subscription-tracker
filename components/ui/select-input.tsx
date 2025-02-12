"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface ClassNames {
  selectClassName?: string;
  inputClassName?: string;
  prefixClassName?: string;
}

export interface SelectInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  selectOptions: SelectOption[];
  selectedOption: string;
  onSelectChange: (value: string) => void;
  selectPlaceholder?: string;
  classNames?: ClassNames;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  (
    {
      selectOptions,
      selectedOption,
      onSelectChange,
      selectPlaceholder = "Select",
      classNames,
      value,
      onChange,
      className,
      prefix,
      suffix,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setIsFocused(false);
      }
    };

    return (
      <div
        className={cn(
          "ring-offset-background flex rounded-md shadow-sm",
          isFocused ? "ring-ring ring-2 ring-offset-2" : "ring-input ring-1",
          className,
        )}
        role="button"
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <Select
          value={selectedOption}
          onValueChange={onSelectChange}
          aria-labelledby="select-label"
        >
          <SelectTrigger
            disabled={props.disabled}
            className={cn(
              "max-w-40 min-w-fit rounded-l-md rounded-r-none border-0 shadow-none focus:ring-0 focus:ring-offset-0",
              isFocused ? "ring-0" : "",
              classNames?.selectClassName,
            )}
            aria-haspopup="listbox"
            aria-expanded={isFocused}
            tabIndex={0}
          >
            <SelectValue placeholder={selectPlaceholder} />
          </SelectTrigger>
          <SelectContent role="presentation">
            {selectOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} tabIndex={-1}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {prefix && (
          <div
            className={cn(
              "border-input bg-muted flex cursor-default items-center border-x px-3 select-none",
              classNames?.prefixClassName,
            )}
          >
            {prefix}
          </div>
        )}
        <Input
          ref={ref}
          value={value}
          onChange={onChange}
          className={cn(
            "rounded-l-none border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
            isFocused ? "ring-0" : "",
            prefix && "rounded-l-none",
            classNames?.inputClassName,
          )}
          {...props}
        />
        {suffix && (
          <div className="border-input bg-muted flex cursor-default items-center rounded-r-md border-l px-3">
            {suffix}
          </div>
        )}
      </div>
    );
  },
);

SelectInput.displayName = "SelectInput";
