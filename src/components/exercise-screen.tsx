import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { 
  ScreenHeader,
  TimersSection,
  ExercisesSection,
  ScreenFooter
} from './index';
import { MobilityExerciseWithPreference } from '../types';

interface ExerciseScreenProps {
  title: string;
  subtitle: string;
  exercises: MobilityExerciseWithPreference[];
  totalDuration: number;
  exerciseDuration: number;
  selectedCount: number;
  onExercisePress: (exercise: MobilityExerciseWithPreference) => void;
  onPreferenceChange: (exerciseId: string, preference: 'green' | 'red' | 'white') => void;
  onStartSession: () => void;
  sessionType: 'mobility' | 'strengthening';
}

export const ExerciseScreen: React.FC<ExerciseScreenProps> = ({
  title,
  subtitle,
  exercises,
  totalDuration,
  exerciseDuration,
  selectedCount,
  onExercisePress,
  onPreferenceChange,
  onStartSession,
  sessionType,
}) => {
  const handleStartSession = () => {
    if (selectedCount === 0) {
      Alert.alert(
        'Aucun exercice sélectionné',
        'Veuillez sélectionner au moins un exercice (🟢 ou ⚪️) pour commencer la séance.',
      );
      return;
    }
    onStartSession();
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={title}
        subtitle={subtitle}
      />

      <TimersSection
        totalDuration={totalDuration}
        exerciseDuration={exerciseDuration}
      />

      <ExercisesSection
        exercises={exercises}
        onExercisePress={onExercisePress}
        onPreferenceChange={onPreferenceChange}
        selectedCount={selectedCount}
      />

      <ScreenFooter
        title="Commencer la séance"
        onPress={handleStartSession}
        disabled={selectedCount === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
