import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserPreferences } from '../types';

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    weeklyPlan: {},
    exercisePreferences: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const stored = await AsyncStorage.getItem('userPreferences');
      if (stored) {
        const parsedPreferences: UserPreferences = JSON.parse(stored);
        setPreferences(parsedPreferences);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des préférences:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async (newPreferences: UserPreferences) => {
    try {
      await AsyncStorage.setItem(
        'userPreferences',
        JSON.stringify(newPreferences),
      );
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences:', error);
    }
  };

  const updateWeeklyPlan = async (
    weeklyPlan: UserPreferences['weeklyPlan'],
  ) => {
    const newPreferences = { ...preferences, weeklyPlan };
    await savePreferences(newPreferences);
  };

  const updateExercisePreference = async (
    exerciseId: string,
    preference: 'green' | 'red' | 'white',
  ) => {
    const newPreferences = {
      ...preferences,
      exercisePreferences: {
        ...preferences.exercisePreferences,
        [exerciseId]: preference,
      },
    };
    await savePreferences(newPreferences);
  };

  const clearPreferences = async () => {
    try {
      await AsyncStorage.removeItem('userPreferences');
      setPreferences({
        weeklyPlan: {},
        exercisePreferences: {},
      });
    } catch (error) {
      console.error('Erreur lors de la suppression des préférences:', error);
    }
  };

  return {
    preferences,
    loading,
    updateWeeklyPlan,
    updateExercisePreference,
    clearPreferences,
  };
};
