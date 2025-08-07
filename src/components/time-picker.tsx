import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../constantes/color.constante';

interface TimePickerProps {
  selectedHour: number;
  selectedMinute: number;
  onHourChange: (hour: number) => void;
  onMinuteChange: (minute: number) => void;
  onTimeChange?: (hour: number, minute: number) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  selectedHour,
  selectedMinute,
  onHourChange,
  onMinuteChange,
  onTimeChange,
}) => {
  const hourScrollViewRef = useRef<ScrollView>(null);
  const minuteScrollViewRef = useRef<ScrollView>(null);

  const handleHourScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const itemHeight = 40;
    const newHour = Math.round(y / itemHeight);
    if (newHour >= 0 && newHour < 24 && newHour !== selectedHour) {
      onHourChange(newHour);
    }
  };

  const handleMinuteScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const itemHeight = 40;
    const newMinute = Math.round(y / itemHeight);
    if (newMinute >= 0 && newMinute < 60 && newMinute !== selectedMinute) {
      onMinuteChange(newMinute);
    }
  };

  const snapToHour = (hour: number) => {
    if (hourScrollViewRef.current) {
      hourScrollViewRef.current.scrollTo({ y: hour * 40, animated: true });
    }
    // Notifier le parent de la valeur finalisée
    if (onTimeChange) {
      onTimeChange(hour, selectedMinute);
    }
  };

  const snapToMinute = (minute: number) => {
    if (minuteScrollViewRef.current) {
      minuteScrollViewRef.current.scrollTo({ y: minute * 40, animated: true });
    }
    // Notifier le parent de la valeur finalisée
    if (onTimeChange) {
      onTimeChange(selectedHour, minute);
    }
  };

  return (
    <View style={styles.timePickerContainer}>
      <View style={styles.pickerColumn}>
        <ScrollView
          style={styles.picker}
          contentContainerStyle={styles.pickerContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleHourScroll}
          onMomentumScrollEnd={() => snapToHour(selectedHour)}
          scrollEventThrottle={16}
          ref={hourScrollViewRef}
        >
          {Array.from({ length: 24 }, (_, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.pickerItem,
                selectedHour === i && styles.pickerItemSelected,
              ]}
              onPress={() => onHourChange(i)}
            >
              <Text
                style={[
                  styles.pickerItemText,
                  selectedHour === i && styles.pickerItemTextSelected,
                ]}
              >
                {i.toString().padStart(2, '0')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.timeSeparator}>:</Text>

      <View style={styles.pickerColumn}>
        <ScrollView
          style={styles.picker}
          contentContainerStyle={styles.pickerContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleMinuteScroll}
          onMomentumScrollEnd={() => snapToMinute(selectedMinute)}
          scrollEventThrottle={16}
          ref={minuteScrollViewRef}
        >
          {Array.from({ length: 60 }, (_, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.pickerItem,
                selectedMinute === i && styles.pickerItemSelected,
              ]}
              onPress={() => onMinuteChange(i)}
            >
              <Text
                style={[
                  styles.pickerItemText,
                  selectedMinute === i && styles.pickerItemTextSelected,
                ]}
              >
                {i.toString().padStart(2, '0')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.gris,
    borderRadius: 8,
    backgroundColor: COLORS.blanc,
  },
  pickerColumn: {
    alignItems: 'center',
  },
  picker: {
    height: 40,
    width: 80,
  },
  pickerContent: {
    paddingVertical: 0,
  },
  pickerItem: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  pickerItemSelected: {
    backgroundColor: COLORS.orange,
  },
  pickerItemText: {
    fontSize: 16,
    color: COLORS.noir,
  },
  pickerItemTextSelected: {
    color: COLORS.blanc,
    fontWeight: '600',
  },
  timeSeparator: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.noir,
    marginHorizontal: 12,
  },
});
