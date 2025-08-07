import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Layout, WelcomeHeader, WeeklyPlanner } from '../components';

export default function HomeScreen() {
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <WelcomeHeader />

        <WeeklyPlanner alerts={[]} onAlertsChange={() => {}} />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {},
});
