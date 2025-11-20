import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

const statusConfig = {
  success: {
    badge: 'success',
    glow: 'cyber-glow',
    iconColor: 'text-emerald-500',
  },
  warning: {
    badge: 'warning',
    glow: 'cyber-glow-amber',
    iconColor: 'text-amber-500',
  },
  error: {
    badge: 'destructive',
    glow: 'cyber-glow-rose',
    iconColor: 'text-rose-500',
  },
  info: {
    badge: 'outline',
    glow: '',
    iconColor: 'text-blue-500',
  },
} as const;

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  status = 'info',
  className,
}: MetricCardProps) {
  const config = statusConfig[status];

  return (
    <Card
      className={cn(
        'glassmorphism transition-all duration-300 hover:scale-105',
        config.glow,
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">
          {title}
        </CardTitle>
        <Icon className={cn('h-5 w-5', config.iconColor)} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold font-mono tracking-tight">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className="flex items-center gap-2 mt-3">
            <Badge variant={trend.isPositive ? 'success' : 'destructive'}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </Badge>
            <span className="text-xs text-zinc-500">vs last hour</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
