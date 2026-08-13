'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';

const DAY_MS = 1000 * 60 * 60 * 24;

export default function DeadlineBadge({ deadline }: { deadline: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const updateNow = () => setNow(Date.now());
    const initialTimer = window.setTimeout(updateNow, 0);
    const interval = window.setInterval(updateNow, 60_000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, []);

  if (now === null) return <Badge variant="outline">Due date</Badge>;

  const diff = new Date(deadline).getTime() - now;
  const days = Math.floor(diff / DAY_MS);

  if (diff < 0) return <Badge variant="destructive">Overdue</Badge>;
  if (days === 0) return <Badge className="bg-orange-500">Due Today</Badge>;
  if (days <= 3) return <Badge className="bg-yellow-500">Due in {days}d</Badge>;
  return <Badge className="bg-green-500">Due in {days}d</Badge>;
}
