// Couleurs principales de l'application
export const COLORS = {
  // Couleurs principales
  orange: '#f56d23',
  gris: '#c9c9c9',
  orange_fonce: '#ee5020',
  gris_fonce: '#cccccc',
  blanc: '#ffffff',
  noir: '#000000',
  rouge: '#db2323',
  vert: '#05a312',
  bleu: '#0000ff',
  jaune: '#ffff00',
  violet: '#800080',
  marron: '#800000',
  cyan: '#00ffff',

  // Couleurs de fond
  background: '#f5f4f0',

  // Couleurs d'état
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  // Couleurs des entrainements
  running: '#FF6B35',
  mobility: '#4CAF50',
  strengthening: '#B61B28',
} as const;

// Types pour les couleurs
export type ColorKey = keyof typeof COLORS;
export type ExercisePreferenceColor = 'green' | 'red' | 'white';
export type UserLevel = 'débutant' | 'intermédiaire' | 'avancé';
