import { useState, useEffect } from 'react';
import UserService from '../services/user-service';
import { User, WeeklyPlan } from '../types';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      const userService = UserService.getInstance();
      
      // Migrer les anciennes préférences si nécessaire
      await userService.migrateFromOldPreferences();
      
      // Charger l'utilisateur actuel
      const currentUser = await userService.loadCurrentUser();
      
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Créer un nouvel utilisateur par défaut
        const newUser = await userService.createUser('Runner', 'débutant');
        setUser(newUser);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'utilisateur:', error);
      // Créer un utilisateur par défaut en cas d'erreur
      try {
        const userService = UserService.getInstance();
        const newUser = await userService.createUser('Runner', 'débutant');
        setUser(newUser);
      } catch (createError) {
        console.error('Erreur lors de la création de l\'utilisateur:', createError);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateExercisePreference = async (
    exerciseId: string,
    preference: 'green' | 'red' | 'white',
  ) => {
    try {
      const userService = UserService.getInstance();
      await userService.updateExercisePreference(exerciseId, preference);
      
      // Mettre à jour l'état local
      if (user) {
        setUser({
          ...user,
          exercisePreferences: {
            ...user.exercisePreferences,
            [exerciseId]: preference,
          },
          lastActive: new Date(),
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des préférences:', error);
    }
  };

  const updateWeeklyPlan = async (weeklyPlan: WeeklyPlan) => {
    try {
      const userService = UserService.getInstance();
      await userService.updateWeeklyPlan(weeklyPlan);
      
      // Mettre à jour l'état local
      if (user) {
        setUser({
          ...user,
          weeklyPlan,
          lastActive: new Date(),
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du planning:', error);
    }
  };

  const updateUserLevel = async (level: 'débutant' | 'intermédiaire' | 'avancé') => {
    try {
      const userService = UserService.getInstance();
      await userService.updateUserLevel(level);
      
      // Mettre à jour l'état local
      if (user) {
        setUser({
          ...user,
          level,
          lastActive: new Date(),
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du niveau:', error);
    }
  };

  const getExercisePreference = (exerciseId: string): 'green' | 'red' | 'white' => {
    const userService = UserService.getInstance();
    return userService.getExercisePreference(exerciseId);
  };

  const getWeeklyPlan = (): WeeklyPlan => {
    const userService = UserService.getInstance();
    return userService.getWeeklyPlan();
  };

  return {
    user,
    loading,
    updateExercisePreference,
    updateWeeklyPlan,
    updateUserLevel,
    getExercisePreference,
    getWeeklyPlan,
  };
}; 