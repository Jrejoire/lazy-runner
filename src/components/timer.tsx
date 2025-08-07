import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TimerProps {
  seconds: number;
  label: string;
  size?: 'small' | 'medium' | 'large';
}

export const Timer: React.FC<TimerProps> = ({
  seconds,
  label,
  size = 'medium',
}) => {
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, styles[size]]}>
      <Text style={[styles.time, styles[`${size}Time`]]}>
        {formatTime(seconds)}
      </Text>
      <Text style={[styles.label, styles[`${size}Label`]]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  small: {
    padding: 8,
  },
  medium: {
    padding: 16,
  },
  large: {
    padding: 24,
  },
  time: {
    fontWeight: 'bold',
    color: '#333',
  },
  smallTime: {
    fontSize: 18,
  },
  mediumTime: {
    fontSize: 24,
  },
  largeTime: {
    fontSize: 32,
  },
  label: {
    marginTop: 4,
    color: '#666',
  },
  smallLabel: {
    fontSize: 12,
  },
  mediumLabel: {
    fontSize: 14,
  },
  largeLabel: {
    fontSize: 16,
  },
});
