import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ExerciseScreen } from '../components';
import { mobilityExercises } from '../data/mobility-exercises';
import { MobilityExerciseWithPreference } from '../types';
import { useUser } from '../hooks/useUser';

interface MobilityScreenProps {
  navigation: any;
}

export const MobilityScreen: React.FC<MobilityScreenProps> = ({
  navigation,
}) => {
  const { user, loading, updateExercisePreference, getExercisePreference } =
    useUser();
  const [exercises, setExercises] = useState<MobilityExerciseWithPreference[]>(
    [],
  );
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [exerciseDuration, setExerciseDuration] = useState<number>(0);

  useEffect(() => {
    if (!loading) {
      loadExercises();
    }
  }, [loading]);

  const loadExercises = () => {
    try {
      // Charger les exercices de mobilité avec les préférences utilisateur
      const mobilityExercisesData = mobilityExercises.map(exercise => ({
        ...exercise,
        userPreference: getExercisePreference(exercise.id),
      }));

      setExercises(mobilityExercisesData);

      // Calculer la durée totale (pour l'instant, on utilise une durée fixe)
      const total = mobilityExercisesData.length * 60; // 60 secondes par exercice par défaut
      setTotalDuration(total);
      setExerciseDuration(60); // 60 secondes par exercice par défaut
    } catch (error) {
      console.error('Erreur lors du chargement des exercices:', error);
    }
  };

  const handleExercisePreferenceChange = async (
    exerciseId: string,
    preference: 'green' | 'red' | 'white',
  ) => {
    try {
      await updateExercisePreference(exerciseId, preference);

      // Mettre à jour l'état local
      const updatedExercises = exercises.map(exercise =>
        exercise.id === exerciseId
          ? { ...exercise, userPreference: preference }
          : exercise,
      );
      setExercises(updatedExercises);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des préférences:', error);
    }
  };

  const startSession = () => {
    const selectedExercises = exercises.filter(
      ex => ex.userPreference !== 'red',
    );
    navigation.navigate('Session', {
      type: 'mobility',
      exercises: selectedExercises,
    });
  };

  const getSelectedExercisesCount = () => {
    return exercises.filter(ex => ex.userPreference !== 'red').length;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ExerciseScreen
      title="Séance de Mobilité"
      subtitle="Améliorez votre flexibilité et votre récupération"
      exercises={exercises}
      totalDuration={totalDuration}
      exerciseDuration={exerciseDuration}
      selectedCount={getSelectedExercisesCount()}
      onExercisePress={(exercise) => {
        // TODO: Afficher les détails de l'exercice
        console.log("Détails de l'exercice:", exercise.name);
      }}
      onPreferenceChange={handleExercisePreferenceChange}
      onStartSession={startSession}
      sessionType="mobility"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
});
