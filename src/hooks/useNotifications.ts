import { useState, useEffect } from 'react';
import NotificationService from '../services/notification-service';

export const useNotifications = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    initializeNotifications();
  }, []);

  const initializeNotifications = async () => {
    try {
      setIsLoading(true);
      const permission =
        await NotificationService.getInstance().requestPermissions();
      setHasPermission(permission);
    } catch (error) {
      console.error(
        "Erreur lors de l'initialisation des notifications:",
        error,
      );
      setHasPermission(false);
    } finally {
      setIsLoading(false);
    }
  };

  const scheduleTrainingNotification = async (data: {
    id: string;
    title: string;
    message: string;
    date: Date;
    trainingType: 'running' | 'mobility' | 'strengthening';
  }) => {
    try {
      await NotificationService.getInstance().scheduleTrainingNotifications(
        data,
      );
    } catch (error) {
      console.error(
        'Erreur lors de la programmation de la notification:',
        error,
      );
    }
  };

  const cancelTrainingNotification = async (notificationId: string) => {
    try {
      await NotificationService.getInstance().cancelNotification(
        notificationId,
      );
    } catch (error) {
      console.error("Erreur lors de l'annulation de la notification:", error);
    }
  };

  const cancelAllNotifications = async () => {
    try {
      await NotificationService.getInstance().cancelAllNotifications();
    } catch (error) {
      console.error(
        "Erreur lors de l'annulation de toutes les notifications:",
        error,
      );
    }
  };

  const getScheduledNotifications = async () => {
    try {
      return await NotificationService.getInstance().getScheduledNotifications();
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
      return [];
    }
  };

  const testNotification = async () => {
    try {
      await NotificationService.getInstance().testNotification();
    } catch (error) {
      console.error('Erreur lors du test de notification:', error);
    }
  };

  return {
    hasPermission,
    isLoading,
    scheduleTrainingNotification,
    cancelTrainingNotification,
    cancelAllNotifications,
    getScheduledNotifications,
    testNotification,
  };
};
