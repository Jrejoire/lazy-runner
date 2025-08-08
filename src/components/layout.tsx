import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Header, Footer } from './index';
import { COLORS } from '../constantes/color.constante';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState('home');

  // Mettre à jour l'onglet actif basé sur la route actuelle
  useEffect(() => {
    const routeName = route.name;
    switch (routeName) {
      case 'Home':
        setActiveTab('home');
        break;
      case 'Mobility':
        setActiveTab('mobility');
        break;
      case 'Strengthening':
        setActiveTab('strengthening');
        break;
    }
  }, [route.name]);

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    console.log('Tab pressed:', tabName);

    // Navigation vers les écrans correspondants
    switch (tabName) {
      case 'home':
        navigation.navigate('Home' as never);
        break;
      case 'mobility':
        navigation.navigate('Mobility' as never);
        break;
      case 'strengthening':
        navigation.navigate('Strengthening' as never);
        break;
    }
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
