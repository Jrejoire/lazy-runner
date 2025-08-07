import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DayPlan {
  day: string;
  type: string;
  completed: boolean;
}

interface WeekPlanCardProps {
  days: DayPlan[];
  title?: string;
  icon?: string;
}

export const WeekPlanCard: React.FC<WeekPlanCardProps> = ({
  days,
  title = 'Plan de la Semaine',
  icon = '📅',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Text style={styles.headerIconText}>{icon}</Text>
        </View>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.grid}>
        {days.map((day, index) => (
          <View
            key={index}
            style={[
              styles.dayCard,
              day.completed && styles.dayCardCompleted,
              day.type === 'Repos' && styles.dayCardRest,
            ]}
          >
            <Text
              style={[
                styles.dayText,
                day.completed && styles.dayTextCompleted,
              ]}
            >
              {day.day}
            </Text>
            <Text
              style={[
                styles.dayTypeText,
                day.completed && styles.dayTypeTextCompleted,
              ]}
            >
              {day.type}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#fff5f0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerIconText: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  grid: {
    flexDirection: 'row',
    gap: 8,
  },
  dayCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  dayCardCompleted: {
    backgroundColor: '#ff6b35',
    borderColor: '#ff6b35',
  },
  dayCardRest: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  dayTextCompleted: {
    color: '#fff',
  },
  dayTypeText: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  dayTypeTextCompleted: {
    color: '#fff',
    opacity: 0.9,
  },
});
