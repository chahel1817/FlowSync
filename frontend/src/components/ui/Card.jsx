import { cn } from "../../utils/cn";

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-md overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children }) => (
  <div className={cn("px-6 py-4 border-b border-white/10", className)}>
    {children}
  </div>
);

export const CardContent = ({ className, children }) => (
  <div className={cn("p-6", className)}>
    {children}
  </div>
);

export const CardFooter = ({ className, children }) => (
  <div className={cn("px-6 py-4 border-t border-white/10 bg-white/5", className)}>
    {children}
  </div>
);

export default Card;
