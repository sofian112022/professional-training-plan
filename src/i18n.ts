import type { DeliveryMode, TrainingLevel } from './types.ts';

export type Lang = 'ar' | 'en';

type Dict = Record<Lang, string>;

export const strings = {
  appTitle: { ar: 'خطة التدريب الاحترافية', en: 'Professional Training Plan' },
  subtitle: {
    ar: 'وفقاً لمعايير جهاز الدولة المصرية (GAHR)',
    en: 'According to GAHR Standards',
  },
  totalPrograms: { ar: 'إجمالي البرامج', en: 'Total Programs' },
  totalHours: { ar: 'إجمالي الساعات', en: 'Total Hours' },
  categories: { ar: 'المجالات', en: 'Categories' },
  advanced: { ar: 'برامج متقدمة', en: 'Advanced' },
  catalogue: { ar: 'دليل البرامج التدريبية', en: 'Training Catalogue' },
  addProgram: { ar: 'إضافة برنامج تدريبي', en: 'Add Training Program' },
  filterAll: { ar: 'كل المجالات', en: 'All categories' },
  level: { ar: 'المستوى', en: 'Level' },
  duration: { ar: 'المدة', en: 'Duration' },
  hours: { ar: 'ساعة', en: 'hours' },
  targetGrade: { ar: 'الدرجة المستهدفة', en: 'Target grade' },
  deliveryMode: { ar: 'أسلوب التقديم', en: 'Delivery mode' },
  titleAr: { ar: 'العنوان (عربي)', en: 'Title (Arabic)' },
  titleEn: { ar: 'العنوان (إنجليزي)', en: 'Title (English)' },
  category: { ar: 'المجال', en: 'Category' },
  objectiveAr: { ar: 'الهدف (عربي)', en: 'Objective (Arabic)' },
  objectiveEn: { ar: 'الهدف (إنجليزي)', en: 'Objective (English)' },
  save: { ar: 'حفظ البرنامج', en: 'Save program' },
  saving: { ar: 'جارٍ الحفظ...', en: 'Saving...' },
  cancel: { ar: 'إلغاء', en: 'Cancel' },
  createdSuccess: { ar: 'تمت إضافة البرنامج بنجاح', en: 'Program added successfully' },
  loading: { ar: 'جارٍ التحميل...', en: 'Loading...' },
  loadError: { ar: 'تعذّر تحميل البيانات', en: 'Failed to load data' },
  langToggle: { ar: 'English', en: 'العربية' },
} satisfies Record<string, Dict>;

export const levelLabels: Record<TrainingLevel, Dict> = {
  foundational: { ar: 'تأسيسي', en: 'Foundational' },
  intermediate: { ar: 'متوسط', en: 'Intermediate' },
  advanced: { ar: 'متقدم', en: 'Advanced' },
};

export const modeLabels: Record<DeliveryMode, Dict> = {
  onsite: { ar: 'حضوري', en: 'On-site' },
  remote: { ar: 'عن بُعد', en: 'Remote' },
  blended: { ar: 'مدمج', en: 'Blended' },
};

export function t(key: keyof typeof strings, lang: Lang): string {
  return strings[key][lang];
}
