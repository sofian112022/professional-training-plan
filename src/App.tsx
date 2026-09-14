import { useEffect, useMemo, useState } from 'react';
import type { NewTrainingProgram, PlanStats, TrainingProgram } from './types.ts';
import { createProgram, fetchPrograms, fetchStats } from './api.ts';
import { levelLabels, modeLabels, t, type Lang } from './i18n.ts';
import ProgramForm from './ProgramForm.tsx';

export default function App() {
  const [lang, setLang] = useState<Lang>('ar');
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [stats, setStats] = useState<PlanStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const [nextPrograms, nextStats] = await Promise.all([
        fetchPrograms(),
        fetchStats(),
      ]);
      setPrograms(nextPrograms);
      setStats(nextStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(programs.map((p) => p.category))),
    [programs],
  );

  const visible = useMemo(
    () =>
      category === 'all'
        ? programs
        : programs.filter((p) => p.category === category),
    [programs, category],
  );

  async function handleCreate(input: NewTrainingProgram) {
    await createProgram(input);
    await refresh();
    setShowForm(false);
    setFlash(t('createdSuccess', lang));
    window.setTimeout(() => setFlash(null), 3500);
  }

  return (
    <div className="app" dir={dir}>
      <header className="hero">
        <div className="hero-text">
          <h1>{t('appTitle', lang)}</h1>
          <p>{t('subtitle', lang)}</p>
        </div>
        <button
          className="lang-toggle"
          onClick={() => setLang((l) => (l === 'ar' ? 'en' : 'ar'))}
        >
          {t('langToggle', lang)}
        </button>
      </header>

      {stats && (
        <section className="stats" aria-label="stats">
          <StatCard label={t('totalPrograms', lang)} value={stats.totalPrograms} />
          <StatCard label={t('totalHours', lang)} value={stats.totalHours} />
          <StatCard label={t('categories', lang)} value={stats.categories} />
          <StatCard label={t('advanced', lang)} value={stats.byLevel.advanced} />
        </section>
      )}

      {flash && <div className="flash" role="status">{flash}</div>}

      <section className="toolbar">
        <div className="filters">
          <label>
            {t('category', lang)}
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">{t('filterAll', lang)}</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="primary" onClick={() => setShowForm((s) => !s)}>
          + {t('addProgram', lang)}
        </button>
      </section>

      {showForm && (
        <ProgramForm
          lang={lang}
          onCreate={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <h2 className="section-title">{t('catalogue', lang)}</h2>

      {loading && <p className="muted">{t('loading', lang)}</p>}
      {error && <p className="form-error" role="alert">{t('loadError', lang)}: {error}</p>}

      <div className="cards">
        {visible.map((program) => (
          <article className="card" key={program.id}>
            <div className={`badge level-${program.level}`}>
              {levelLabels[program.level][lang]}
            </div>
            <h3>{lang === 'ar' ? program.titleAr : program.titleEn}</h3>
            <p className="card-sub">
              {lang === 'ar' ? program.titleEn : program.titleAr}
            </p>
            <p className="objective">
              {lang === 'ar' ? program.objectiveAr : program.objectiveEn}
            </p>
            <dl className="meta">
              <div>
                <dt>{t('category', lang)}</dt>
                <dd>{program.category}</dd>
              </div>
              <div>
                <dt>{t('duration', lang)}</dt>
                <dd>
                  {program.durationHours} {t('hours', lang)}
                </dd>
              </div>
              <div>
                <dt>{t('targetGrade', lang)}</dt>
                <dd>{program.targetGrade}</dd>
              </div>
              <div>
                <dt>{t('deliveryMode', lang)}</dt>
                <dd>{modeLabels[program.deliveryMode][lang]}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat-card">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
