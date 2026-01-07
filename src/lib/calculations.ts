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
  isFuture: boolean;
}

export function calculateTimeElapsed(targetDate: Date): TimeElapsed {
  const now = new Date();
  const isFuture = targetDate > now;

  // For future dates, swap the order
  const start = isFuture ? now : targetDate;
  const end = isFuture ? targetDate : now;

  const years = differenceInYears(end, start);
  const afterYears = subYears(end, years);

  const months = differenceInMonths(afterYears, start);
  const afterMonths = subMonths(afterYears, months);

  const days = differenceInDays(afterMonths, start);
  const afterDays = subDays(afterMonths, days);

  const hours = differenceInHours(afterDays, start);
  const afterHours = subHours(afterDays, hours);

  const minutes = differenceInMinutes(afterHours, start);
  const afterMinutes = subMinutes(afterHours, minutes);

  const seconds = differenceInSeconds(afterMinutes, start);

  const totalSeconds = differenceInSeconds(end, start);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    isFuture,
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

  const timeString = parts.join(', ');
  return elapsed.isFuture ? `in ${timeString}` : `${timeString} ago`;
}
