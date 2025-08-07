import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MobilityExercise, StrengtheningExercise } from '../types';

type Exercise = MobilityExercise | StrengtheningExercise;

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
  onPreferenceChange: (preference: 'green' | 'red' | 'white') => void;
  userLevel?: 'débutant' | 'intermédiaire' | 'avancé';
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onPress,
  onPreferenceChange,
  userLevel = 'débutant',
}) => {
  const getPreferenceEmoji = (preference: string) => {
    switch (preference) {
      case 'green':
        return '🟢';
      case 'red':
        return '🔴';
      default:
        return '⚪️';
    }
  };

  const isMobilityExercise = (ex: Exercise): ex is MobilityExercise => {
    return 'duration' in ex;
  };

  const isStrengtheningExercise = (ex: Exercise): ex is StrengtheningExercise => {
    return 'image1' in ex && 'image2' in ex;
  };

  const getExerciseInfo = () => {
    if (isMobilityExercise(exercise)) {
      return `${exercise.duration}s`;
    } else if (isStrengtheningExercise(exercise)) {
      let reps = 0;
      switch (userLevel) {
        case 'débutant':
          reps = exercise.repDebutant;
          break;
        case 'intermédiaire':
          reps = exercise.repIntermediaire;
          break;
        case 'avancé':
          reps = exercise.repAvance;
          break;
      }
      return `${reps} ${reps === exercise.repDebutant || reps === exercise.repIntermediaire || reps === exercise.repAvance ? 'reps' : 'secondes'}`;
    }
    return '';
  };

  const getExerciseImage = () => {
    if (isMobilityExercise(exercise)) {
      return exercise.image;
    } else if (isStrengtheningExercise(exercise)) {
      return exercise.image1; // On utilise la première image par défaut
    }
    return '';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.preferenceButton}
          onPress={() => {
            const preferences = ['white', 'green', 'red'];
            const currentIndex = preferences.indexOf(exercise.userPreference);
            const nextPreference = preferences[
              (currentIndex + 1) % preferences.length
            ] as 'green' | 'red' | 'white';
            onPreferenceChange(nextPreference);
          }}
        >
          <Text style={styles.preferenceEmoji}>
            {getPreferenceEmoji(exercise.userPreference)}
          </Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{exercise.name}</Text>
          {isStrengtheningExercise(exercise) && (
            <Text style={styles.level}>Niveau: {userLevel}</Text>
          )}
        </View>
      </View>

      <Image source={{ uri: getExerciseImage() }} style={styles.image} />

      <Text style={styles.description}>{exercise.description}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.info}>{getExerciseInfo()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  preferenceButton: {
    marginRight: 12,
  },
  preferenceEmoji: {
    fontSize: 24,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  level: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  infoContainer: {
    alignItems: 'flex-end',
  },
  info: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
  },
});
