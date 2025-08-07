import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QuickActionCard } from './QuickActionCard';

interface QuickAction {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  color?: string;
}

interface QuickActionsSectionProps {
  title: string;
  actions: QuickAction[];
}

export const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  title,
  actions,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.grid}>
        {actions.map((action, index) => (
          <QuickActionCard
            key={index}
            icon={action.icon}
            title={action.title}
            subtitle={action.subtitle}
            onPress={action.onPress}
            color={action.color}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
});
