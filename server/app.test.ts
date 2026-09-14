import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from './app.ts';
import { resetStore } from './data.ts';

describe('Training Plan API', () => {
  const app = createApp();

  beforeEach(() => {
    resetStore();
  });

  it('reports health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('returns the seeded programs', async () => {
    const res = await request(app).get('/api/programs');
    expect(res.status).toBe(200);
    expect(res.body.programs).toHaveLength(5);
    expect(res.body.programs[0]).toHaveProperty('titleAr');
  });

  it('computes aggregate stats', async () => {
    const res = await request(app).get('/api/stats');
    expect(res.status).toBe(200);
    expect(res.body.totalPrograms).toBe(5);
    expect(res.body.totalHours).toBe(141);
    expect(res.body.byLevel.advanced).toBe(1);
  });

  it('creates a valid program', async () => {
    const res = await request(app)
      .post('/api/programs')
      .send({
        titleAr: 'إدارة المشروعات الحكومية',
        titleEn: 'Government Project Management',
        category: 'إدارة المشروعات',
        level: 'intermediate',
        durationHours: 25,
        targetGrade: 'الدرجة الأولى',
        deliveryMode: 'blended',
        objectiveAr: 'تطبيق منهجيات إدارة المشروعات في القطاع الحكومي.',
        objectiveEn: 'Apply project management methodologies in the public sector.',
      });
    expect(res.status).toBe(201);
    expect(res.body.program.id).toBeTruthy();

    const list = await request(app).get('/api/programs');
    expect(list.body.programs).toHaveLength(6);
  });

  it('rejects an invalid program', async () => {
    const res = await request(app)
      .post('/api/programs')
      .send({ titleAr: '', level: 'wrong', durationHours: -3 });
    expect(res.status).toBe(400);
    expect(res.body.errors.length).toBeGreaterThan(0);
    const fields = res.body.errors.map((e: { field: string }) => e.field);
    expect(fields).toContain('titleAr');
    expect(fields).toContain('level');
    expect(fields).toContain('durationHours');
  });
});
