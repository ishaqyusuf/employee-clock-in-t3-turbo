import {
  ControllerProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

import { cn } from "..";
import { Checkbox } from "../checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../form";
import { Switch } from "../switch";

interface Props<T> {
  label?: string | any;
  description?: string;
  className?: string;
  placeholder?: string;
  switchInput?: boolean;
}
export default function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOptionType = any,
>({
  label,
  description,
  className,
  placeholder,
  switchInput,
  ...props
}: Partial<ControllerProps<TFieldValues, TName>> & Props<TOptionType>) {
  return (
    <FormField
      {...(props as any)}
      render={({ field }) => (
        <FormItem
          className={cn(
            "items-starts flex flex-row items-center space-x-3 space-y-0 rounded-md",
            className,
          )}
        >
          <FormControl className="mt-0.5">
            {switchInput ? (
              <Switch
                color="green"
                checked={field.value as any}
                onCheckedChange={field.onChange}
              />
            ) : (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel>{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
}
