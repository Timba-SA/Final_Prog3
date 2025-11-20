import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LatencyChartProps {
  currentLatency: number;
}

interface DataPoint {
  time: string;
  latency: number;
}

export function LatencyChart({ currentLatency }: LatencyChartProps) {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Inicializar con datos vacíos
    if (data.length === 0) {
      const initialData = Array.from({ length: 20 }, (_, i) => ({
        time: `${i}s`,
        latency: 0,
      }));
      setData(initialData);
    }

    // Agregar nuevo punto de datos
    setData((prevData) => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      
      const newData = [
        ...prevData.slice(1),
        {
          time: timeStr,
          latency: currentLatency,
        },
      ];
      
      return newData;
    });
  }, [currentLatency]);

  const avgLatency = data.length > 0
    ? (data.reduce((sum, point) => sum + point.latency, 0) / data.length).toFixed(2)
    : '0';

  return (
    <Card className="glassmorphism col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-500" />
            Database Latency
          </CardTitle>
          <div className="text-right">
            <p className="text-xs text-zinc-400">Average</p>
            <p className="text-xl font-bold font-mono text-emerald-500">
              {avgLatency}ms
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke="#52525b"
              tick={{ fill: '#71717a', fontSize: 10 }}
              tickLine={false}
            />
            <YAxis
              stroke="#52525b"
              tick={{ fill: '#71717a', fontSize: 10 }}
              tickLine={false}
              label={{ value: 'ms', angle: -90, position: 'insideLeft', fill: '#71717a' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '8px',
                color: '#fafafa',
              }}
              labelStyle={{ color: '#a1a1aa' }}
            />
            <Area
              type="monotone"
              dataKey="latency"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorLatency)"
              animationDuration={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
