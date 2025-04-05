import React from "react";
import { cx } from "../types";

type BadgeVariant = "default" | "primary" | "danger" | "success" | "warning" | "purple" | "green";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

const Badge: React.FC<BadgeProps> = ({ variant = "default", className, children }) => {
  return (
    <span
      className={cx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;