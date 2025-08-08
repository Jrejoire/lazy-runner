import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Header, Footer } from './index';
import { COLORS } from '../constantes/color.constante';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    console.log('Tab pressed:', tabName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>{children}</View>
      <Footer activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    paddingBottom: 0,
  },
});
