// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import App from './App.tsx';
import type { PlanStats, TrainingProgram } from './types.ts';

const samplePrograms: TrainingProgram[] = [
  {
    id: 'p1',
    titleAr: 'القيادة الحكومية',
    titleEn: 'Government Leadership',
    category: 'القيادة والإدارة',
    level: 'advanced',
    durationHours: 40,
    targetGrade: 'الإدارة العليا',
    deliveryMode: 'blended',
    objectiveAr: 'هدف عربي',
    objectiveEn: 'English objective',
  },
];

const sampleStats: PlanStats = {
  totalPrograms: 1,
  totalHours: 40,
  byLevel: { foundational: 0, intermediate: 0, advanced: 1 },
  categories: 1,
};

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => {
      if (url.endsWith('/api/programs')) {
        return new Response(JSON.stringify({ programs: samplePrograms }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (url.endsWith('/api/stats')) {
        return new Response(JSON.stringify(sampleStats), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    }),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('App', () => {
  it('renders the bilingual title and a fetched program', async () => {
    render(<App />);
    expect(screen.getByText('خطة التدريب الاحترافية')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('القيادة الحكومية')).toBeInTheDocument();
    });
  });

  it('shows aggregate stats from the API', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('40')).toBeInTheDocument();
    });
  });
});
