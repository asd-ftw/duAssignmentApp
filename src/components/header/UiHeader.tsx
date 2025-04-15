import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, StatusBar } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAppDispatch } from '../../redux/redux.hook';
import { useTranslation } from 'react-i18next';
import { logout } from '../../redux/slices/auth/authSlice';
import { persistor } from '../../redux/store';
import { movieApi } from '../../api/movieApi';
import styles from './styles';
import { Color } from '../../theme/colors';

const UiHeader = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  const handleLogout = () => {
    Alert.alert(t('logoutConfirmTitle'), t('logoutConfirmMessage'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('confirm'),
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          persistor.purge();
          movieApi.util.resetApiState();
          navigation.replace('LoginScreen');
        },
      },
    ]);
  };

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <Appbar.Content
        title={t('popularMovies')}
        color={Color.white}
        style={styles.appBarContent}
      />
      <Appbar.Action icon="logout" onPress={handleLogout} color={Color.white} />
    </Appbar.Header>
  );
};

export default UiHeader;
