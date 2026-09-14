import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import express from 'express';
import { createApp } from './app.ts';

const app = createApp();

const PORT = Number(process.env.API_PORT ?? 3001);
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const distDir = path.resolve(dirname, '..', 'dist');
  if (fs.existsSync(distDir)) {
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }
}

app.listen(PORT, () => {
  console.log(`[api] Training Plan API listening on http://localhost:${PORT}`);
});
