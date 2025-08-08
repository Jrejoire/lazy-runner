import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getRandomCitation, Citation } from '../data/citations';
import { COLORS } from '../constantes/color.constante';

export const QuoteCard: React.FC = () => {
  const [quote, setQuote] = useState<Citation | null>(null);

  useEffect(() => {
    const citation = getRandomCitation();
    setQuote(citation);
  }, []);

  if (!quote) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>"{quote.texte}"</Text>
        <Text style={styles.author}>
          — {quote.personnage}, {quote.film} ({quote.annee})
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.blanc,
    borderRadius: 12,
    marginVertical: 16,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  author: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
