import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Timer } from './timer';

interface TimersSectionProps {
  totalDuration: number;
  exerciseDuration: number;
}

export const TimersSection: React.FC<TimersSectionProps> = ({
  totalDuration,
  exerciseDuration,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.timerRow}>
        <Timer seconds={totalDuration} label="Durée totale" size="medium" />
        <Timer
          seconds={exerciseDuration}
          label="Temps par exercice"
          size="medium"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  timerRow: {
    flexDirection: 'row',
    gap: 16,
  },
});
