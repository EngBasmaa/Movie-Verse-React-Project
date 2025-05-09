import { Button as ShadButton } from "@/components/ui/button";
import clsx from "clsx";

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-zinc-950 hover:bg-cyan-950 text-white hover:text-white",
    secondary: "bg-red-700 hover:bg-zinc-950 text-white hover:text-white",
    outline:
      "border border-zinc-950 bg-zinc text-white hover:bg-zinc-950 hover:text-white",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-5 py-2",
    lg: "text-lg px-6 py-2.5",
    xl: "text-xl px-8 py-3",
  };

  const baseClasses =
    "rounded-md  font-semibold transition-all duration-300  ease-in-out hover:shadow-lg hover:rounded-3xl cursor-pointer hover:-translate-y-1 ";

  return (
    <ShadButton
      className={clsx(
        baseClasses,
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {children}
    </ShadButton>
  );
}
