'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AVAILABLE_TAGS, type Tag } from '@/lib/types';

interface DateFormProps {
  onSubmit: (data: { name: string; date: string; tags: string[] }) => void;
  onCancel?: () => void;
  initialData?: {
    name: string;
    date: string;
    tags: string[];
  };
}

export function DateForm({ onSubmit, onCancel, initialData }: DateFormProps) {
  const [date, setDate] = useState<Date | undefined>(
    initialData?.date ? new Date(initialData.date) : undefined
  );
  const [time, setTime] = useState(
    initialData?.date ? format(new Date(initialData.date), 'HH:mm') : '00:00'
  );
  const [name, setName] = useState(initialData?.name || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || []);
  const [showTimeInput, setShowTimeInput] = useState(!!initialData?.date);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setDate(initialData.date ? new Date(initialData.date) : undefined);
      setTime(initialData.date ? format(new Date(initialData.date), 'HH:mm') : '00:00');
      setName(initialData.name || '');
      setSelectedTags(initialData.tags || []);
      setShowTimeInput(true);
    } else {
      setDate(undefined);
      setTime('00:00');
      setName('');
      setSelectedTags([]);
      setShowTimeInput(false);
    }
  }, [initialData]);

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    const [hours, minutes] = time.split(':').map(Number);
    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);

    onSubmit({
      name: name.trim(),
      date: dateTime.toISOString(),
      tags: selectedTags,
    });

    // Reset form
    setDate(undefined);
    setTime('00:00');
    setName('');
    setSelectedTags([]);
    setShowTimeInput(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-card border border-border rounded-lg">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-medium">
            Date *
          </Label>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  setIsPopoverOpen(false);
                }}
                initialFocus
                captionLayout="dropdown"
                fromYear={1900}
                toYear={2100}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-muted-foreground">Time (optional)</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs"
              onClick={() => setShowTimeInput(!showTimeInput)}
            >
              {showTimeInput ? 'Hide' : 'Add time'}
            </Button>
          </div>
          {showTimeInput && (
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">
            Name (optional)
          </Label>
          <Input
            id="name"
            placeholder="e.g., Rachel's Birthday, First Day at Work"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Tags (optional)</Label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TAGS.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                className="cursor-pointer capitalize"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={!date} className="flex-1">
          <Plus className="mr-2 h-4 w-4" />
          {initialData ? 'Update' : 'Track Date'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
