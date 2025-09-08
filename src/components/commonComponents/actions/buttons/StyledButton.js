import React from "react";
import clsx from "clsx";

const variants = {
  primary:
    "bg-primary-500 hover:bg-slate-950 ring-4 ring-primary-500/60 hover:ring-slate-600 text-white",
  secondary: "bg-slate-900 hover:bg-slate-950 ring-4 ring-slate-600 text-white",
  success: "bg-green-500 text-white hover:bg-slate-900",
  outline:
    "border-1 border-slate-300 bg-white text-gray-500 hover:bg-slate-100 hover:text-gray-700",
  error: "bg-red-500 text-white hover:bg-slate-900",
  text: "text-center text-primary-500 text-sm font-semibold",
  tab: "border-b-2 border-transparent hover:border-primary-500 text-gray-600 hover:text-gray-900 font-semibold",
  //   accent: "text-white bg-accent border border-accent ring-4 ring-accent/50",

  //   white:
  //     "border border-zinc-300 bg-white shadow-lg shadow-zinc-200/60 text-gray-700 hover:text-gray-900 ring-4 ring-zinc-200/50",
  //   outline:
  //     "border-2 border-primary-400 text-primary-500 hover:bg-primary-400 hover:text-white",
  //   danger: "bg-red-600 text-white hover:bg-red-700",
  //   dangerSec: "bg-red-600/10 text-red-500 hover:bg-red-700/20",
  //   success: "bg-green-500 text-white hover:bg-green-600",
  //   text: "text-gray-700 hover:text-gray-900",
  //   special: "text-white bg-special hover:bg-zinc-950",
  //   cta: "flex items-center gap-2 hover:gap-4 transition-all font-semibold",
  //   navigate:
  //     "bg-transparent hover:bg-zinc-200 text-gray-700 w-8 min-h-8 rounded-full border-gray-300 border",
};

const sizes = {
  sm: "px-3 py-2 text-sm rounded h-fit",
  md: "px-4 py-2 text-base rounded",
  lg: "px-5 py-3 text-base rounded",
  xs: "px-2 py-1 text-sm rounded",
  menu: "p-2 rounded-lg",
  null: "px-0 py-0",
  tab: "px-0 py-2 text-sm md:text-base rounded-none",
};

export default function StyledButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={clsx(
        `flex h-fit items-center justify-center space-x-2 tracking-tight font-medium transition duration-200 text-nowrap ${
          disabled == true ? `cursor-not-allowed` : `cursor-pointer`
        } `,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
