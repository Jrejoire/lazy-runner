export const SCREENS = {
  HOME: 'Home',
  MOBILITY: 'Mobility',
  STRENGTHENING: 'Strengthening',
  SESSION: 'Session',
} as const;

export type RootStackParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.MOBILITY]: undefined;
  [SCREENS.STRENGTHENING]: undefined;
  [SCREENS.SESSION]: { type: 'mobility' | 'strengthening'; exercises: any[] };
};
