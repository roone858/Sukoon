import React from "react";
import { FiLoader } from "react-icons/fi";
import { cx } from "../types";

type ButtonVariant = "primary" | "danger" | "success" | "warning" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500",
  danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
  warning: "bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500",
  ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200",
  outline: "bg-transparent border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  isLoading = false,
  className,
  children,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cx(
        "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        variantClasses[variant],
        sizeClasses[size],
        (disabled || isLoading) && "opacity-70 cursor-not-allowed",
        className
      )}
    >
      {isLoading ? (
        <FiLoader className="animate-spin " />
      ) : icon ? (
        <span className="mr-1">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;