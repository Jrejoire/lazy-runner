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
    color: '#FF6B35',
  },
  {
    key: 'mobility',
    label: 'Mobilité',
    emoji: '🧘‍♀️',
    icon: 'accessibility',
    color: '#4CAF50',
  },
  {
    key: 'strengthening',
    label: 'Renforcement',
    emoji: '🔥',
    icon: 'flame',
    color: '#F44336',
  },
];

export const getTrainingTypeByKey = (
  key: TrainingTypeKey,
): TrainingType | undefined => {
  return TRAINING_TYPES.find(type => type.key === key);
};
