import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface QuoteCardProps {
  text: string;
  author: string;
  source: string;
  year: number;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  text,
  author,
  source,
  year,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>"{text}"</Text>
        <Text style={styles.author}>
          — {author}, {source} ({year})
        </Text>
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
