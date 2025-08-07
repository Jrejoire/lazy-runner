import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Header } from './header';
import { Footer } from './footer';

interface LayoutProps {
  children: React.ReactNode;
  headerTitle: string;
  headerSubtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  footerTabs?: Array<{
    key: string;
    label: string;
    icon: string;
    isActive: boolean;
    onPress: () => void;
  }>;
  showFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  headerTitle,
  headerSubtitle,
  showBackButton = false,
  onBackPress,
  footerTabs = [],
  showFooter = true,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={headerTitle}
        subtitle={headerSubtitle}
        showBackButton={showBackButton}
        onBackPress={onBackPress}
      />
      <View style={styles.content}>{children}</View>
      {showFooter && footerTabs.length > 0 && <Footer tabs={footerTabs} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    paddingBottom: 0, // Footer will handle the bottom spacing
  },
});
