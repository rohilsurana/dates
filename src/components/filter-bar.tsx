'use client';

import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AVAILABLE_TAGS } from '@/lib/types';

interface FilterBarProps {
  selectedTag: string | null;
  onTagChange: (tag: string | null) => void;
  sortBy: 'date' | 'created' | 'name';
  onSortChange: (sort: 'date' | 'created' | 'name') => void;
}

export function FilterBar({ selectedTag, onTagChange, sortBy, onSortChange }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card border border-border rounded-lg">
      <div className="flex-1">
        <p className="text-xs font-medium text-muted-foreground mb-2">Filter by tag</p>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedTag === null ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => onTagChange(null)}
          >
            All
          </Badge>
          {AVAILABLE_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              className="cursor-pointer capitalize"
              onClick={() => onTagChange(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="w-full sm:w-48">
        <p className="text-xs font-medium text-muted-foreground mb-2">Sort by</p>
        <Select value={sortBy} onValueChange={(value: 'date' | 'created' | 'name') => onSortChange(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Original Date</SelectItem>
            <SelectItem value="created">Date Created</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
