import type { NewTrainingProgram, PlanStats, TrainingProgram } from './types.ts';

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      if (body?.errors) detail = JSON.stringify(body.errors);
    } catch {
      /* ignore parse errors */
    }
    throw new Error(`Request failed (${res.status}): ${detail}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchPrograms(): Promise<TrainingProgram[]> {
  const data = await handle<{ programs: TrainingProgram[] }>(
    await fetch('/api/programs'),
  );
  return data.programs;
}

export async function fetchStats(): Promise<PlanStats> {
  return handle<PlanStats>(await fetch('/api/stats'));
}

export async function createProgram(
  input: NewTrainingProgram,
): Promise<TrainingProgram> {
  const data = await handle<{ program: TrainingProgram }>(
    await fetch('/api/programs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }),
  );
  return data.program;
}
