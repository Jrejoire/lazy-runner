import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLORS } from '../constantes/color.constante';
import Icon from 'react-native-vector-icons/Octicons';

export default function Header() {
  const headerLogo = require('../../public/logos/LR-logo-carre.png');
  const headerText = require('../../public/logos/LR-name.png');

  return (
    <View style={styles.container}>
      <View>
        <Image source={headerLogo} style={styles.logo} />
      </View>

      <View>
        <Image source={headerText} style={styles.logoText} />
      </View>

      <View>
        <TouchableOpacity style={styles.infoButton}>
          <Icon name="light-bulb" size={20} color={COLORS.noir} />
        </TouchableOpacity>
      </View>
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
    backgroundColor: COLORS.background,
  },
  logo: {
    width: 80,
    height: 80,
  },
  logoText: {
    width: 120,
    height: 60,
    marginTop: 10,
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
    color: COLORS.noir,
    marginLeft: -20,
  },
  title2: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.orange,
    marginLeft: -10,
  },
});
