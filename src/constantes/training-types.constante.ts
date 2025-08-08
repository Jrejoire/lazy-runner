import { COLORS } from './color.constante';

export type TrainingTypeKey = 'running' | 'mobility' | 'strengthening';

export interface TrainingType {
  key: TrainingTypeKey;
  label: string;
  emoji: string;
  icon?: string; // Pour les icônes vectorielles
  color: string;
}

export const TRAINING_TYPES: TrainingType[] = [
  {
    key: 'running',
    label: 'Course',
    emoji: '🏃‍♂️',
    icon: 'zap',
    color: COLORS.running,
  },
  {
    key: 'mobility',
    label: 'Mobilité',
    emoji: '🧘‍♀️',
    icon: 'ruby',
    color: COLORS.mobility,
  },
  {
    key: 'strengthening',
    label: 'Renforcement',
    emoji: '🔥',
    icon: 'flame',
    color: COLORS.strengthening,
  },
];

export const getTrainingTypeByKey = (
  key: TrainingTypeKey,
): TrainingType | undefined => {
  return TRAINING_TYPES.find(type => type.key === key);
};
