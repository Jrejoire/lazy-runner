import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Layout, Timer, ExercisesSection } from '../components';
import { COLORS } from '../constantes/color.constante';
import { mobilityExercises } from '../data/mobility-exercises';
import { MobilityExerciseWithPreference } from '../types';

export default function MobilityScreen() {
  const [exercises, setExercises] = useState<MobilityExerciseWithPreference[]>(
    mobilityExercises.map(exercise => ({
      ...exercise,
      userPreference: 'white',
    })),
  );

  const handleExercisePress = (exercise: MobilityExerciseWithPreference) => {
    console.log('Exercise pressed:', exercise.name);
  };

  const handlePreferenceChange = (
    exerciseId: string,
    preference: 'green' | 'red' | 'white',
  ) => {
    setExercises(prev =>
      prev.map(exercise =>
        exercise.id === exerciseId
          ? { ...exercise, userPreference: preference }
          : exercise,
      ),
    );
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <Timer
          seconds={300}
          label="Durée de la séance"
          mode="setter"
          onValueChange={value => console.log('Value changed:', value)}
          onComplete={() => console.log('Timer completed')}
        />

        <Timer
          seconds={30}
          label="Durée de chaque exercice"
          mode="setter"
          onValueChange={value => console.log('Value changed:', value)}
          onComplete={() => console.log('Timer completed')}
        />

        <ExercisesSection
          exercises={exercises}
          onExercisePress={handleExercisePress}
          onPreferenceChange={handlePreferenceChange}
        />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
});
