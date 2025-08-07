import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Button, WeeklyPlanner } from '../components';
import { WeeklyPlan } from '../types';
import { useUser } from '../hooks/useUser';

interface Alert {
  id: string;
  day: string;
  time: string;
  label: string;
  color: string;
  type: 'running' | 'mobility' | 'strengthening';
}

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user, loading, updateWeeklyPlan, getWeeklyPlan } = useUser();
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>({});
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const days = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ];

  const trainingTypes = [
    { key: 'running', label: 'Course', emoji: '🏃‍♂️' },
    { key: 'mobility', label: 'Mobilité', emoji: '🧘‍♀️' },
    { key: 'strengthening', label: 'Renforcement', emoji: '💪' },
  ];

  useEffect(() => {
    if (!loading && user) {
      setWeeklyPlan(user.weeklyPlan);
      // TODO: Charger les alertes depuis AsyncStorage
      loadAlerts();
    }
  }, [user, loading]);

  const loadAlerts = () => {
    // TODO: Charger les alertes depuis AsyncStorage
    // Pour l'instant, on utilise des données de test
    const testAlerts: Alert[] = [
      {
        id: '1',
        day: 'Lundi',
        time: '07:00',
        label: 'Course matinale',
        color: '#3b82f6',
        type: 'running',
      },
      {
        id: '2',
        day: 'Mercredi',
        time: '18:30',
        label: 'Séance mobilité',
        color: '#10b981',
        type: 'mobility',
      },
      {
        id: '3',
        day: 'Vendredi',
        time: '12:00',
        label: 'Renforcement',
        color: '#f59e0b',
        type: 'strengthening',
      },
    ];
    setAlerts(testAlerts);
  };

  const handleAlertsChange = (newAlerts: Alert[]) => {
    setAlerts(newAlerts);
    // TODO: Sauvegarder les alertes dans AsyncStorage
  };

  const toggleTraining = (day: string, trainingType: string) => {
    const newPlan = { ...weeklyPlan };
    if (!newPlan[day]) {
      newPlan[day] = {};
    }

    const dayPlan = newPlan[day] as any;
    const currentValue = dayPlan[trainingType] || false;
    dayPlan[trainingType] = !currentValue;

    setWeeklyPlan(newPlan);
    updateWeeklyPlan(newPlan);
  };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const getDayPlan = (day: string) => {
    const plan = weeklyPlan[day] || {};
    return trainingTypes.map(type => ({
      ...type,
      active: plan[type.key as keyof typeof plan] || false,
    }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {getCurrentGreeting()}, {user?.name || 'Runner'} !
        </Text>
        <Text style={styles.subtitle}>
          Planifiez vos entraînements de la semaine
        </Text>
      </View>

      {/* Nouveau WeeklyPlanner */}
      <WeeklyPlanner alerts={alerts} onAlertsChange={handleAlertsChange} />

      {/* Ancien planificateur simplifié pour compatibilité */}
      <View style={styles.weeklyPlan}>
        <Text style={styles.sectionTitle}>Plan rapide</Text>

        {days.map((day, index) => (
          <View key={day} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>{day}</Text>
            <View style={styles.trainingTypes}>
              {getDayPlan(day).map(type => (
                <TouchableOpacity
                  key={type.key}
                  style={[
                    styles.trainingButton,
                    type.active && styles.trainingButtonActive,
                  ]}
                  onPress={() => toggleTraining(day, type.key)}
                >
                  <Text style={styles.trainingEmoji}>{type.emoji}</Text>
                  <Text
                    style={[
                      styles.trainingLabel,
                      type.active && styles.trainingLabelActive,
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Button
          title="Commencer une séance de mobilité"
          onPress={() => navigation.navigate('Mobility')}
          style={styles.actionButton}
        />
        <Button
          title="Commencer une séance de renforcement"
          onPress={() => navigation.navigate('Strengthening')}
          variant="secondary"
          style={styles.actionButton}
        />
      </View>

      <View style={styles.tips}>
        <Text style={styles.tipsTitle}>💡 Conseils</Text>
        <Text style={styles.tipsText}>
          • Planifiez vos entraînements à l'avance pour rester motivé{'\n'}•
          Alternez course, mobilité et renforcement{'\n'}• Écoutez votre corps
          et ajustez l'intensité
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    paddingBottom: Platform.OS === 'android' ? 100 : 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  weeklyPlan: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  dayContainer: {
    marginBottom: 16,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  trainingTypes: {
    flexDirection: 'row',
    gap: 8,
  },
  trainingButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  trainingButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  trainingEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  trainingLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  trainingLabelActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actions: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  tips: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
