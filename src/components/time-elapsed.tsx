'use client';

import { useEffect, useState } from 'react';
import { calculateTimeElapsed, formatTimeElapsed } from '@/lib/calculations';

interface TimeElapsedProps {
  targetDate: string;
  className?: string;
}

export function TimeElapsed({ targetDate, className }: TimeElapsedProps) {
  const [elapsed, setElapsed] = useState(() =>
    calculateTimeElapsed(new Date(targetDate))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(calculateTimeElapsed(new Date(targetDate)));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className={className}>
      <p className="text-sm text-muted-foreground">{formatTimeElapsed(elapsed)}</p>
    </div>
  );
}
