import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { ExerciseCard, ColorLegend } from './exercise-card';
import { MobilityExerciseWithPreference } from '../types';

interface ExercisesSectionProps {
  exercises: MobilityExerciseWithPreference[];
  onExercisePress: (exercise: MobilityExerciseWithPreference) => void;
  onPreferenceChange: (exerciseId: string, preference: 'green' | 'red' | 'white') => void;
  selectedCount: number;
}

export const ExercisesSection: React.FC<ExercisesSectionProps> = ({
  exercises,
  onExercisePress,
  onPreferenceChange,
  selectedCount,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercices de mobilité</Text>
        <Text style={styles.count}>
          {selectedCount} exercice(s) sélectionné(s)
        </Text>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.content}
      >
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
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    color: '#666',
  },
  list: {
    flex: 1,
  },
  content: {
    paddingBottom: Platform.OS === 'android' ? 100 : 20,
  },
});
