import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, WeeklyPlan } from '../types';

class UserService {
  private static instance: UserService;
  private currentUser: User | null = null;

  private constructor() {}

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  // Créer un nouvel utilisateur
  async createUser(name: string, level: 'débutant' | 'intermédiaire' | 'avancé' = 'débutant'): Promise<User> {
    const user: User = {
      id: `user_${Date.now()}`,
      name,
      level,
      exercisePreferences: {},
      weeklyPlan: {},
      createdAt: new Date(),
      lastActive: new Date(),
    };

    await this.saveUser(user);
    this.currentUser = user;
    return user;
  }

  // Charger l'utilisateur actuel
  async loadCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        const user = JSON.parse(userData);
        // Convertir les dates string en objets Date
        user.createdAt = new Date(user.createdAt);
        user.lastActive = new Date(user.lastActive);
        this.currentUser = user;
        return user;
      }
      return null;
    } catch (error) {
      console.error('Erreur lors du chargement de l\'utilisateur:', error);
      return null;
    }
  }

  // Sauvegarder l'utilisateur
  private async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'utilisateur:', error);
    }
  }

  // Mettre à jour les préférences d'exercice
  async updateExercisePreference(exerciseId: string, preference: 'green' | 'red' | 'white'): Promise<void> {
    if (!this.currentUser) {
      throw new Error('Aucun utilisateur connecté');
    }

    this.currentUser.exercisePreferences[exerciseId] = preference;
    this.currentUser.lastActive = new Date();
    await this.saveUser(this.currentUser);
  }

  // Mettre à jour le planning hebdomadaire
  async updateWeeklyPlan(weeklyPlan: WeeklyPlan): Promise<void> {
    if (!this.currentUser) {
      throw new Error('Aucun utilisateur connecté');
    }

    this.currentUser.weeklyPlan = weeklyPlan;
    this.currentUser.lastActive = new Date();
    await this.saveUser(this.currentUser);
  }

  // Mettre à jour le niveau de l'utilisateur
  async updateUserLevel(level: 'débutant' | 'intermédiaire' | 'avancé'): Promise<void> {
    if (!this.currentUser) {
      throw new Error('Aucun utilisateur connecté');
    }

    this.currentUser.level = level;
    this.currentUser.lastActive = new Date();
    await this.saveUser(this.currentUser);
  }

  // Obtenir l'utilisateur actuel
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Obtenir la préférence d'un exercice
  getExercisePreference(exerciseId: string): 'green' | 'red' | 'white' {
    if (!this.currentUser) {
      return 'white';
    }
    return this.currentUser.exercisePreferences[exerciseId] || 'white';
  }

  // Obtenir le niveau de l'utilisateur
  getUserLevel(): 'débutant' | 'intermédiaire' | 'avancé' {
    if (!this.currentUser) {
      return 'débutant';
    }
    return this.currentUser.level;
  }

  // Obtenir le planning hebdomadaire
  getWeeklyPlan(): WeeklyPlan {
    if (!this.currentUser) {
      return {};
    }
    return this.currentUser.weeklyPlan;
  }

  // Supprimer l'utilisateur actuel (déconnexion)
  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('currentUser');
      this.currentUser = null;
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  }

  // Migrer depuis l'ancien système de préférences
  async migrateFromOldPreferences(): Promise<void> {
    try {
      const oldPreferences = await AsyncStorage.getItem('userPreferences');
      if (oldPreferences && !this.currentUser) {
        const preferences = JSON.parse(oldPreferences);
        
        // Créer un nouvel utilisateur avec les anciennes préférences
        const user: User = {
          id: `user_${Date.now()}`,
          name: 'Runner',
          level: 'débutant',
          exercisePreferences: preferences.exercisePreferences || {},
          weeklyPlan: preferences.weeklyPlan || {},
          createdAt: new Date(),
          lastActive: new Date(),
        };

        await this.saveUser(user);
        this.currentUser = user;
        
        // Supprimer l'ancien fichier de préférences
        await AsyncStorage.removeItem('userPreferences');
      }
    } catch (error) {
      console.error('Erreur lors de la migration:', error);
    }
  }
}

export default UserService; 