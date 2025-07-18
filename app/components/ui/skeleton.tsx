import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-accent animate-pulse rounded-md bg-white/60 mt-1",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
