import { I18nManager, Platform } from 'react-native';

export const isRTL = I18nManager.isRTL;

export const isIos = () => {
  return Platform.OS === 'ios';
};
