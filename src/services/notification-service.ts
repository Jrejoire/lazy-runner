import PushNotification from 'react-native-push-notification';
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
    this.configurePushNotifications();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private configurePushNotifications() {
    // Configuration des notifications
    PushNotification.configure({
      // (optionnel) Appelé quand Token est généré (iOS et Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (requis) Appelé quand une notification est reçue ou ouverte
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },

      // (optionnel) Appelé quand l'action est pressée
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      // (optionnel) Appelé quand l'utilisateur appuie sur la notification
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // Permissions (requis pour iOS)
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Pop initial notification
      popInitialNotification: true,

      // (optionnel) Par défaut: true
      requestPermissions: Platform.OS === 'ios',
    });

    // Configuration des canaux pour Android
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'training-reminders',
          channelName: 'Rappels d\'entraînement',
          channelDescription: 'Notifications pour les rappels d\'entraînements',
          playSound: true,
          soundName: 'default',
          importance: 4, // IMPORTANCE_HIGH
          vibrate: true,
        },
        (created) => console.log(`Canal créé: ${created}`),
      );

      PushNotification.createChannel(
        {
          channelId: 'training-start',
          channelName: 'Début d\'entraînement',
          channelDescription: 'Notifications pour le début des entraînements',
          playSound: true,
          soundName: 'default',
          importance: 4, // IMPORTANCE_HIGH
          vibrate: true,
        },
        (created) => console.log(`Canal créé: ${created}`),
      );
    }
  }

  // Demander les permissions
  async requestPermissions(): Promise<boolean> {
    return new Promise((resolve) => {
      PushNotification.requestPermissions().then((permissions) => {
        console.log('Permissions:', permissions);
        resolve(permissions.alert || false);
      });
    });
  }

  // Planifier une notification de rappel (30 min avant)
  scheduleTrainingReminder(data: {
    id: string;
    title: string;
    message: string;
    date: Date;
    trainingType: 'running' | 'mobility' | 'strengthening';
  }): void {
    const reminderDate = new Date(data.date.getTime() - 30 * 60 * 1000); // 30 min avant

    PushNotification.localNotificationSchedule({
      id: `reminder_${data.id}`,
      channelId: 'training-reminders',
      title: data.title,
      message: data.message,
      date: reminderDate,
      allowWhileIdle: true,
      repeatType: 'day',
      number: 1,
      userInfo: {
        type: 'reminder',
        trainingType: data.trainingType,
        originalDate: data.date.toISOString(),
      },
    });

    console.log(`Rappel planifié pour ${reminderDate.toLocaleString()}`);
  }

  // Planifier une notification de début d'entraînement
  scheduleTrainingStart(data: {
    id: string;
    title: string;
    message: string;
    date: Date;
    trainingType: 'running' | 'mobility' | 'strengthening';
  }): void {
    PushNotification.localNotificationSchedule({
      id: `start_${data.id}`,
      channelId: 'training-start',
      title: data.title,
      message: data.message,
      date: data.date,
      allowWhileIdle: true,
      repeatType: 'day',
      number: 1,
      userInfo: {
        type: 'start',
        trainingType: data.trainingType,
        originalDate: data.date.toISOString(),
      },
    });

    console.log(`Début d'entraînement planifié pour ${data.date.toLocaleString()}`);
  }

  // Planifier les notifications pour un entraînement
  scheduleTrainingNotifications(data: {
    id: string;
    title: string;
    message: string;
    date: Date;
    trainingType: 'running' | 'mobility' | 'strengthening';
  }): void {
    // Notification de rappel (30 min avant)
    this.scheduleTrainingReminder(data);
    
    // Notification de début d'entraînement
    this.scheduleTrainingStart(data);
  }

  // Annuler une notification
  cancelNotification(notificationId: string): void {
    PushNotification.cancelLocalNotification(notificationId);
  }

  // Annuler toutes les notifications
  cancelAllNotifications(): void {
    PushNotification.cancelAllLocalNotifications();
  }

  // Obtenir les notifications planifiées
  getScheduledNotifications(): Promise<any[]> {
    return new Promise((resolve) => {
      PushNotification.getScheduledLocalNotifications((notifications) => {
        resolve(notifications || []);
      });
    });
  }

  // Notification immédiate (pour les tests)
  showImmediateNotification(title: string, message: string): void {
    PushNotification.localNotification({
      channelId: 'training-reminders',
      title,
      message,
      playSound: true,
      soundName: 'default',
      importance: 'high',
      vibrate: true,
    });
  }

  // Notification de test
  testNotification(): void {
    this.showImmediateNotification(
      'Test LazyRunner',
      'Les notifications fonctionnent parfaitement ! 🏃‍♂️'
    );
  }
}

export default NotificationService;
