import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  subYears,
  subMonths,
  subDays,
  subHours,
  subMinutes,
} from 'date-fns';

export interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export function calculateTimeElapsed(targetDate: Date): TimeElapsed {
  const now = new Date();

  const years = differenceInYears(now, targetDate);
  const afterYears = subYears(now, years);

  const months = differenceInMonths(afterYears, targetDate);
  const afterMonths = subMonths(afterYears, months);

  const days = differenceInDays(afterMonths, targetDate);
  const afterDays = subDays(afterMonths, days);

  const hours = differenceInHours(afterDays, targetDate);
  const afterHours = subHours(afterDays, hours);

  const minutes = differenceInMinutes(afterHours, targetDate);
  const afterMinutes = subMinutes(afterHours, minutes);

  const seconds = differenceInSeconds(afterMinutes, targetDate);

  const totalSeconds = differenceInSeconds(now, targetDate);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
  };
}

export function formatTimeElapsed(elapsed: TimeElapsed): string {
  const parts: string[] = [];

  if (elapsed.years > 0) {
    parts.push(`${elapsed.years} year${elapsed.years !== 1 ? 's' : ''}`);
  }
  if (elapsed.months > 0) {
    parts.push(`${elapsed.months} month${elapsed.months !== 1 ? 's' : ''}`);
  }
  if (elapsed.days > 0) {
    parts.push(`${elapsed.days} day${elapsed.days !== 1 ? 's' : ''}`);
  }
  if (elapsed.hours > 0) {
    parts.push(`${elapsed.hours} hour${elapsed.hours !== 1 ? 's' : ''}`);
  }
  if (elapsed.minutes > 0) {
    parts.push(`${elapsed.minutes} minute${elapsed.minutes !== 1 ? 's' : ''}`);
  }
  if (elapsed.seconds > 0 || parts.length === 0) {
    parts.push(`${elapsed.seconds} second${elapsed.seconds !== 1 ? 's' : ''}`);
  }

  return parts.join(', ') + ' ago';
}
