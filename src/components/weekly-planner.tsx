import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import { Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from './button';
import { useNotifications } from '../hooks/useNotifications';

interface TrainingAlert {
  id: string;
  day: string;
  time: string;
  label: string;
  color: string;
  type: 'running' | 'mobility' | 'strengthening';
}

interface WeeklyPlannerProps {
  alerts: TrainingAlert[];
  onAlertsChange: (alerts: TrainingAlert[]) => void;
}

export const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({
  alerts,
  onAlertsChange,
}) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [alertForm, setAlertForm] = useState({
    time: '',
    label: '',
    color: '#3b82f6',
    type: 'running' as 'running' | 'mobility' | 'strengthening',
  });

  const { scheduleTrainingNotification, cancelTrainingNotification } =
    useNotifications();

  const days = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ];

  const colors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // orange
    '#ef4444', // red
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
  ];

  const trainingTypes = [
    { key: 'running', label: 'Course', emoji: '🏃‍♂️', color: '#3b82f6' },
    { key: 'mobility', label: 'Mobilité', emoji: '🧘‍♀️', color: '#10b981' },
    {
      key: 'strengthening',
      label: 'Renforcement',
      emoji: '💪',
      color: '#f59e0b',
    },
  ];

  const timeToPosition = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    // Convert to percentage (0% = midnight, 100% = 11:59 PM)
    return (totalMinutes / (24 * 60)) * 100;
  };

  const handleBarClick = (day: string) => {
    setSelectedDay(day);
    setAlertForm({
      time: '',
      label: '',
      color: '#3b82f6',
      type: 'running',
    });
  };

  const getNextWeekDate = (dayName: string, timeString: string): Date => {
    const dayIndex = days.indexOf(dayName);
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Dimanche, 1 = Lundi, etc.

    // Convertir l'index de jour (Lundi = 0) vers l'index JavaScript (Lundi = 1)
    const targetDay = dayIndex === 0 ? 1 : dayIndex + 1;

    // Calculer le prochain jour de la semaine
    const daysUntilTarget = (targetDay - currentDay + 7) % 7;
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysUntilTarget);

    // Définir l'heure
    const [hours, minutes] = timeString.split(':').map(Number);
    nextDate.setHours(hours, minutes, 0, 0);

    return nextDate;
  };

  const handleSaveAlert = () => {
    if (selectedDay && alertForm.time && alertForm.label) {
      const newAlert: TrainingAlert = {
        id: Date.now().toString(),
        day: selectedDay,
        time: alertForm.time,
        label: alertForm.label,
        color: alertForm.color,
        type: alertForm.type,
      };

      // Planifier les notifications
      const trainingDate = getNextWeekDate(selectedDay, alertForm.time);
      const typeInfo = trainingTypes.find(t => t.key === alertForm.type);

      scheduleTrainingNotification({
        id: newAlert.id,
        title: `${typeInfo?.emoji} ${alertForm.label}`,
        message: `C'est l'heure de votre ${typeInfo?.label.toLowerCase()} !`,
        date: trainingDate,
        trainingType: alertForm.type,
      });

      onAlertsChange([...alerts, newAlert]);
      setSelectedDay(null);
      setAlertForm({
        time: '',
        label: '',
        color: '#3b82f6',
        type: 'running',
      });
    }
  };

  const removeAlert = (alertId: string) => {
    // Annuler les notifications associées
    cancelTrainingNotification(alertId);

    // Supprimer l'alerte
    onAlertsChange(alerts.filter(alert => alert.id !== alertId));
  };

  const getDayAlerts = (day: string) => {
    return alerts.filter(alert => alert.day === day);
  };

  const getTrainingTypeInfo = (type: string) => {
    return trainingTypes.find(t => t.key === type) || trainingTypes[0];
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Planificateur Hebdomadaire 📅</Text>
        <Text style={styles.subtitle}>
          Planifiez vos entraînements de la semaine
        </Text>
      </View>

      {/* Weekly Bars */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Cette semaine</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.weeklyBarsContainer}>
            <View style={styles.weeklyBars}>
              {days.map((day, index) => {
                const dayAlerts = getDayAlerts(day);
                return (
                  <View key={day} style={styles.dayColumn}>
                    {/* Day Bar */}
                    <TouchableOpacity
                      style={styles.dayBarContainer}
                      onPress={() => handleBarClick(day)}
                      activeOpacity={0.7}
                    >
                      <LinearGradient
                        colors={['#000000', '#FFFFFF', '#FFFFFF', '#000000']}
                        locations={[0, 0.25, 0.75, 1]}
                        style={styles.dayBar}
                      >
                        {/* Alert Dots */}
                        {dayAlerts.map(alert => (
                          <View
                            key={alert.id}
                            style={[
                              styles.alertDot,
                              {
                                backgroundColor: alert.color,
                                top: `${timeToPosition(alert.time)}%`,
                              },
                            ]}
                          />
                        ))}
                      </LinearGradient>
                    </TouchableOpacity>

                    {/* Day Name */}
                    <Text style={styles.dayName}>{day.slice(0, 3)}</Text>
                  </View>
                );
              })}
            </View>

            {/* Time Markers */}
            <View style={styles.timeMarkers}>
              <Text style={styles.timeMarker}>24h</Text>
              <Text style={styles.timeMarker}>18h</Text>
              <Text style={styles.timeMarker}>12h</Text>
              <Text style={styles.timeMarker}>6h</Text>
              <Text style={styles.timeMarker}>0h</Text>
            </View>
          </View>
        </View>
      </View>

      {/* All Alerts */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Tous les entraînements</Text>
        </View>
        <View style={styles.cardContent}>
          {alerts.length === 0 ? (
            <Text style={styles.emptyText}>
              Aucun entraînement planifié. Cliquez sur un jour pour en ajouter
              un !
            </Text>
          ) : (
            <ScrollView style={styles.alertsList}>
              {alerts.map(alert => {
                const typeInfo = getTrainingTypeInfo(alert.type);
                return (
                  <View key={alert.id} style={styles.alertItem}>
                    <View style={styles.alertInfo}>
                      <View
                        style={[
                          styles.alertDot,
                          { backgroundColor: alert.color },
                        ]}
                      />
                      <View style={styles.alertDetails}>
                        <Text style={styles.alertLabel}>{alert.label}</Text>
                        <Text style={styles.alertTime}>
                          {alert.day} à {alert.time}
                        </Text>
                        <Text style={styles.alertType}>
                          {typeInfo.emoji} {typeInfo.label}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeAlert(alert.id)}
                    >
                      <Text style={styles.removeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>

      {/* Alert Dialog */}
      <Modal
        visible={selectedDay !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedDay(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Planifier un entraînement pour {selectedDay}
            </Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Heure</Text>
              <TextInput
                style={styles.input}
                value={alertForm.time}
                onChangeText={text =>
                  setAlertForm({ ...alertForm, time: text })
                }
                placeholder="07:00"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Label</Text>
              <TextInput
                style={styles.input}
                value={alertForm.label}
                onChangeText={text =>
                  setAlertForm({ ...alertForm, label: text })
                }
                placeholder="ex: Course matinale, Séance mobilité"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Type d'entraînement</Text>
              <View style={styles.typeButtons}>
                {trainingTypes.map(type => (
                  <TouchableOpacity
                    key={type.key}
                    style={[
                      styles.typeButton,
                      alertForm.type === type.key && styles.typeButtonActive,
                    ]}
                    onPress={() =>
                      setAlertForm({ ...alertForm, type: type.key as any })
                    }
                  >
                    <Text style={styles.typeEmoji}>{type.emoji}</Text>
                    <Text
                      style={[
                        styles.typeLabel,
                        alertForm.type === type.key && styles.typeLabelActive,
                      ]}
                    >
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Couleur</Text>
              <View style={styles.colorButtons}>
                {colors.map(color => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorButton,
                      alertForm.color === color && styles.colorButtonActive,
                      { backgroundColor: color },
                    ]}
                    onPress={() => setAlertForm({ ...alertForm, color })}
                  />
                ))}
              </View>
            </View>

            <View style={styles.modalButtons}>
              <Button
                title="Annuler"
                onPress={() => setSelectedDay(null)}
                variant="secondary"
                style={styles.modalButton}
              />
              <Button
                title="Sauvegarder"
                onPress={handleSaveAlert}
                disabled={!alertForm.time || !alertForm.label}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardContent: {
    padding: 16,
  },
  weeklyBarsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  weeklyBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    height: 200,
    marginRight: 20,
  },
  dayColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  dayBarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dayBar: {
    width: 2,
    borderRadius: 1,
    flex: 1,
    position: 'relative',
  },
  alertDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    left: '50%',
    marginLeft: -4,
    marginTop: -4,
    zIndex: 2,
  },
  dayName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
  },
  timeMarkers: {
    width: 30,
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  timeMarker: {
    fontSize: 10,
    color: '#999',
    fontWeight: '500',
  },
  alertsList: {
    maxHeight: 200,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 8,
  },
  alertInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertDetails: {
    marginLeft: 12,
    flex: 1,
  },
  alertLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  alertTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  alertType: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    paddingVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  typeButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  typeEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  typeLabelActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  colorButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorButtonActive: {
    borderColor: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
  },
});
