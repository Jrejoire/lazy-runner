import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { ExerciseCard } from './exercise-card';
import { ColorLegend } from './color-legend';
import { MobilityExerciseWithPreference } from '../types';

interface ExercisesSectionProps {
  exercises: MobilityExerciseWithPreference[];
  onExercisePress: (exercise: MobilityExerciseWithPreference) => void;
  onPreferenceChange: (
    exerciseId: string,
    preference: 'green' | 'red' | 'white',
  ) => void;
}

export const ExercisesSection: React.FC<ExercisesSectionProps> = ({
  exercises,
  onExercisePress,
  onPreferenceChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercices</Text>

      <ScrollView>
        {exercises.map(exercise => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onPress={() => onExercisePress(exercise)}
            onPreferenceChange={preference =>
              onPreferenceChange(exercise.id, preference)
            }
          />
        ))}
      </ScrollView>

      <ColorLegend />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
});
