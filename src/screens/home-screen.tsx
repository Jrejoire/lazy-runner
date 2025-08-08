import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout, WelcomeHeader, WeeklyPlanner, QuoteCard } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TrainingTypeKey } from '../constantes/training-types.constante';

interface TrainingAlert {
  id: string;
  day: string;
  time: string;
  label: string;
  color: string;
  type: TrainingTypeKey;
}

export default function HomeScreen() {
  const [alerts, setAlerts] = useState<TrainingAlert[]>([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const storedAlerts = await AsyncStorage.getItem('trainingAlerts');
      if (storedAlerts) {
        setAlerts(JSON.parse(storedAlerts));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des alertes:', error);
    }
  };

  const handleAlertsChange = async (newAlerts: TrainingAlert[]) => {
    try {
      setAlerts(newAlerts);
      await AsyncStorage.setItem('trainingAlerts', JSON.stringify(newAlerts));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des alertes:', error);
    }
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <WelcomeHeader />

        <WeeklyPlanner alerts={alerts} onAlertsChange={handleAlertsChange} />

        <QuoteCard />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {},
});
