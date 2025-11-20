import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Gauge } from 'lucide-react';

interface PoolStatusProps {
  poolSize: number;
  poolInUse: number;
  utilizationPercent: number;
}

export function PoolStatus({ poolSize, poolInUse, utilizationPercent }: PoolStatusProps) {
  const getUtilizationColor = (percent: number) => {
    if (percent >= 80) return 'bg-rose-600';
    if (percent >= 60) return 'bg-amber-500';
    return 'bg-emerald-600';
  };

  const getStatusBadge = (percent: number) => {
    if (percent >= 80) return { variant: 'destructive' as const, label: 'High Load' };
    if (percent >= 60) return { variant: 'warning' as const, label: 'Medium Load' };
    return { variant: 'success' as const, label: 'Optimal' };
  };

  const status = getStatusBadge(utilizationPercent);

  return (
    <Card className="glassmorphism">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">
          Database Connection Pool
        </CardTitle>
        <Database className="h-5 w-5 text-blue-500" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold font-mono">
              {poolInUse}/{poolSize}
            </p>
            <p className="text-xs text-muted-foreground">Active / Total</p>
          </div>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400 flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Utilization
            </span>
            <span className="font-mono font-bold">
              {utilizationPercent.toFixed(1)}%
            </span>
          </div>
          <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${getUtilizationColor(
                utilizationPercent
              )}`}
              style={{ width: `${utilizationPercent}%` }}
            />
          </div>
        </div>

        {/* Warning */}
        {utilizationPercent >= 80 && (
          <div className="bg-rose-950/30 border border-rose-800 rounded-lg p-3">
            <p className="text-xs text-rose-400">
              ⚠️ Pool utilization is high. Consider scaling database connections.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
