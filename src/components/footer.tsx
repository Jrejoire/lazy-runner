import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { COLORS } from '../constantes/color.constante';
import Icon from 'react-native-vector-icons/Octicons';

interface FooterProps {
  activeTab?: string;
  onTabPress?: (tabName: string) => void;
}

interface TabItem {
  id: string;
  name: string;
  icon: string;
  iconType?: 'emoji' | 'vector';
}

export const Footer: React.FC<FooterProps> = ({
  activeTab = 'home',
  onTabPress,
}) => {
  const handleTabPress = (tabName: string) => {
    if (onTabPress) {
      onTabPress(tabName);
    }
  };

  const tabs: TabItem[] = [
    {
      id: 'home',
      name: 'Accueil',
      icon: 'home',
      iconType: 'vector',
    },
    {
      id: 'mobility',
      name: 'Mobilité',
      icon: 'accessibility',
      iconType: 'vector',
    },
    {
      id: 'strengthening',
      name: 'Renforcement',
      icon: 'flame',
      iconType: 'vector',
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => handleTabPress(tab.id)}
        >
          {tab.iconType === 'vector' ? (
            <Icon
              name={tab.icon}
              size={24}
              color={activeTab === tab.id ? COLORS.orange : COLORS.gris_fonce}
              style={activeTab === tab.id && styles.activeIcon}
            />
          ) : (
            <Text
              style={[styles.icon, activeTab === tab.id && styles.activeIcon]}
            >
              {tab.icon}
            </Text>
          )}
          <Text
            style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText,
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  activeIcon: {
    transform: [{ scale: 1.2 }],
  },
  tabText: {
    fontSize: 12,
    color: COLORS.gris_fonce,
  },
  activeTabText: {
    color: COLORS.orange,
    fontWeight: 'bold',
  },
});
