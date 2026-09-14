import express, { type Express } from 'express';
import cors from 'cors';
import {
  addProgram,
  computeStats,
  listPrograms,
  validateProgram,
  type NewTrainingProgram,
} from './data.ts';

export function createApp(): Express {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'professional-training-plan' });
  });

  app.get('/api/programs', (_req, res) => {
    res.json({ programs: listPrograms() });
  });

  app.get('/api/stats', (_req, res) => {
    res.json(computeStats());
  });

  app.post('/api/programs', (req, res) => {
    const errors = validateProgram(req.body);
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }
    const created = addProgram(req.body as NewTrainingProgram);
    res.status(201).json({ program: created });
  });

  return app;
}
