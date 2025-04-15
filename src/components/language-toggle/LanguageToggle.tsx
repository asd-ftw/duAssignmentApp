import React from 'react';
import {View} from 'react-native';
import {Text, ToggleButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import styles from './styles';

const LanguageToggle = () => {
  const {t, i18n} = useTranslation();

  const changeLanguage = async (lang: 'en' | 'ar') => {
    if (i18n.language !== lang) {
      await i18n.changeLanguage(lang);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="labelLarge">{t('changeLanguage')}:</Text>
      <ToggleButton.Row
        onValueChange={(val: string) =>
          val && changeLanguage(val as 'en' | 'ar')
        }
        value={i18n.language}
        style={styles.toggleContainer}>
        <ToggleButton icon="alpha-e" value="en" />
        <ToggleButton icon="alpha-a" value="ar" />
      </ToggleButton.Row>
    </View>
  );
};

export default LanguageToggle;
