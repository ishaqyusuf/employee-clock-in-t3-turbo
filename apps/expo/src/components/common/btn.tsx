import type { VariantProps } from "class-variance-authority";
import { Text, TouchableOpacity } from "react-native";
import { cva } from "class-variance-authority";

import { cn } from "~/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-purple-500/70 text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive/60 text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2",
        sm: "rounded-md px-3",
        lg: "rounded-md p-4 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
export const textVariants = cva("", {
  variants: {
    size: {
      default: "text-base",
      lg: "text-lg font-medium",
    },
    variant: {
      default: "text-muted-foreground",
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
});
interface BtnProps extends VariantProps<typeof buttonVariants> {
  onPress?;
  children?;
  className?;
}
export function Btn({
  onPress,
  className,
  children,
  ...variantProps
}: BtnProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(buttonVariants(variantProps), className, "")}
    >
      <Text className={cn(textVariants(variantProps))}>{children}</Text>
    </TouchableOpacity>
  );
}
