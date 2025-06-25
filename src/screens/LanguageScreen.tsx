import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  FlatList 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import PlaceholderImage from '../components/PlaceholderImage';

// Language options
const languages = [
  { id: '1', code: 'en', name: 'English', flag: '🇺🇸' },
  { id: '2', code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { id: '3', code: 'fr', name: 'French', flag: '🇫🇷' },
  { id: '4', code: 'de', name: 'German', flag: '🇩🇪' },
  { id: '5', code: 'it', name: 'Italian', flag: '🇮🇹' },
  { id: '6', code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { id: '7', code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { id: '8', code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { id: '9', code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { id: '10', code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { id: '11', code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { id: '12', code: 'hi', name: 'Hindi', flag: '🇮🇳' },
];

const LanguageScreen = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
  };

  const handleSaveChanges = () => {
    // In a real app, you would save the selected language to storage/state management
    // For now, we just go back
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <PlaceholderImage
            width={24}
            height={24}
            text="←"
            backgroundColor="transparent"
            color="white"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
        <View style={styles.placeholder} />
      </View>
      
      <FlatList
        data={languages}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.languageItem}
            onPress={() => handleLanguageSelect(item.code)}
          >
            <View style={styles.languageInfo}>
              <Text style={styles.languageFlag}>{item.flag}</Text>
              <Text style={styles.languageName}>{item.name}</Text>
            </View>
            
            {selectedLanguage === item.code && (
              <PlaceholderImage
                width={24}
                height={24}
                text="✓"
                backgroundColor="transparent"
                color="#ff3b30"
              />
            )}
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSaveChanges}
          >
            <Text style={styles.saveButtonText}>Apply Changes</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#282833',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#282833',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 44,
  },
  listContent: {
    padding: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#282833',
    borderRadius: 12,
    marginBottom: 12,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 16,
  },
  languageName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#ff3b30',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LanguageScreen; 