import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const WelcomeHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bienvenue à toi, coureur faineant mais motivé !
      </Text>
      <Text style={styles.subtitle}>
        Courir, c'est cool, mais faire du renfo ou de la mobilité, c'est un peu
        relou, on ne va pas se mentir. Mais bon, on va quand même essayer, non ?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 18,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'justify',
  },
});
