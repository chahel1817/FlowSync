import { cn } from "../../utils/cn";

const Button = ({ className, variant = "primary", size = "md", children, ...props }) => {
  const variants = {
    primary: "bg-accent hover:bg-accent/90 text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-white",
    outline: "bg-transparent border border-white/10 hover:bg-white/5 text-white",
    ghost: "bg-transparent hover:bg-white/5 text-white",
    danger: "bg-danger hover:bg-danger/90 text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(
        "rounded-lg font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
