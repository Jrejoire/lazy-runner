import notifee, {
  AndroidImportance,
  AndroidColor,
  TriggerType,
  Trigger,
  EventType,
} from '@notifee/react-native';
import { Platform } from 'react-native';

interface NotificationData {
  id: string;
  title: string;
  message: string;
  date: Date;
  type: 'training' | 'reminder';
  trainingType?: 'running' | 'mobility' | 'strengthening';
}

class NotificationService {
  private static instance: NotificationService;

  private constructor() {
    this.configureNotifications();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async configureNotifications() {
    // Créer le canal pour Android
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'training',
        name: 'LazyRunner',
        description: 'Notifications pour les entraînements',
        importance: AndroidImportance.HIGH,
        color: AndroidColor.GREEN,
        sound: 'default',
        vibration: true,
      });
    }
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const authStatus = await notifee.requestPermission();
      return authStatus.authorizationStatus === 1; // 1 = AUTHORIZED
    } catch (error) {
      console.error('Erreur lors de la demande de permissions:', error);
      return false;
    }
  }

  async scheduleTrainingReminder(data: {
    id: string;
    title: string;
    message: string;
    date: Date;
    trainingType: 'running' | 'mobility' | 'strengthening';
  }): Promise<void> {
    try {
      // Programmer 30 minutes avant
      const reminderDate = new Date(data.date.getTime() - 30 * 60 * 1000);

      const trigger: Trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: reminderDate.getTime(),
      };

      await notifee.createTriggerNotification(
        {
          title: `⏰ Rappel: ${data.title}`,
          body: `Votre séance de ${data.trainingType} commence dans 30 minutes`,
          android: {
            channelId: 'training',
            importance: AndroidImportance.HIGH,
            color: AndroidColor.GREEN,
            pressAction: {
              id: 'default',
            },
          },
          ios: {
            sound: 'default',
          },
        },
        trigger,
      );
    } catch (error) {
      console.error('Erreur lors de la programmation du rappel:', error);
    }
  }

  async scheduleTrainingStart(data: {
    id: string;
    title: string;
    message: string;
    date: Date;
    trainingType: 'running' | 'mobility' | 'strengthening';
  }): Promise<void> {
    try {
      const trigger: Trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: data.date.getTime(),
      };

      await notifee.createTriggerNotification(
        {
          title: `🏃‍♂️ ${data.title}`,
          body: `C'est l'heure de votre séance de ${data.trainingType} !`,
          android: {
            channelId: 'training',
            importance: AndroidImportance.HIGH,
            color: AndroidColor.BLUE,
            pressAction: {
              id: 'default',
            },
          },
          ios: {
            sound: 'default',
          },
        },
        trigger,
      );
    } catch (error) {
      console.error(
        'Erreur lors de la programmation de la notification:',
        error,
      );
    }
  }

  async scheduleTrainingNotifications(data: {
    id: string;
    title: string;
    message: string;
    date: Date;
    trainingType: 'running' | 'mobility' | 'strengthening';
  }): Promise<void> {
    // Programmer le rappel (30 min avant)
    await this.scheduleTrainingReminder(data);

    // Programmer la notification de début
    await this.scheduleTrainingStart(data);
  }

  async cancelNotification(notificationId: string): Promise<void> {
    try {
      // Récupérer toutes les notifications programmées
      const scheduledNotifications = await notifee.getTriggerNotificationIds();

      // Annuler les notifications qui correspondent à l'ID
      for (const id of scheduledNotifications) {
        if (id.includes(notificationId)) {
          await notifee.cancelTriggerNotification(id);
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'annulation de la notification:", error);
    }
  }

  async cancelAllNotifications(): Promise<void> {
    try {
      await notifee.cancelAllNotifications();
    } catch (error) {
      console.error(
        "Erreur lors de l'annulation de toutes les notifications:",
        error,
      );
    }
  }

  async getScheduledNotifications(): Promise<any[]> {
    try {
      const notificationIds = await notifee.getTriggerNotificationIds();
      return notificationIds;
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
      return [];
    }
  }

  async showImmediateNotification(
    title: string,
    message: string,
  ): Promise<void> {
    try {
      await notifee.displayNotification({
        title,
        body: message,
        android: {
          channelId: 'training',
          importance: AndroidImportance.HIGH,
          color: AndroidColor.GREEN,
          pressAction: {
            id: 'default',
          },
        },
        ios: {
          sound: 'default',
        },
      });
    } catch (error) {
      console.error("Erreur lors de l'affichage de la notification:", error);
    }
  }

  async testNotification(): Promise<void> {
    await this.showImmediateNotification(
      'Test LazyRunner',
      'Cette notification de test confirme que les notifications fonctionnent !',
    );
  }
}

export default NotificationService;
