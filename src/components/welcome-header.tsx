import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WelcomeHeaderProps {
  title: string;
  subtitle: string;
  emoji?: string;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  title,
  subtitle,
  emoji = '👟',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title} {emoji}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
