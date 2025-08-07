import React from 'react';
import { Layout } from '../components/layout';
import { HomeScreen } from './home-screen';
import { MobilityScreen } from './mobility-screen';
import { StrengtheningScreen } from './strengthening-screen';
import { SessionScreen } from './session-screen';
import { useNavigation, Screen } from '../hooks/useNavigation';

const footerTabs = [
  {
    key: 'home',
    label: 'Accueil',
    icon: '🏠',
    isActive: true,
    onPress: () => {},
  },
  {
    key: 'mobility',
    label: 'Mobilité',
    icon: '🧘‍♀️',
    isActive: false,
    onPress: () => {},
  },
  {
    key: 'strengthening',
    label: 'Renforcement',
    icon: '💪',
    isActive: false,
    onPress: () => {},
  },
];

export const Root: React.FC = () => {
  const { currentScreen, navigate, goBack, canGoBack } = useNavigation();

  // Mettre à jour les onglets du footer
  const updatedFooterTabs = footerTabs.map(tab => ({
    ...tab,
    isActive: tab.key === currentScreen,
    onPress: () => navigate(tab.key as Screen),
  }));

  const getHeaderTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'LazyRunner';
      case 'mobility':
        return 'Mobilité';
      case 'strengthening':
        return 'Renforcement';
      case 'session':
        return 'Séance en cours';
      default:
        return 'LazyRunner';
    }
  };

  const getHeaderSubtitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Votre coach personnel';
      case 'mobility':
        return 'Exercices de mobilité';
      case 'strengthening':
        return 'Exercices de renforcement';
      case 'session':
        return 'Entraînement en cours';
      default:
        return '';
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'mobility':
        return <MobilityScreen />;
      case 'strengthening':
        return <StrengtheningScreen />;
      case 'session':
        return <SessionScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <Layout
      headerTitle={getHeaderTitle()}
      headerSubtitle={getHeaderSubtitle()}
      showBackButton={canGoBack}
      onBackPress={goBack}
      footerTabs={updatedFooterTabs}
      showFooter={currentScreen !== 'session'}
    >
      {renderScreen()}
    </Layout>
  );
};
