import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Button, Timer, ExerciseCard, ColorLegend } from '../components';
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
    if (selectedExercises.length === 0) {
      Alert.alert(
        'Aucun exercice sélectionné',
        'Veuillez sélectionner au moins un exercice (🟢 ou ⚪️) pour commencer la séance.',
      );
      return;
    }

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Séance de Mobilité</Text>
        <Text style={styles.subtitle}>
          Améliorez votre flexibilité et votre récupération
        </Text>
      </View>

      <View style={styles.timersContainer}>
        <View style={styles.timerRow}>
          <Timer seconds={totalDuration} label="Durée totale" size="medium" />
          <Timer
            seconds={exerciseDuration}
            label="Temps par exercice"
            size="medium"
          />
        </View>
      </View>

      <View style={styles.exercisesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Exercices de mobilité</Text>
          <Text style={styles.exerciseCount}>
            {getSelectedExercisesCount()} exercice(s) sélectionné(s)
          </Text>
        </View>

        <ScrollView
          style={styles.exercisesList}
          contentContainerStyle={styles.exercisesContent}
        >
          {exercises.map(exercise => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onPress={() => {
                // TODO: Afficher les détails de l'exercice
                console.log("Détails de l'exercice:", exercise.name);
              }}
              onPreferenceChange={preference =>
                handleExercisePreferenceChange(exercise.id, preference)
              }
            />
          ))}
        </ScrollView>

        <ColorLegend />
      </View>

      <View style={styles.footer}>
        <Button
          title="Commencer la séance"
          onPress={startSession}
          disabled={getSelectedExercisesCount() === 0}
        />
      </View>
    </View>
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
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  timersContainer: {
    padding: 16,
  },
  timerRow: {
    flexDirection: 'row',
    gap: 16,
  },
  exercisesSection: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  exerciseCount: {
    fontSize: 14,
    color: '#666',
  },
  exercisesList: {
    flex: 1,
  },
  exercisesContent: {
    paddingBottom: Platform.OS === 'android' ? 100 : 20,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});
