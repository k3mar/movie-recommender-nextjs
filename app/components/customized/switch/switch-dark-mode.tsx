import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { MoonIcon, SunMediumIcon } from "lucide-react";

/**
 * Custom Dark Mode Toggle component with visible styles and optional icon.
 */
type SwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
> & {
  icon?: React.ReactNode;
  thumbClassName?: string;
};

// Extract instance type for the ref from Radix Switch root component
type SwitchRef = React.ComponentPropsWithRef<
  typeof SwitchPrimitives.Root
> extends {
  ref?: React.Ref<infer R>;
}
  ? R
  : never;

const Switch = React.forwardRef<SwitchRef, SwitchProps>(
  ({ className, icon, thumbClassName, ...props }, ref) => (
    <SwitchPrimitives.Root
      ref={ref}
      {...props}
      className={cn(
        "peer inline-flex items-center shrink-0 h-7 w-12 rounded-full shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
        "bg-gray-200 data-[state=checked]:bg-gray-800",
        className
      )}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none h-6 w-6 bg-white rounded-full shadow-md ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 flex items-center justify-center",
          thumbClassName
        )}
      >
        {icon}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
);
Switch.displayName = SwitchPrimitives.Root.displayName;

/**
 * DarkModeToggle: a switch with icons and label for light/dark mode,
 * persisting preference in localStorage and toggling Tailwind dark class.
 */
export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  // Apply or remove the Tailwind 'dark' class and persist preference
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <label className="inline-flex items-center space-x-3">
      <Switch
        checked={isDarkMode}
        onCheckedChange={setIsDarkMode}
        icon={
          isDarkMode ? (
            <MoonIcon className="h-4 w-4 text-gray-800" />
          ) : (
            <SunMediumIcon className="h-4 w-4 text-yellow-500" />
          )
        }
      />
      <span className="text-sm font-black select-none hidden sm:inline-flex">
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </span>
    </label>
  );
}
