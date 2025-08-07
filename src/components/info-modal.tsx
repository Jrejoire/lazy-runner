import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const handleEmailPress = () => {
    Alert.alert(
      'Contact',
      'Email: gregoire.montigny@dev-together.com',
      [
        { text: 'Copier', onPress: () => console.log('Email copied') },
        { text: 'Fermer', style: 'cancel' },
      ]
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
          <View style={styles.header}>
            <Text style={styles.icon}>💡</Text>
            <Text style={styles.title}>À propos de LazyRunner</Text>
          </View>
          
          <Text style={styles.description}>
            Cette application a été créée pour les runners fainéants comme moi.
          </Text>
          
          <Text style={styles.contact}>
            Si vous avez des idées d'implémentation et si vous rencontrez des problèmes, faites-le moi savoir :
          </Text>
          
          <TouchableOpacity style={styles.emailButton} onPress={handleEmailPress}>
            <Text style={styles.email}>gregoire.montigny@dev-together.com</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    maxWidth: 400,
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  contact: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  emailButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  email: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
});
