import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

interface FooterTab {
  key: string;
  label: string;
  icon: string;
  isActive: boolean;
  onPress: () => void;
}

interface FooterProps {
  tabs: FooterTab[];
}

export const Footer: React.FC<FooterProps> = ({ tabs }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={tab.onPress}
          activeOpacity={0.7}
        >
          <Text style={[styles.icon, tab.isActive && styles.iconActive]}>
            {tab.icon}
          </Text>
          <Text style={[styles.label, tab.isActive && styles.labelActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: Platform.OS === 'android' ? 20 : 8,
    paddingTop: 8,
    height: Platform.OS === 'android' ? 80 : 60,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
    color: '#666',
  },
  iconActive: {
    color: '#4CAF50',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  labelActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});
