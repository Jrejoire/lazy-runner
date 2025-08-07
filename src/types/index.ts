export interface MobilityExercise {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface StrengtheningExercise {
  id: string;
  name: string;
  description: string;
  image1: string;
  image2: string;
  repDebutant: number;
  repIntermediaire: number;
  repAvance: number;
}

// Types étendus avec préférences utilisateur
export interface MobilityExerciseWithPreference extends MobilityExercise {
  userPreference: 'green' | 'red' | 'white';
}

export interface StrengtheningExerciseWithPreference
  extends StrengtheningExercise {
  userPreference: 'green' | 'red' | 'white';
}

export interface User {
  id: string;
  name: string;
  level: 'débutant' | 'intermédiaire' | 'avancé';
  exercisePreferences: {
    [exerciseId: string]: 'green' | 'red' | 'white';
  };
  weeklyPlan: WeeklyPlan;
  createdAt: Date;
  lastActive: Date;
}

export interface Session {
  id: string;
  type: 'mobility' | 'strengthening';
  exercises: MobilityExercise[] | StrengtheningExercise[];
  totalDuration: number;
  currentExerciseIndex: number;
  isActive: boolean;
  startTime?: Date;
}

export interface WeeklyPlan {
  [day: string]: {
    running?: boolean;
    mobility?: boolean;
    strengthening?: boolean;
    notes?: string;
  };
}

// Garder pour la compatibilité, mais déprécié
export interface UserPreferences {
  weeklyPlan: WeeklyPlan;
  exercisePreferences: { [exerciseId: string]: 'green' | 'red' | 'white' };
}
