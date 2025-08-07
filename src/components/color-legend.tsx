import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ColorLegend: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Légende des préférences :</Text>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <Text style={styles.emoji}>🟢</Text>
          <Text style={styles.text}>J'aime cet exercice</Text>
        </View>
        <View style={styles.legendItem}>
          <Text style={styles.emoji}>🔴</Text>
          <Text style={styles.text}>Je n'aime pas cet exercice</Text>
        </View>
        <View style={styles.legendItem}>
          <Text style={styles.emoji}>⚪️</Text>
          <Text style={styles.text}>Neutre</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  legendContainer: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 16,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
});
