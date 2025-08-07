import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { Button, Timer } from '../components';
import { MobilityExercise, StrengtheningExercise } from '../types';

interface SessionScreenProps {
  navigation: any;
  route: any;
}

export const SessionScreen: React.FC<SessionScreenProps> = ({
  navigation,
  route,
}) => {
  const { type, exercises, userLevel } = route.params;
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [exerciseTime, setExerciseTime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [isResting, setIsResting] = useState(false);
  const [isExerciseActive, setIsExerciseActive] = useState(true);

  const sessionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const exerciseIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const restIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentExercise = exercises[currentExerciseIndex];
  const nextExerciseItem = exercises[currentExerciseIndex + 1];

  const isMobilityExercise = (ex: any): ex is MobilityExercise => {
    return 'duration' in ex;
  };

  useEffect(() => {
    if (isSessionActive) {
      startSessionTimer();
      if (type === 'mobility') {
        startExerciseTimer();
      }
    }

    return () => {
      if (sessionIntervalRef.current) {
        clearInterval(sessionIntervalRef.current);
      }
      if (exerciseIntervalRef.current) {
        clearInterval(exerciseIntervalRef.current);
      }
      if (restIntervalRef.current) {
        clearInterval(restIntervalRef.current);
      }
    };
  }, [isSessionActive]);

  const startSessionTimer = () => {
    sessionIntervalRef.current = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
  };

  const startExerciseTimer = () => {
    if (type === 'mobility') {
      // Pour la mobilité, utiliser une durée fixe de 60 secondes
      const exerciseDuration = 60;
      setExerciseTime(exerciseDuration);

      exerciseIntervalRef.current = setInterval(() => {
        setExerciseTime(prev => {
          if (prev <= 1) {
            clearInterval(exerciseIntervalRef.current!);
            nextExercise();
            return exerciseDuration;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const startRestTimer = () => {
    if (type === 'strengthening') {
      // Pour le renforcement, utiliser un temps de repos fixe de 60 secondes
      const restDuration = 60;
      setRestTime(restDuration);
      setIsResting(true);
      setIsExerciseActive(false);

      restIntervalRef.current = setInterval(() => {
        setRestTime(prev => {
          if (prev <= 1) {
            clearInterval(restIntervalRef.current!);
            setIsResting(false);
            setIsExerciseActive(true);
            return restDuration;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      if (type === 'mobility') {
        startExerciseTimer();
      }
    } else {
      // Session terminée
      stopSession();
    }
  };

  const stopSession = () => {
    setIsSessionActive(false);
    if (sessionIntervalRef.current) {
      clearInterval(sessionIntervalRef.current);
    }
    if (exerciseIntervalRef.current) {
      clearInterval(exerciseIntervalRef.current);
    }
    if (restIntervalRef.current) {
      clearInterval(restIntervalRef.current);
    }

    Alert.alert(
      'Session terminée',
      'Félicitations ! Vous avez terminé votre séance.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ],
    );
  };

  const validateExercise = () => {
    if (type === 'strengthening') {
      startRestTimer();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const getExerciseInfo = (
    exercise: MobilityExercise | StrengtheningExercise,
  ) => {
    if (isMobilityExercise(exercise)) {
      return {
        duration: 60, // Durée fixe pour la mobilité
        reps: null,
      };
    } else {
      const reps =
        userLevel === 'débutant'
          ? exercise.repDebutant
          : userLevel === 'intermédiaire'
          ? exercise.repIntermediaire
          : exercise.repAvance;
      return {
        duration: null,
        reps,
      };
    }
  };

  if (!currentExercise) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aucun exercice trouvé</Text>
      </View>
    );
  }

  const exerciseInfo = getExerciseInfo(currentExercise);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Séance de {type === 'mobility' ? 'Mobilité' : 'Renforcement'}
        </Text>
        <Text style={styles.subtitle}>
          Exercice {currentExerciseIndex + 1} sur {exercises.length}
        </Text>
      </View>

      <View style={styles.timersContainer}>
        <View style={styles.timerRow}>
          <Timer seconds={sessionTime} label="Temps total" size="large" />
          {type === 'mobility' && (
            <Timer
              seconds={exerciseTime}
              label="Temps exercice"
              size="medium"
            />
          )}
          {type === 'strengthening' && isResting && (
            <Timer seconds={restTime} label="Temps repos" size="medium" />
          )}
        </View>
      </View>

      <View style={styles.exerciseContainer}>
        <View style={styles.exerciseImage}>
          <Text style={styles.imagePlaceholder}>📸</Text>
          <Text style={styles.imageText}>Image de l'exercice</Text>
        </View>

        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{currentExercise.name}</Text>
          <Text style={styles.exerciseDescription}>
            {currentExercise.description}
          </Text>

          {type === 'strengthening' && exerciseInfo.reps && (
            <View style={styles.repsContainer}>
              <Text style={styles.repsLabel}>Répétitions :</Text>
              <Text style={styles.repsValue}>{exerciseInfo.reps}</Text>
            </View>
          )}

          {type === 'mobility' && exerciseInfo.duration && (
            <View style={styles.durationContainer}>
              <Text style={styles.durationLabel}>Durée :</Text>
              <Text style={styles.durationValue}>
                {formatTime(exerciseInfo.duration)}
              </Text>
            </View>
          )}
        </View>
      </View>

      {nextExerciseItem && (
        <View style={styles.nextExerciseContainer}>
          <Text style={styles.nextExerciseTitle}>Prochain exercice :</Text>
          <Text style={styles.nextExerciseName}>{nextExerciseItem.name}</Text>
        </View>
      )}

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Conseils</Text>
        <Text style={styles.tipsText}>
          • Respirez profondément{'\n'}• Maintenez une bonne posture{'\n'}•
          Écoutez votre corps
        </Text>
      </View>

      <View style={styles.actions}>
        {type === 'strengthening' && isExerciseActive && (
          <Button
            title="Valider l'exercice"
            onPress={validateExercise}
            style={styles.actionButton}
          />
        )}
        <Button
          title="Arrêter la séance"
          onPress={stopSession}
          variant="secondary"
          style={styles.actionButton}
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
  exerciseContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  exerciseImage: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePlaceholder: {
    fontSize: 48,
    marginBottom: 8,
  },
  imageText: {
    fontSize: 14,
    color: '#666',
  },
  exerciseInfo: {
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  repsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  repsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  repsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  durationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  durationValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  nextExerciseContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  nextExerciseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  nextExerciseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  tipsContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actions: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});
