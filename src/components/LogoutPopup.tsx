import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import PlaceholderImage from './PlaceholderImage';

interface LogoutPopupProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutPopup: React.FC<LogoutPopupProps> = ({ visible, onClose, onLogout }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.popupContainer}>
              <View style={styles.iconContainer}>
                <PlaceholderImage
                  width={60}
                  height={60}
                  text="🚪"
                  backgroundColor="#ff3b30"
                  style={{ borderRadius: 30 }}
                />
              </View>
              
              <Text style={styles.title}>Logout</Text>
              <Text style={styles.message}>
                Are you sure you want to logout?
              </Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={onClose}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <View style={styles.buttonDivider} />
                
                <TouchableOpacity 
                  style={[styles.button, styles.logoutButton]} 
                  onPress={onLogout}
                >
                  <Text style={styles.logoutButtonText}>Yes, Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  popupContainer: {
    backgroundColor: '#282833',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  message: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#3a3a3c',
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButton: {
    borderRightWidth: 0.5,
    borderRightColor: '#3a3a3c',
  },
  logoutButton: {
    borderLeftWidth: 0.5,
    borderLeftColor: '#3a3a3c',
  },
  buttonDivider: {
    width: 1,
    backgroundColor: '#3a3a3c',
  },
  cancelButtonText: {
    color: '#8E8E93',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButtonText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LogoutPopup; 