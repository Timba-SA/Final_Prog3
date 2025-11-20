import { useQuery } from '@tanstack/react-query';
import { healthCheckService } from '@/services/api';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { PoolStatus } from '@/components/dashboard/PoolStatus';
import { LatencyChart } from '@/components/dashboard/LatencyChart';
import {
  Activity,
  Database,
  Zap,
  Clock,
  Server,
  AlertCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  const { data: health, isLoading, error } = useQuery({
    queryKey: ['health'],
    queryFn: healthCheckService.getStatus,
    refetchInterval: 2000, // Polling cada 2 segundos
    retry: 3,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-emerald-500">
            <Activity className="h-12 w-12 mx-auto animate-pulse" />
          </div>
          <p className="text-zinc-400">Loading system metrics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-12 w-12 mx-auto text-rose-500" />
          <h2 className="text-xl font-bold text-zinc-100">
            Connection Error
          </h2>
          <p className="text-zinc-400">
            Unable to connect to backend. Please ensure the FastAPI server is
            running on port 8000.
          </p>
          <Badge variant="destructive">Backend Offline</Badge>
        </div>
      </div>
    );
  }

  if (!health) return null;

  const isHealthy = health.status === 'healthy';
  const dbLatency = health.checks.database.latency_ms;
  const dbHealth = health.checks.database.health;
  const redisStatus = health.checks.redis.status;
  const redisHealth = health.checks.redis.health;
  const poolSize = health.checks.db_pool.size;
  const poolInUse = health.checks.db_pool.checked_out;
  const poolUtilization = health.checks.db_pool.utilization_percent;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            System Observatory
          </h1>
          <p className="text-zinc-400 mt-2">
            Real-time monitoring • Refreshes every 2s
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant={isHealthy ? 'success' : 'destructive'}
            className="text-sm py-2 px-4 animate-pulse"
          >
            <div className="w-2 h-2 rounded-full bg-current mr-2 animate-glow" />
            {health.status.toUpperCase()}
          </Badge>
          <div className="text-right">
            <p className="text-xs text-zinc-500">Timestamp</p>
            <p className="font-mono text-sm text-zinc-300">
              {new Date(health.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Database Status"
          value={dbHealth}
          subtitle={`Latency: ${dbLatency}ms`}
          icon={Database}
          status={dbHealth === 'healthy' ? 'success' : 'error'}
        />
        
        <MetricCard
          title="Database Latency"
          value={`${dbLatency}ms`}
          subtitle="Response time"
          icon={Zap}
          status={dbLatency < 50 ? 'success' : dbLatency < 100 ? 'warning' : 'error'}
        />
        
        <MetricCard
          title="Redis Cache"
          value={redisHealth}
          subtitle={redisStatus}
          icon={Activity}
          status={redisHealth === 'healthy' ? 'success' : 'error'}
        />
        
        <MetricCard
          title="Pool Utilization"
          value={`${poolUtilization.toFixed(1)}%`}
          subtitle={`${poolInUse}/${poolSize} in use`}
          icon={Clock}
          status={poolUtilization < 70 ? 'success' : poolUtilization < 90 ? 'warning' : 'error'}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LatencyChart currentLatency={dbLatency} />
        
        <PoolStatus
          poolSize={poolSize}
          poolInUse={poolInUse}
          utilizationPercent={poolUtilization}
        />
      </div>

      {/* System Info */}
      <div className="glassmorphism rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Server className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">System Information</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-zinc-500 mb-1">Pool Size</p>
            <p className="text-xl font-bold font-mono">
              {poolSize}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1">Active Connections</p>
            <p className="text-xl font-bold font-mono text-emerald-500">
              {poolInUse}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1">Idle Connections</p>
            <p className="text-xl font-bold font-mono text-zinc-400">
              {poolSize - poolInUse}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1">Last Check</p>
            <p className="text-sm font-mono text-zinc-300">
              {new Date(health.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
