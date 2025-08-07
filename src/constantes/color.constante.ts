// Couleurs principales de l'application
export const COLORS = {
  // Couleurs principales
  PRIMARY: '#FF6B35',
  SECONDARY: '#4CAF50',
  DANGER: '#F44336',

  // Couleurs de fond
  BACKGROUND: '#F5F5F5',
  BACKGROUND_SECONDARY: '#f8f9fa',
  CARD_BACKGROUND: '#FFFFFF',

  // Couleurs de texte
  TEXT_PRIMARY: '#1a1a1a',
  TEXT_SECONDARY: '#666',
  TEXT_LIGHT: '#999',
  TEXT_WHITE: '#FFFFFF',

  // Couleurs d'état
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  ERROR: '#F44336',
  INFO: '#2196F3',

  // Couleurs de navigation
  TAB_ACTIVE: '#FF6B35',
  TAB_INACTIVE: '#666',

  // Couleurs de bordure
  BORDER: '#E0E0E0',
  BORDER_LIGHT: '#eee',

  // Couleurs d'exercice (préférences utilisateur)
  EXERCISE_GREEN: '#4CAF50', // Exercice préféré
  EXERCISE_RED: '#F44336', // Exercice à éviter
  EXERCISE_WHITE: '#FFFFFF', // Exercice neutre

  // Couleurs de niveau utilisateur
  LEVEL_BEGINNER: '#4CAF50',
  LEVEL_INTERMEDIATE: '#FF9800',
  LEVEL_ADVANCED: '#F44336',

  // Couleurs de gradient
  GRADIENT_START: '#FF6B35',
  GRADIENT_END: '#FF8A65',

  // Couleurs de notification
  NOTIFICATION_SUCCESS: '#4CAF50',
  NOTIFICATION_WARNING: '#FF9800',
  NOTIFICATION_ERROR: '#F44336',

  // Couleurs de statut
  STATUS_COMPLETED: '#4CAF50',
  STATUS_PENDING: '#FF9800',
  STATUS_REST: '#9E9E9E',
} as const;

// Types pour les couleurs
export type ColorKey = keyof typeof COLORS;
export type ExercisePreferenceColor = 'green' | 'red' | 'white';
export type UserLevel = 'débutant' | 'intermédiaire' | 'avancé';
