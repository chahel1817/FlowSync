import { Briefcase } from 'lucide-react';
import { cn } from '../../utils/cn';

const Logo = ({ className, size = "md", showText = true, textClassName }) => {
  const sizes = {
    sm: { box: "w-7 h-7", icon: 16, text: "text-lg" },
    md: { box: "w-8 h-8", icon: 20, text: "text-xl" },
    lg: { box: "w-12 h-12", icon: 28, text: "text-3xl" },
    xl: { box: "w-10 h-10", icon: 24, text: "text-2xl" }
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        currentSize.box, 
        "bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0"
      )}>
        <Briefcase size={currentSize.icon} className="text-white" />
      </div>
      {showText && (
        <span className={cn(
          currentSize.text, 
          "font-bold tracking-tight font-mono text-white", 
          textClassName
        )}>
          FlowSync
        </span>
      )}
    </div>
  );
};

export default Logo;
