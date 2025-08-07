import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { Button } from './button';
import { COLORS } from '../constantes/color.constante';

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
  const [selectedAlert, setSelectedAlert] = useState<TrainingAlert | null>(
    null,
  );
  const [alertForm, setAlertForm] = useState({
    time: '',
    label: '',
    color: '#FF6B35',
    type: 'running' as 'running' | 'mobility' | 'strengthening',
  });
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [hourScrollView, setHourScrollView] = useState<ScrollView | null>(null);
  const [minuteScrollView, setMinuteScrollView] = useState<ScrollView | null>(
    null,
  );

  const days = [
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
    'dimanche',
  ];

  const trainingTypes = [
    { key: 'running', label: 'Course', emoji: '🏃‍♂️', color: '#FF6B35' },
    { key: 'mobility', label: 'Mobilité', emoji: '🧘‍♀️', color: '#4CAF50' },
    {
      key: 'strengthening',
      label: 'Renforcement',
      emoji: '💪',
      color: '#F44336',
    },
  ];

  const timeToPosition = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    return (totalMinutes / (24 * 60)) * 100;
  };

  const handleBarClick = (day: string) => {
    setSelectedDay(day);
    setSelectedAlert(null);
    setSelectedHour(12);
    setSelectedMinute(0);
    setAlertForm({
      time: '',
      label: '',
      color: '#FF6B35',
      type: 'running',
    });
  };

  const handleAlertClick = (alert: TrainingAlert) => {
    setSelectedAlert(alert);
    setSelectedDay(alert.day);

    // Parser l'heure existante pour définir les pickers
    const [hours, minutes] = alert.time.split(':').map(Number);
    setSelectedHour(hours);
    setSelectedMinute(minutes);

    setAlertForm({
      time: alert.time,
      label: alert.label,
      color: alert.color,
      type: alert.type,
    });
  };

  const handleSave = () => {
    if (!selectedDay) return;

    const timeString = `${selectedHour
      .toString()
      .padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;

    const newAlert: TrainingAlert = {
      id: selectedAlert?.id || Date.now().toString(),
      day: selectedDay,
      time: timeString,
      label: alertForm.label,
      color: alertForm.color,
      type: alertForm.type,
    };

    if (selectedAlert) {
      // Modifier un entraînement existant
      const updatedAlerts = alerts.map(alert =>
        alert.id === selectedAlert.id ? newAlert : alert,
      );
      onAlertsChange(updatedAlerts);
    } else {
      // Ajouter un nouvel entraînement
      onAlertsChange([...alerts, newAlert]);
    }

    // Reset du formulaire
    setSelectedDay(null);
    setSelectedAlert(null);
    setAlertForm({
      time: '',
      label: '',
      color: '#FF6B35',
      type: 'running',
    });
  };

  const handleDeleteAlert = () => {
    if (selectedAlert) {
      onAlertsChange(alerts.filter(alert => alert.id !== selectedAlert.id));
      setSelectedDay(null);
      setSelectedAlert(null);
      setAlertForm({
        time: '',
        label: '',
        color: '#FF6B35',
        type: 'running',
      });
    }
  };

  const getDayAlerts = (day: string) => {
    return alerts.filter(alert => alert.day === day);
  };

  const handleHourScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const itemHeight = 40; // Hauteur exacte d'un item
    const newHour = Math.round(y / itemHeight);
    if (newHour >= 0 && newHour < 24 && newHour !== selectedHour) {
      setSelectedHour(newHour);
    }
  };

  const handleMinuteScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const itemHeight = 40; // Hauteur exacte d'un item
    const newMinute = Math.round(y / itemHeight);
    if (newMinute >= 0 && newMinute < 60 && newMinute !== selectedMinute) {
      setSelectedMinute(newMinute);
    }
  };

  const snapToHour = (hour: number) => {
    if (hourScrollView) {
      hourScrollView.scrollTo({ y: hour * 40, animated: true });
    }
  };

  const snapToMinute = (minute: number) => {
    if (minuteScrollView) {
      minuteScrollView.scrollTo({ y: minute * 40, animated: true });
    }
  };

  // Centrer automatiquement les valeurs quand le modal s'ouvre
  useEffect(() => {
    if (selectedDay !== null) {
      // Petit délai pour laisser le modal se rendre
      setTimeout(() => {
        snapToHour(selectedHour);
        snapToMinute(selectedMinute);
      }, 100);
    }
  }, [selectedDay]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.weeklyBarsContainer}>
          <View style={styles.weeklyBars}>
            {days.map(day => {
              const dayAlerts = getDayAlerts(day);
              return (
                <TouchableOpacity
                  key={day}
                  style={styles.dayBarContainer}
                  onPress={() => handleBarClick(day)}
                  activeOpacity={0.7}
                >
                  <View style={styles.dayBar}>
                    {dayAlerts.map(alert => (
                      <TouchableOpacity
                        key={alert.id}
                        style={[
                          styles.alertDot,
                          {
                            backgroundColor: alert.color,
                            top: `${timeToPosition(alert.time)}%`,
                          },
                        ]}
                        onPress={() => handleAlertClick(alert)}
                      />
                    ))}
                  </View>
                  <Text style={styles.dayName}>{day.slice(0, 3)}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.timeMarkers}>
            <Text style={styles.timeMarker}>24h</Text>
            <Text style={styles.timeMarker}>18h</Text>
            <Text style={styles.timeMarker}>12h</Text>
            <Text style={styles.timeMarker}>6h</Text>
            <Text style={styles.timeMarker}>0h</Text>
          </View>
        </View>
      </View>

      <Modal
        visible={selectedDay !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setSelectedDay(null);
          setSelectedAlert(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedAlert
                ? "Modifier l'entraînement"
                : 'Planifier un entraînement'}{' '}
              {selectedDay}
            </Text>

            <View style={styles.formGroup}>
              <View style={styles.typeButtons}>
                {trainingTypes.map(type => (
                  <TouchableOpacity
                    key={type.key}
                    style={[
                      styles.typeButton,
                      { borderColor: type.color },
                      alertForm.type === type.key && styles.typeButtonSelected,
                    ]}
                    onPress={() =>
                      setAlertForm({
                        ...alertForm,
                        type: type.key as any,
                        color: type.color,
                      })
                    }
                  >
                    <Text style={styles.typeEmoji}>{type.emoji}</Text>
                    <Text
                      style={[
                        styles.typeLabel,
                        alertForm.type === type.key && styles.typeLabelSelected,
                      ]}
                    >
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Heure</Text>
              <View style={styles.timePickerContainer}>
                <View style={styles.pickerColumn}>
                  <ScrollView
                    style={styles.picker}
                    contentContainerStyle={styles.pickerContent}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleHourScroll}
                    onMomentumScrollEnd={() => snapToHour(selectedHour)}
                    scrollEventThrottle={16}
                    ref={setHourScrollView}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.pickerItem,
                          selectedHour === i && styles.pickerItemSelected,
                        ]}
                        onPress={() => setSelectedHour(i)}
                      >
                        <Text
                          style={[
                            styles.pickerItemText,
                            selectedHour === i && styles.pickerItemTextSelected,
                          ]}
                        >
                          {i.toString().padStart(2, '0')}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <Text style={styles.timeSeparator}>:</Text>

                <View style={styles.pickerColumn}>
                  <ScrollView
                    style={styles.picker}
                    contentContainerStyle={styles.pickerContent}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleMinuteScroll}
                    onMomentumScrollEnd={() => snapToMinute(selectedMinute)}
                    scrollEventThrottle={16}
                    ref={setMinuteScrollView}
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.pickerItem,
                          selectedMinute === i && styles.pickerItemSelected,
                        ]}
                        onPress={() => setSelectedMinute(i)}
                      >
                        <Text
                          style={[
                            styles.pickerItemText,
                            selectedMinute === i &&
                              styles.pickerItemTextSelected,
                          ]}
                        >
                          {i.toString().padStart(2, '0')}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Nom (facultatif)</Text>
              <TextInput
                style={styles.input}
                value={alertForm.label}
                onChangeText={text =>
                  setAlertForm({ ...alertForm, label: text })
                }
                placeholder="ex: Bouge toi, gros sac !"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.modalButtons}>
              {selectedAlert && (
                <Button
                  title="Supprimer"
                  onPress={handleDeleteAlert}
                  variant="secondary"
                  style={styles.modalButton}
                />
              )}
              <Button
                title="Annuler"
                onPress={() => {
                  setSelectedDay(null);
                  setSelectedAlert(null);
                }}
                variant="secondary"
                style={styles.modalButton}
              />
              <Button
                title={selectedAlert ? 'Modifier' : 'Planifier'}
                onPress={handleSave}
                disabled={!alertForm.time}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Text style={styles.subtitle}>
        Clique sur une journée pour planifier un entraînement.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.noir,
    alignSelf: 'center',
    marginTop: 10,
  },
  card: {
    backgroundColor: COLORS.blanc,
    borderRadius: 12,
    padding: 8,
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
  },
  dayColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  dayBarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dayBar: {
    width: 5,
    backgroundColor: COLORS.gris,
    flex: 1,
    position: 'relative',
  },
  alertDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.blanc,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.background,
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
    borderColor: COLORS.gris,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: COLORS.blanc,
  },

  typeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: COLORS.blanc,
  },
  typeButtonSelected: {
    backgroundColor: COLORS.orange,
  },
  typeEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.noir,
  },
  typeLabelSelected: {
    color: COLORS.blanc,
    fontWeight: '600',
  },

  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.gris,
    borderRadius: 8,
    backgroundColor: COLORS.blanc,
  },
  pickerColumn: {
    alignItems: 'center',
  },
  picker: {
    height: 40, // Hauteur d'un seul item
    width: 80,
  },
  pickerContent: {
    paddingVertical: 0, // Pas de padding pour centrer
  },
  pickerItem: {
    height: 40, // Hauteur fixe pour un seul item visible
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  pickerItemSelected: {
    backgroundColor: COLORS.orange,
  },
  pickerItemText: {
    fontSize: 16,
    color: COLORS.noir,
  },
  pickerItemTextSelected: {
    color: COLORS.blanc,
    fontWeight: '600',
  },
  timeSeparator: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.noir,
    marginHorizontal: 12,
  },
});
