import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { COLORS } from '../constantes/color.constante';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

export const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const email = 'gregoire.montigny@dev-together.com';

  const handleCopyEmail = () => {
    Clipboard.setString(email);
    Alert.alert(
      '✅ Email copié !',
      `L'email "${email}" a été copié dans votre presse-papiers.`,
      [{ text: 'Parfait !', style: 'default' }],
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header avec bouton de fermeture */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.icon}>💡</Text>
              <Text style={styles.title}>À propos de LazyRunner</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Contenu */}
          <View style={styles.content}>
            <Text style={styles.description}>
              Cette application a été créée pour les runners fainéants comme
              moi, toujours volontaire pour s'entrainer mais jamais trop pour le
              renfo ou la mobilité.
            </Text>

            <View style={styles.contactSection}>
              <Text style={styles.contactTitle}>
                💬 Besoin d'aide ou d'idées ?
              </Text>
              <Text style={styles.contactText}>
                Si vous avez des suggestions d'amélioration ou si vous
                rencontrez des problèmes, n'hésitez pas à me contacter :
              </Text>
            </View>

            {/* Email avec bouton de copie */}
            <View style={styles.emailSection}>
              <View style={styles.emailContainer}>
                <Text style={styles.email} selectable={true}>
                  {email}
                </Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={handleCopyEmail}
                >
                  <Text style={styles.copyIcon}>📋</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.copyHint}>
                Appuyez sur l'icône pour copier l'email
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
              <Text style={styles.closeModalText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  modal: {
    backgroundColor: COLORS.blanc,
    borderRadius: 20,
    width: width - 40,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.noir,
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.gris,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 14,
    color: COLORS.blanc,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.gris,
    marginBottom: 20,
    textAlign: 'justify',
  },
  contactSection: {
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.noir,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.gris,
  },
  emailSection: {
    marginBottom: 20,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.orange,
  },
  email: {
    fontSize: 16,
    color: COLORS.orange,
    fontWeight: '500',
    flex: 1,
  },
  copyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  copyIcon: {
    fontSize: 18,
  },
  copyHint: {
    fontSize: 12,
    color: COLORS.gris,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    padding: 20,
    paddingTop: 0,
  },
  closeModalButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeModalText: {
    color: COLORS.blanc,
    fontSize: 16,
    fontWeight: '600',
  },
});
