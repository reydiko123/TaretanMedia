import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "cn"

export type NativeSelectProps = Omit<React.ComponentProps<"select">, "onChange"> & {
  onValueChange?: (value: string) => void
  wrapperClassName?: string
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect({ className, wrapperClassName, onValueChange, children, ...props }, ref) {
    return (
      <div className={cn("relative w-fit", wrapperClassName)}>
        <select
          ref={ref}
          data-slot="select"
          onChange={(event) => onValueChange?.(event.target.value)}
          className={cn(
            "flex h-8 w-full appearance-none items-center rounded-lg border border-input bg-transparent py-2 pr-8 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDownIcon
          className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    )
  }
)

export { NativeSelect }
