import React, { useEffect, useState } from 'react';
import { ActivityIndicator, I18nManager, StyleSheet, View } from 'react-native';
import RNRestart from 'react-native-restart';
import './src/i18n';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './src/navigation/AppNavigator';
import { persistor, RootState, store } from './src/redux/store';
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import { useAppSelector } from './src/redux/redux.hook';

const LanguageInitializer = ({
  onInitialized,
}: {
  onInitialized: () => void;
}) => {
  const { i18n } = useTranslation();
  const persistedLanguage = useAppSelector(
    (state: RootState) => state.persisted.language.selectedLanguage,
  );

  useEffect(() => {
    let languageSyncedThisCycle = false;
    let restartNeeded = false;

    if (persistedLanguage && i18n.language !== persistedLanguage) {
      i18n.changeLanguage(persistedLanguage);
      languageSyncedThisCycle = true;
    }

    const currentActiveLanguage = languageSyncedThisCycle
      ? persistedLanguage
      : i18n.language;

    const shouldBeRTL = currentActiveLanguage === 'ar';
    const currentlyIsRTL = I18nManager.isRTL;

    if (shouldBeRTL !== currentlyIsRTL) {
      I18nManager.forceRTL(shouldBeRTL);
      restartNeeded = true;
    }

    if (!restartNeeded) {
      onInitialized();
    } else {
      setTimeout(() => {
        RNRestart.Restart();
      }, 50);
    }
  }, [persistedLanguage, i18n, onInitialized]);

  return null;
};

function App(): React.JSX.Element {
  const [isInitialized, setIsInitialized] = useState(false);

  return (
    <PaperProvider theme={DefaultTheme}>
      <Provider store={store}>
        <PersistGate
          loading={
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
            </View>
          }
          persistor={persistor}>
          {!isInitialized ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <LanguageInitializer
                onInitialized={() => setIsInitialized(true)}
              />
            </View>
          ) : (
            <AppNavigator />
          )}
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default App;
