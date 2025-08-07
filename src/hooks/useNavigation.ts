import { useState, useCallback } from 'react';

export type Screen = 'home' | 'mobility' | 'strengthening' | 'session';

interface NavigationState {
  currentScreen: Screen;
  history: Screen[];
}

export const useNavigation = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentScreen: 'home',
    history: ['home'],
  });

  const navigate = useCallback((screen: Screen) => {
    setNavigationState(prev => ({
      currentScreen: screen,
      history: [...prev.history, screen],
    }));
  }, []);

  const goBack = useCallback(() => {
    setNavigationState(prev => {
      const newHistory = prev.history.slice(0, -1);
      const previousScreen = newHistory[newHistory.length - 1] || 'home';
      
      return {
        currentScreen: previousScreen,
        history: newHistory,
      };
    });
  }, []);

  const canGoBack = navigationState.history.length > 1;

  return {
    currentScreen: navigationState.currentScreen,
    navigate,
    goBack,
    canGoBack,
  };
};
