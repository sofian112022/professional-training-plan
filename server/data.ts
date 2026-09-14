export type TrainingLevel = 'foundational' | 'intermediate' | 'advanced';
export type DeliveryMode = 'onsite' | 'remote' | 'blended';

export interface TrainingProgram {
  id: string;
  titleAr: string;
  titleEn: string;
  category: string;
  level: TrainingLevel;
  durationHours: number;
  targetGrade: string;
  deliveryMode: DeliveryMode;
  objectiveAr: string;
  objectiveEn: string;
}

export type NewTrainingProgram = Omit<TrainingProgram, 'id'>;

/**
 * Seed catalogue reflecting the competency domains that the Egyptian Central
 * Agency for Organization and Administration (GAHR) expects in civil-service
 * professional development plans.
 */
export const seedPrograms: TrainingProgram[] = [
  {
    id: 'gahr-lead-001',
    titleAr: 'القيادة الحكومية الفعّالة',
    titleEn: 'Effective Government Leadership',
    category: 'القيادة والإدارة',
    level: 'advanced',
    durationHours: 40,
    targetGrade: 'الإدارة العليا',
    deliveryMode: 'blended',
    objectiveAr: 'تنمية مهارات القيادة الاستراتيجية واتخاذ القرار في المؤسسات الحكومية.',
    objectiveEn: 'Develop strategic leadership and decision-making skills in public institutions.',
  },
  {
    id: 'gahr-dig-002',
    titleAr: 'التحول الرقمي في الخدمة الحكومية',
    titleEn: 'Digital Transformation in Public Service',
    category: 'المهارات الرقمية',
    level: 'intermediate',
    durationHours: 30,
    targetGrade: 'الدرجة الأولى والثانية',
    deliveryMode: 'remote',
    objectiveAr: 'تمكين الموظفين من أدوات التحول الرقمي وميكنة الخدمات العامة.',
    objectiveEn: 'Enable staff to use digital transformation tools and automate public services.',
  },
  {
    id: 'gahr-eth-003',
    titleAr: 'أخلاقيات وقيم الوظيفة العامة',
    titleEn: 'Ethics and Values of Public Office',
    category: 'السلوك المهني',
    level: 'foundational',
    durationHours: 16,
    targetGrade: 'جميع الدرجات',
    deliveryMode: 'onsite',
    objectiveAr: 'ترسيخ مبادئ النزاهة والشفافية والمساءلة في أداء الوظيفة العامة.',
    objectiveEn: 'Instil integrity, transparency and accountability in public duties.',
  },
  {
    id: 'gahr-com-004',
    titleAr: 'مهارات التواصل وخدمة المواطنين',
    titleEn: 'Communication and Citizen Service Skills',
    category: 'مهارات التواصل',
    level: 'foundational',
    durationHours: 20,
    targetGrade: 'الدرجة الثالثة والرابعة',
    deliveryMode: 'blended',
    objectiveAr: 'تحسين جودة التواصل وخدمة المتعاملين وفق معايير الجودة الحكومية.',
    objectiveEn: 'Improve communication quality and citizen service per government standards.',
  },
  {
    id: 'gahr-fin-005',
    titleAr: 'إدارة الموازنة والتخطيط المالي',
    titleEn: 'Budget Management and Financial Planning',
    category: 'الإدارة المالية',
    level: 'intermediate',
    durationHours: 35,
    targetGrade: 'الدرجة الأولى',
    deliveryMode: 'onsite',
    objectiveAr: 'تطوير مهارات إعداد الموازنات ومراقبة الأداء المالي الحكومي.',
    objectiveEn: 'Build skills to prepare budgets and monitor public financial performance.',
  },
];

let programs: TrainingProgram[] = [];

export function resetStore(): void {
  programs = seedPrograms.map((program) => ({ ...program }));
}

export function listPrograms(): TrainingProgram[] {
  return programs.map((program) => ({ ...program }));
}

const VALID_LEVELS: TrainingLevel[] = ['foundational', 'intermediate', 'advanced'];
const VALID_MODES: DeliveryMode[] = ['onsite', 'remote', 'blended'];

export interface ValidationError {
  field: string;
  message: string;
}

export function validateProgram(input: unknown): ValidationError[] {
  const errors: ValidationError[] = [];
  const value = (input ?? {}) as Partial<NewTrainingProgram>;

  const requireText = (field: keyof NewTrainingProgram) => {
    const raw = value[field];
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      errors.push({ field, message: `${field} is required` });
    }
  };

  requireText('titleAr');
  requireText('titleEn');
  requireText('category');
  requireText('targetGrade');
  requireText('objectiveAr');
  requireText('objectiveEn');

  if (!VALID_LEVELS.includes(value.level as TrainingLevel)) {
    errors.push({ field: 'level', message: 'level must be one of ' + VALID_LEVELS.join(', ') });
  }
  if (!VALID_MODES.includes(value.deliveryMode as DeliveryMode)) {
    errors.push({ field: 'deliveryMode', message: 'deliveryMode must be one of ' + VALID_MODES.join(', ') });
  }
  const hours = Number(value.durationHours);
  if (!Number.isFinite(hours) || hours <= 0 || hours > 500) {
    errors.push({ field: 'durationHours', message: 'durationHours must be between 1 and 500' });
  }

  return errors;
}

export function addProgram(input: NewTrainingProgram): TrainingProgram {
  const program: TrainingProgram = {
    ...input,
    durationHours: Number(input.durationHours),
    id: `gahr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
  };
  programs.push(program);
  return { ...program };
}

export interface PlanStats {
  totalPrograms: number;
  totalHours: number;
  byLevel: Record<TrainingLevel, number>;
  categories: number;
}

export function computeStats(): PlanStats {
  const byLevel: Record<TrainingLevel, number> = {
    foundational: 0,
    intermediate: 0,
    advanced: 0,
  };
  const categories = new Set<string>();
  let totalHours = 0;

  for (const program of programs) {
    byLevel[program.level] += 1;
    categories.add(program.category);
    totalHours += program.durationHours;
  }

  return {
    totalPrograms: programs.length,
    totalHours,
    byLevel,
    categories: categories.size,
  };
}

resetStore();
