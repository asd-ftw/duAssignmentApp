import React, { useEffect } from 'react';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import './src/i18n';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './src/navigation/AppNavigator';
import { persistor, store } from './src/redux/store';
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

function App(): React.JSX.Element {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isArabic = i18n.language === 'ar';
    const currentlyRTL = I18nManager.isRTL;

    // console.log(`Language: ${i18n.language}, Is Arabic: ${isArabic}, Currently RTL: ${currentlyRTL}`);

    if (isArabic !== currentlyRTL) {
      // console.log(`RTL mismatch detected. Forcing RTL to ${isArabic} and restarting.`);
      I18nManager.forceRTL(isArabic);
      RNRestart.Restart();
    }
  }, [i18n.language]);

  return (
    <PaperProvider theme={DefaultTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}

export default App;
