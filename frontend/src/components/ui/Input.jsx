import { cn } from "../../utils/cn";

const Input = ({ className, label, error, ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-secondary ml-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full bg-background border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-white/20",
          error && "border-danger focus:ring-danger/50",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-danger ml-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
