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
      const notificationService = NotificationService.getInstance();
      const permission = await notificationService.requestPermissions();
      setHasPermission(permission);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation des notifications:', error);
      setHasPermission(false);
    } finally {
      setIsLoading(false);
    }
  };

  const scheduleTrainingNotification = (data: {
    id: string;
    title: string;
    message: string;
    date: Date;
    trainingType: 'running' | 'mobility' | 'strengthening';
  }) => {
    try {
      const notificationService = NotificationService.getInstance();
      notificationService.scheduleTrainingNotifications(data);
    } catch (error) {
      console.error('Erreur lors de la planification de la notification:', error);
    }
  };

  const cancelTrainingNotification = (notificationId: string) => {
    try {
      const notificationService = NotificationService.getInstance();
      notificationService.cancelNotification(`reminder_${notificationId}`);
      notificationService.cancelNotification(`start_${notificationId}`);
    } catch (error) {
      console.error('Erreur lors de l\'annulation de la notification:', error);
    }
  };

  const cancelAllNotifications = () => {
    try {
      const notificationService = NotificationService.getInstance();
      notificationService.cancelAllNotifications();
    } catch (error) {
      console.error('Erreur lors de l\'annulation de toutes les notifications:', error);
    }
  };

  const getScheduledNotifications = async () => {
    try {
      const notificationService = NotificationService.getInstance();
      return await notificationService.getScheduledNotifications();
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
      return [];
    }
  };

  const testNotification = () => {
    try {
      const notificationService = NotificationService.getInstance();
      notificationService.testNotification();
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
