import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-[var(--btn-primary-bg)] text-white shadow-[var(--btn-primary-shadow)] hover:bg-[var(--btn-primary-bg-hover,var(--btn-primary-bg))] hover:shadow-[var(--btn-primary-shadow-hover,var(--btn-primary-shadow))] text-[14px]",
        secondary: "bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--accent-deep)] hover:border-[var(--accent)] hover:bg-[var(--bg-tertiary)]/50 backdrop-blur-md shadow-sm",
        outline: "border border-[var(--card-border)] bg-transparent hover:bg-[var(--bg-secondary)] text-[var(--text)]",
        ghost: "hover:bg-[var(--bg-secondary)] text-[var(--text)]",
        link: "text-[var(--accent)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-[22px] py-[11px]",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
