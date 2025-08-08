import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constantes/color.constante';
import Icon from 'react-native-vector-icons/Octicons';

interface TimerProps {
  seconds: number;
  label: string;
  size?: 'small' | 'medium' | 'large';
  totalSeconds?: number;
  isActive?: boolean;
  mode?: 'display' | 'setter' | 'countdown';
  onValueChange?: (newValue: number) => void;
  onComplete?: () => void;
}

export const Timer: React.FC<TimerProps> = ({
  seconds,
  label,
  size = 'medium',
  totalSeconds,
  isActive = false,
  mode = 'display',
  onValueChange,
  onComplete,
}) => {
  const [currentSeconds, setCurrentSeconds] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Synchroniser avec les props
  useEffect(() => {
    setCurrentSeconds(seconds);
  }, [seconds]);

  // Gérer le countdown
  useEffect(() => {
    if (mode === 'countdown' && isRunning && currentSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, currentSeconds, mode, onComplete]);

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleIncrement = () => {
    const newValue = currentSeconds + 15; // Incrémenter de 15 secondes
    setCurrentSeconds(newValue);
    onValueChange?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(0, currentSeconds - 15); // Décrémenter de 15 secondes
    setCurrentSeconds(newValue);
    onValueChange?.(newValue);
  };

  const toggleCountdown = () => {
    if (mode === 'countdown') {
      setIsRunning(!isRunning);
    }
  };

  // Calculer le pourcentage de progression
  const progress = totalSeconds ? (currentSeconds / totalSeconds) * 100 : 0;

  return (
    <View style={[styles.container, styles[size]]}>
      {/* Affichage circulaire pour les modes display et countdown */}
      {mode !== 'setter' && (
        <View style={styles.circleContainer}>
          <View style={styles.outerCircle}>
            {/* Cercle de progression avec rotation */}
            {totalSeconds && progress > 0 && (
              <View
                style={[
                  styles.progressCircle,
                  {
                    transform: [
                      { rotate: `${(progress / 100) * 360 - 90}deg` },
                    ],
                  },
                ]}
              />
            )}
            <View style={styles.innerCircle}>
              <Text style={[styles.time, styles[`${size}Time`]]}>
                {formatTime(currentSeconds)}
              </Text>
              <Text style={[styles.label, styles[`${size}Label`]]}>
                {label}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Contrôles selon le mode */}
      {mode === 'setter' && (
        <View style={styles.setterContainer}>
          <TouchableOpacity
            style={[styles.controlButton, styles.decrementButton]}
            onPress={handleDecrement}
          >
            <Icon name="dash" size={16} color={COLORS.blanc} />
          </TouchableOpacity>
          <View style={styles.timerDisplay}>
            <Text style={[styles.time, styles[`${size}Time`]]}>
              {formatTime(currentSeconds)}
            </Text>
            <Text style={[styles.label, styles[`${size}Label`]]}>{label}</Text>
          </View>
          <TouchableOpacity
            style={[styles.controlButton, styles.incrementButton]}
            onPress={handleIncrement}
          >
            <Icon name="plus" size={16} color={COLORS.blanc} />
          </TouchableOpacity>
        </View>
      )}

      {mode === 'countdown' && (
        <TouchableOpacity
          style={[styles.playButton, isRunning && styles.pauseButton]}
          onPress={toggleCountdown}
        >
          <Icon
            name={isRunning ? 'pause' : 'play'}
            size={20}
            color={COLORS.blanc}
          />
        </TouchableOpacity>
      )}

      {/* Indicateur d'activité */}
      {isActive && <View style={styles.activeIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  small: {
    padding: 8,
  },
  medium: {
    padding: 16,
  },
  large: {
    padding: 24,
  },
  circleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: COLORS.gris,
  },
  progressCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: COLORS.orange,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.blanc,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  time: {
    fontWeight: 'bold',
    color: COLORS.noir,
    fontFamily: 'monospace',
  },
  smallTime: {
    fontSize: 16,
  },
  mediumTime: {
    fontSize: 20,
  },
  largeTime: {
    fontSize: 24,
  },
  label: {
    marginTop: 2,
    color: COLORS.gris_fonce,
    textAlign: 'center',
  },
  smallLabel: {
    fontSize: 10,
  },
  mediumLabel: {
    fontSize: 12,
  },
  largeLabel: {
    fontSize: 14,
  },
  setterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  timerDisplay: {
    alignItems: 'center',
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  incrementButton: {
    backgroundColor: COLORS.orange,
  },
  decrementButton: {
    backgroundColor: COLORS.gris_fonce,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pauseButton: {
    backgroundColor: COLORS.gris_fonce,
  },
  activeIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.orange,
  },
});
