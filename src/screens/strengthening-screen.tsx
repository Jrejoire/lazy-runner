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
import { strengtheningExercises } from '../data/strengthening-exercises';
import { StrengtheningExerciseWithPreference } from '../types';
import { useUser } from '../hooks/useUser';

interface StrengtheningScreenProps {
  navigation: any;
}

export const StrengtheningScreen: React.FC<StrengtheningScreenProps> = ({
  navigation,
}) => {
  const {
    user,
    loading,
    updateExercisePreference,
    getExercisePreference,
    updateUserLevel,
  } = useUser();
  const [exercises, setExercises] = useState<
    StrengtheningExerciseWithPreference[]
  >([]);
  const [totalSets, setTotalSets] = useState<number>(0);
  const [restTime, setRestTime] = useState<number>(60);
  const [userLevel, setUserLevel] = useState<
    'débutant' | 'intermédiaire' | 'avancé'
  >('débutant');

  useEffect(() => {
    if (!loading) {
      loadExercises();
      setUserLevel(user?.level || 'débutant');
    }
  }, [loading, user]);

  const loadExercises = () => {
    try {
      // Charger les exercices de renforcement avec les préférences utilisateur
      const strengtheningExercisesData = strengtheningExercises.map(
        exercise => ({
          ...exercise,
          userPreference: getExercisePreference(exercise.id),
        }),
      );

      setExercises(strengtheningExercisesData);

      // Calculer le nombre total de séries (3 séries par exercice par défaut)
      const total = strengtheningExercisesData.length * 3;
      setTotalSets(total);

      // Définir le temps de repos par défaut (60 secondes par défaut)
      setRestTime(60);
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

  const handleUserLevelChange = async (
    level: 'débutant' | 'intermédiaire' | 'avancé',
  ) => {
    try {
      await updateUserLevel(level);
      setUserLevel(level);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du niveau:', error);
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
      type: 'strengthening',
      exercises: selectedExercises,
      userLevel,
    });
  };

  const getSelectedExercisesCount = () => {
    return exercises.filter(ex => ex.userPreference !== 'red').length;
  };

  const getRepsForLevel = (exercise: StrengtheningExerciseWithPreference) => {
    switch (userLevel) {
      case 'débutant':
        return exercise.repDebutant;
      case 'intermédiaire':
        return exercise.repIntermediaire;
      case 'avancé':
        return exercise.repAvance;
      default:
        return exercise.repDebutant;
    }
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
        <Text style={styles.title}>Séance de Renforcement</Text>
        <Text style={styles.subtitle}>
          Renforcez vos muscles pour améliorer vos performances
        </Text>
      </View>

      <View style={styles.levelSelector}>
        <Text style={styles.levelTitle}>Niveau :</Text>
        <View style={styles.levelButtons}>
          {(['débutant', 'intermédiaire', 'avancé'] as const).map(level => (
            <Button
              key={level}
              title={level}
              onPress={() => handleUserLevelChange(level)}
              variant={userLevel === level ? 'primary' : 'secondary'}
              style={styles.levelButton}
            />
          ))}
        </View>
      </View>

      <View style={styles.timersContainer}>
        <View style={styles.timerRow}>
          <Timer seconds={totalSets} label="Séries totales" size="medium" />
          <Timer seconds={restTime} label="Temps de repos" size="medium" />
        </View>
      </View>

      <View style={styles.exercisesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Exercices de renforcement</Text>
          <Text style={styles.exerciseCount}>
            {getSelectedExercisesCount()} exercice(s) sélectionné(s)
          </Text>
        </View>

        <ScrollView
          style={styles.exercisesList}
          contentContainerStyle={styles.exercisesContent}
        >
          {exercises.map(exercise => (
            <View key={exercise.id} style={styles.exerciseContainer}>
              <ExerciseCard
                exercise={exercise}
                userLevel={userLevel}
                onPress={() => {
                  // TODO: Afficher les détails de l'exercice
                  console.log("Détails de l'exercice:", exercise.name);
                }}
                onPreferenceChange={preference =>
                  handleExercisePreferenceChange(exercise.id, preference)
                }
              />
              <View style={styles.exerciseDetails}>
                <Text style={styles.repsText}>
                  {getRepsForLevel(exercise)}{' '}
                  {getRepsForLevel(exercise) === exercise.repDebutant ||
                  getRepsForLevel(exercise) === exercise.repIntermediaire ||
                  getRepsForLevel(exercise) === exercise.repAvance
                    ? 'reps'
                    : 'secondes'}
                </Text>
                <Text style={styles.restText}>Repos: 60s</Text>
              </View>
            </View>
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
  levelSelector: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  levelButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  levelButton: {
    flex: 1,
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
  exerciseContainer: {
    marginBottom: 8,
  },
  exerciseDetails: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#E0E0E0',
  },
  repsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
    marginBottom: 2,
  },
  restText: {
    fontSize: 12,
    color: '#999',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});
