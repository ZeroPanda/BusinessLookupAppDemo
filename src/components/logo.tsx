import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("bg-primary text-primary-foreground p-2 rounded-lg flex items-center justify-center", className)}>
      <Building2 className="w-5 h-5" />
    </div>
  );
}
