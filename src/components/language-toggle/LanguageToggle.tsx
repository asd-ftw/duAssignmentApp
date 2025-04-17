import React from 'react';
import { View } from 'react-native';
import { Text, ToggleButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { changeAppLanguage } from '../../redux/slices/language/languageSlice';
import { useAppDispatch } from '../../redux/redux.hook';

const LanguageToggle = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const handleLanguageChange = async (lang: 'en' | 'ar') => {
    if (i18n.language !== lang && lang) {
      try {
        dispatch(changeAppLanguage(lang));
        await i18n.changeLanguage(lang);
      } catch (error) {
        console.error('Error changing language:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="labelLarge">{t('changeLanguage')}:</Text>
      <ToggleButton.Row
        onValueChange={(val: string) => {
          if (val) {
            handleLanguageChange(val as 'en' | 'ar');
          }
        }}
        value={i18n.language}
        style={styles.toggleContainer}>
        <ToggleButton icon="alpha-e" value="en" />
        <ToggleButton icon="alpha-a" value="ar" />
      </ToggleButton.Row>
    </View>
  );
};

export default LanguageToggle;
