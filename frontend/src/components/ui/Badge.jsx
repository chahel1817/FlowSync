import { cn } from "../../utils/cn";

const Badge = ({ children, variant = "default", className }) => {
  const variants = {
    default: "bg-white/10 text-white",
    success: "bg-success/20 text-success border border-success/30",
    warning: "bg-warning/20 text-warning border border-warning/30",
    danger: "bg-danger/20 text-danger border border-danger/30",
    accent: "bg-accent/20 text-accent border border-accent/30",
    review: "bg-review/20 text-review border border-review/30",
  };

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
