// Contribution types + pure helpers shared by the graph components.

export type ContributionLevel =
  | 'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE';

export interface ContributionDay {
  contributionCount: number;
  contributionLevel: ContributionLevel;
  date: string; // YYYY-MM-DD
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

/** contributionLevel → 0..4 (index into the --gh-level-* theme tokens) */
export const LEVEL_INDEX: Record<ContributionLevel, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Flatten weeks (column-major: week × day Sun→Sat) — preserves GitHub's ordering. */
export function flattenDays(weeks: ContributionWeek[]): ContributionDay[] {
  return weeks.flatMap((w) => w.contributionDays);
}

/**
 * Month label positions: a label is emitted for the first week column whose
 * leading day (Sunday) falls in a new month — GitHub's labeling behavior.
 */
export function monthLabelPositions(weeks: ContributionWeek[]): { col: number; label: string }[] {
  const out: { col: number; label: string }[] = [];
  let prevMonth = -1;
  weeks.forEach((week, col) => {
    const lead = week.contributionDays[0];
    if (!lead) return;
    const month = new Date(lead.date).getMonth();
    if (month !== prevMonth) {
      out.push({ col, label: MONTH_NAMES[month] });
      prevMonth = month;
    }
  });
  return out;
}

/** "July 29, 2026" */
export function formatDay(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function tooltipText(day: ContributionDay): string {
  return `${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'} on ${formatDay(day.date)}`;
}
