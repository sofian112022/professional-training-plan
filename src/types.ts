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

export interface PlanStats {
  totalPrograms: number;
  totalHours: number;
  byLevel: Record<TrainingLevel, number>;
  categories: number;
}
