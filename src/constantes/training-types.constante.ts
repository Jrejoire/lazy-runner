export type TrainingTypeKey = 'running' | 'mobility' | 'strengthening';

export interface TrainingType {
  key: TrainingTypeKey;
  label: string;
  emoji: string;
  color: string;
}

export const TRAINING_TYPES: TrainingType[] = [
  { key: 'running', label: 'Course', emoji: '🏃‍♂️', color: '#FF6B35' },
  { key: 'mobility', label: 'Mobilité', emoji: '🧘‍♀️', color: '#4CAF50' },
  {
    key: 'strengthening',
    label: 'Renforcement',
    emoji: '💪',
    color: '#F44336',
  },
];

export const getTrainingTypeByKey = (
  key: TrainingTypeKey,
): TrainingType | undefined => {
  return TRAINING_TYPES.find(type => type.key === key);
};
