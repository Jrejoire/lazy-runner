import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsCardProps {
  icon: string;
  title: string;
  number: string;
  subtitle: string;
  emoji?: string;
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  number,
  subtitle,
  emoji = '📈',
  color = '#ff6b35',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.left}>
          <View style={styles.header}>
            <Text style={styles.headerIcon}>{icon}</Text>
            <Text style={[styles.headerTitle, { color }]}>{title}</Text>
          </View>
          <Text style={styles.number}>{number}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  number: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  emoji: {
    fontSize: 40,
  },
});
