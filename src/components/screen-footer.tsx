import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from './button';

interface ScreenFooterProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export const ScreenFooter: React.FC<ScreenFooterProps> = ({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
}) => {
  return (
    <View style={styles.container}>
      <Button
        title={title}
        onPress={onPress}
        disabled={disabled}
        variant={variant}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});
