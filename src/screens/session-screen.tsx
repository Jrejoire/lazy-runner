import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '../components';
import { COLORS } from '../constantes/color.constante';

export default function SessionScreen() {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.text}>Session Screen</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
  },
  text: {
    fontSize: 24,
    color: COLORS.TEXT_PRIMARY,
  },
});
