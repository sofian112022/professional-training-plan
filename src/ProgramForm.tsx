import { useState } from 'react';
import type { NewTrainingProgram } from './types.ts';
import { modeLabels, levelLabels, t, type Lang } from './i18n.ts';

interface Props {
  lang: Lang;
  onCreate: (program: NewTrainingProgram) => Promise<void>;
  onCancel: () => void;
}

const empty: NewTrainingProgram = {
  titleAr: '',
  titleEn: '',
  category: '',
  level: 'foundational',
  durationHours: 16,
  targetGrade: '',
  deliveryMode: 'onsite',
  objectiveAr: '',
  objectiveEn: '',
};

export default function ProgramForm({ lang, onCreate, onCancel }: Props) {
  const [form, setForm] = useState<NewTrainingProgram>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof NewTrainingProgram>(
    key: K,
    value: NewTrainingProgram[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onCreate({ ...form, durationHours: Number(form.durationHours) });
      setForm(empty);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="program-form" onSubmit={submit} aria-label="add-program">
      <h3>{t('addProgram', lang)}</h3>
      <div className="grid">
        <label>
          {t('titleAr', lang)}
          <input
            required
            value={form.titleAr}
            onChange={(e) => update('titleAr', e.target.value)}
          />
        </label>
        <label>
          {t('titleEn', lang)}
          <input
            required
            value={form.titleEn}
            onChange={(e) => update('titleEn', e.target.value)}
          />
        </label>
        <label>
          {t('category', lang)}
          <input
            required
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
          />
        </label>
        <label>
          {t('targetGrade', lang)}
          <input
            required
            value={form.targetGrade}
            onChange={(e) => update('targetGrade', e.target.value)}
          />
        </label>
        <label>
          {t('level', lang)}
          <select
            value={form.level}
            onChange={(e) =>
              update('level', e.target.value as NewTrainingProgram['level'])
            }
          >
            {Object.entries(levelLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label[lang]}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t('deliveryMode', lang)}
          <select
            value={form.deliveryMode}
            onChange={(e) =>
              update(
                'deliveryMode',
                e.target.value as NewTrainingProgram['deliveryMode'],
              )
            }
          >
            {Object.entries(modeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label[lang]}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t('duration', lang)} ({t('hours', lang)})
          <input
            type="number"
            min={1}
            max={500}
            value={form.durationHours}
            onChange={(e) => update('durationHours', Number(e.target.value))}
          />
        </label>
      </div>
      <label>
        {t('objectiveAr', lang)}
        <textarea
          required
          rows={2}
          value={form.objectiveAr}
          onChange={(e) => update('objectiveAr', e.target.value)}
        />
      </label>
      <label>
        {t('objectiveEn', lang)}
        <textarea
          required
          rows={2}
          value={form.objectiveEn}
          onChange={(e) => update('objectiveEn', e.target.value)}
        />
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="form-actions">
        <button type="submit" className="primary" disabled={submitting}>
          {submitting ? t('saving', lang) : t('save', lang)}
        </button>
        <button type="button" className="ghost" onClick={onCancel}>
          {t('cancel', lang)}
        </button>
      </div>
    </form>
  );
}
