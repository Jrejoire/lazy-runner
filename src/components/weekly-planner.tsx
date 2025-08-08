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
import {
  TRAINING_TYPES,
  TrainingTypeKey,
} from '../constantes/training-types.constante';
import { TimePicker } from './time-picker';
import Icon from 'react-native-vector-icons/Octicons';

interface TrainingAlert {
  id: string;
  day: string;
  time: string;
  label: string;
  color: string;
  type: TrainingTypeKey;
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
    type: 'running' as TrainingTypeKey,
  });
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const days = [
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
    'dimanche',
  ];

  const trainingTypes = TRAINING_TYPES;

  const timeToPosition = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;

    return 100 - (totalMinutes / (24 * 60)) * 100;
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
      type: 'running' as TrainingTypeKey,
    });
  };

  const handleAlertClick = (alert: TrainingAlert) => {
    setSelectedAlert(alert);
    setSelectedDay(alert.day);

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
      const updatedAlerts = alerts.map(alert =>
        alert.id === selectedAlert.id ? newAlert : alert,
      );
      onAlertsChange(updatedAlerts);
    } else {
      onAlertsChange([...alerts, newAlert]);
    }

    setSelectedDay(null);
    setSelectedAlert(null);
    setAlertForm({
      time: '',
      label: '',
      color: '#FF6B35',
      type: 'running' as TrainingTypeKey,
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
        type: 'running' as TrainingTypeKey,
      });
    }
  };

  const getDayAlerts = (day: string) => {
    const dayAlerts = alerts.filter(alert => alert.day === day);
    console.log(`Alertes pour ${day}:`, dayAlerts);
    return dayAlerts;
  };

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
                    {dayAlerts.map(alert => {
                      const position = timeToPosition(alert.time);
                      console.log(
                        `Pastille pour ${alert.day} à ${alert.time}: position ${position}%`,
                      );
                      return (
                        <TouchableOpacity
                          key={alert.id}
                          style={[
                            styles.alertDot,
                            {
                              backgroundColor: alert.color,
                              top: `${position}%`,
                            },
                          ]}
                          onPress={() => handleAlertClick(alert)}
                        />
                      );
                    })}
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
                      alertForm.type === type.key && {
                        backgroundColor: type.color,
                        borderColor: type.color,
                      },
                    ]}
                    onPress={() =>
                      setAlertForm({
                        ...alertForm,
                        type: type.key as any,
                        color: type.color,
                      })
                    }
                  >
                    {type.icon ? (
                      <Icon
                        name={type.icon}
                        size={20}
                        color={
                          alertForm.type === type.key
                            ? COLORS.blanc
                            : COLORS.noir
                        }
                      />
                    ) : (
                      <Text style={styles.typeEmoji}>{type.emoji}</Text>
                    )}
                    <Text
                      style={[
                        styles.typeLabel,
                        alertForm.type === type.key && {
                          color: COLORS.blanc,
                          fontWeight: '600',
                        },
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
              <TimePicker
                selectedHour={selectedHour}
                selectedMinute={selectedMinute}
                onHourChange={setSelectedHour}
                onMinuteChange={setSelectedMinute}
                onTimeChange={(hour, minute) => {
                  setSelectedHour(hour);
                  setSelectedMinute(minute);
                  const timeString = `${hour
                    .toString()
                    .padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                  setAlertForm(prev => ({
                    ...prev,
                    time: timeString,
                  }));
                }}
              />
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
                placeholderTextColor={COLORS.gris_fonce}
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

      <View style={styles.legendContainer}>
        <View style={styles.legendItems}>
          {trainingTypes.map(type => (
            <View key={type.key} style={styles.legendItem}>
              <View style={styles.legendContent}>
                {type.icon ? (
                  <Icon name={type.icon} size={16} color={type.color} />
                ) : (
                  <Text style={styles.legendEmoji}>{type.emoji}</Text>
                )}
                <Text style={styles.legendText}>{type.label}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    marginTop: 10,
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
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: COLORS.blanc,
    left: '50%',
    marginLeft: -9,
    marginTop: -9,
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
  typeEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.noir,
  },

  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
  legendContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.noir,
    marginBottom: 8,
    textAlign: 'center',
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
    borderWidth: 1,
    borderColor: COLORS.blanc,
  },
  legendContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendEmoji: {
    fontSize: 16,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.noir,
    fontWeight: '500',
    marginLeft: 4,
  },
});
