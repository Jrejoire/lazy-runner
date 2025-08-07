import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { InfoModal } from './info-modal';
import { COLORS } from '../constantes/color.constante';

export default function Header() {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logoText}>LR</Text>
      </View>

      <View>
        <Text style={styles.title}>Lazy</Text>
        <Text style={styles.title2}>Runner</Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setShowInfoModal(!showInfoModal)}
        >
          <Text style={styles.infoIcon}>💡</Text>
        </TouchableOpacity>
      </View>

      <InfoModal
        visible={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight || 0,
    paddingBottom: 16,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
  },
  infoButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIcon: {
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: -20,
  },
  title2: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginLeft: -10,
  },
});
