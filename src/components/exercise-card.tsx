import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  MobilityExercise,
  StrengtheningExercise,
  MobilityExerciseWithPreference,
  StrengtheningExerciseWithPreference,
} from '../types';
import { COLORS } from '../constantes/color.constante';

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
}) => {
  const [currentPreference, setCurrentPreference] = useState<
    'green' | 'red' | 'white'
  >('white');

  const getPreferenceColor = (preference: string) => {
    switch (preference) {
      case 'green':
        return COLORS.vert;
      case 'red':
        return COLORS.rouge;
      default:
        return COLORS.background;
    }
  };

  const handlePreferenceClick = () => {
    const preferences: ('green' | 'red' | 'white')[] = [
      'white',
      'green',
      'red',
    ];
    const currentIndex = preferences.indexOf(currentPreference);
    const nextPreference = preferences[(currentIndex + 1) % preferences.length];

    setCurrentPreference(nextPreference);
    onPreferenceChange(nextPreference);
  };

  const isMobilityExercise = (ex: Exercise): ex is MobilityExercise => {
    return 'image' in ex;
  };

  const isStrengtheningExercise = (
    ex: Exercise,
  ): ex is StrengtheningExercise => {
    return 'image1' in ex && 'image2' in ex;
  };

  const getExerciseImage = () => {
    if (isMobilityExercise(exercise)) {
      return exercise.image && !exercise.image.includes('example.com')
        ? exercise.image
        : '';
    } else if (isStrengtheningExercise(exercise)) {
      return exercise.image1;
    }
    return '';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <TouchableOpacity
        style={[
          styles.preferenceCircle,
          { backgroundColor: getPreferenceColor(currentPreference) },
        ]}
        onPress={handlePreferenceClick}
      />

      {/* Informations de l'exercice */}
      <View style={styles.content}>
        <Text style={styles.title}>{exercise.name}</Text>
      </View>

      {getExerciseImage() ? (
        <Image source={{ uri: getExerciseImage() }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.placeholderThumbnail]} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  preferenceCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.gris_fonce,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
  },
  thumbnail: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  placeholderThumbnail: {
    backgroundColor: COLORS.rouge,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
