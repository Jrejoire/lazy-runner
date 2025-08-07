import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Layout } from '../components';
import { COLORS } from '../constantes/color.constante';

export default function HomeScreen() {
  return (
    <Layout>
      <Text style={styles.text}>Home</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: COLORS.TEXT_PRIMARY,
  },
});
