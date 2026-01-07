export interface DateEntry {
  id: string;
  name: string;
  date: string; // ISO format
  tags: string[];
  createdAt: string;
}

export const AVAILABLE_TAGS = [
  'birthday',
  'anniversary',
  'graduation',
  'work',
  'personal',
  'milestone',
  'other',
] as const;

export type Tag = typeof AVAILABLE_TAGS[number];
