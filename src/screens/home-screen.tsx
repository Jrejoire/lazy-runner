import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Button,
  WeeklyPlanner,
  WelcomeHeader,
  QuickActionsSection,
  WeekPlanCard,
  StatsCard,
  QuoteCard,
} from '../components';
import { WeeklyPlan } from '../types';
import { useUser } from '../hooks/useUser';
import { useNotifications } from '../hooks/useNotifications';
import { getRandomCitation } from '../data/citations';

interface TrainingAlert {
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
  const { testNotification, hasPermission } = useNotifications();
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>({});
  const [alerts, setAlerts] = useState<TrainingAlert[]>([]);
  const [currentCitation, setCurrentCitation] = useState(getRandomCitation());

  useEffect(() => {
    if (user) {
      setWeeklyPlan(user.weeklyPlan || {});
    }
  }, [user]);

  useEffect(() => {
    // Changer la citation toutes les 30 secondes
    const interval = setInterval(() => {
      setCurrentCitation(getRandomCitation());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleAlertsChange = (newAlerts: TrainingAlert[]) => {
    setAlerts(newAlerts);
  };

  const handleTestNotification = () => {
    testNotification();
    Alert.alert(
      'Test de notification',
      'Une notification de test a été envoyée ! Vérifiez votre barre de notifications.',
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  const quickActions = [
    {
      icon: '▶️',
      title: 'Mobilité Rapide',
      subtitle: '5 min',
      onPress: () => navigation.navigate('Mobility'),
      color: '#10b981',
    },
    {
      icon: '💪',
      title: 'Mini Force',
      subtitle: '10 min',
      onPress: () => navigation.navigate('Strengthening'),
      color: '#f59e0b',
    },
  ];

  const weekPlan = [
    { day: 'Lun', type: 'Mobilité', completed: true },
    { day: 'Mar', type: 'Force', completed: true },
    { day: 'Mer', type: 'Mobilité', completed: true },
    { day: 'Jeu', type: 'Force', completed: false },
    { day: 'Ven', type: 'Mobilité', completed: false },
    { day: 'Sam', type: 'Repos', completed: false },
    { day: 'Dim', type: 'Force', completed: false },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <WelcomeHeader
        title="Bon retour, Runner!"
        subtitle="Gardons ces muscles heureux et forts"
        emoji="👟"
      />

      <QuickActionsSection title="Démarrage Rapide" actions={quickActions} />

      <WeekPlanCard days={weekPlan} />

      <StatsCard
        icon="📈"
        title="Ce Mois"
        number="18 séances"
        subtitle="+23% vs mois dernier"
        emoji="📈"
        color="#ff6b35"
      />

      <QuoteCard
        text={currentCitation.texte}
        author={currentCitation.personnage}
        source={currentCitation.film}
        year={currentCitation.annee}
      />

      <WeeklyPlanner alerts={alerts} onAlertsChange={handleAlertsChange} />

      {hasPermission && (
        <Button
          title="🔔 Tester les notifications"
          onPress={handleTestNotification}
          variant="secondary"
          style={styles.actionButton}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  actionButton: {
    marginTop: 16,
  },
});
