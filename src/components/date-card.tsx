'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2, Calendar, PartyPopper } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TimeElapsed } from './time-elapsed';
import type { DateEntry } from '@/lib/types';

interface DateCardProps {
  entry: DateEntry;
  onEdit: (entry: DateEntry) => void;
  onDelete: (id: string) => void;
}

export function DateCard({ entry, onEdit, onDelete }: DateCardProps) {
  const checkCelebration = () => {
    const entryDate = new Date(entry.date);
    const today = new Date();
    // For birthdays and anniversaries, compare month and day only (not year)
    const isSameMonthDay = entryDate.getMonth() === today.getMonth() &&
                           entryDate.getDate() === today.getDate();
    const hasCelebrationTag = entry.tags.includes('birthday') || entry.tags.includes('anniversary');
    return isSameMonthDay && hasCelebrationTag;
  };

  const [shouldCelebrate, setShouldCelebrate] = useState(checkCelebration);

  useEffect(() => {
    // Update immediately when entry changes
    setShouldCelebrate(checkCelebration());

    // Update celebration status every minute
    const interval = setInterval(() => {
      setShouldCelebrate(checkCelebration());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [entry.date, entry.tags]);

  return (
    <Card className="group hover:shadow-md transition-all duration-200 hover:border-ring animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg flex-shrink-0 ${shouldCelebrate ? 'bg-amber-100 dark:bg-amber-950' : 'bg-secondary'}`}>
                {shouldCelebrate ? (
                  <PartyPopper className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                ) : (
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-foreground truncate">
                  {entry.name || format(new Date(entry.date), 'PPP')}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {entry.name ? `${format(new Date(entry.date), 'PPP')} at ${format(new Date(entry.date), 'p')}` : `Started at ${format(new Date(entry.date), 'p')}`}
                </p>
                <TimeElapsed targetDate={entry.date} className="mt-2" />
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(entry)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(entry.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
