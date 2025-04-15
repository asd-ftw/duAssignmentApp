import React from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '../../utils/validationSchema';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/slices/auth/authSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'react-native-paper';
import LanguageToggle from '../../components/language-toggle/LanguageToggle';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '../../components/text-field/TextField';
import UiKeyboardAvoiding from '../../components/keyboard-avoiding/UiKeyboardAvoiding';
import { ScrollView, TextInput as RNInput } from 'react-native';

const LoginScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const passwordRef = React.useRef<RNInput>(null);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: values => {
      dispatch(setCredentials(values));
      navigation.navigate('MovieScreen');
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <UiKeyboardAvoiding>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>{t('login')}</Text>
          <TextField
            formik={formik}
            name="email"
            label="email"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
          />
          <TextField
            ref={passwordRef}
            formik={formik}
            name="password"
            label="password"
            secureTextEntry
            returnKeyType="done"
          />
          <Button
            mode="contained"
            onPress={() => formik.handleSubmit()}
            disabled={!formik.isValid}
            style={styles.button}>
            {t('submit')}
          </Button>
          <LanguageToggle />
        </ScrollView>
      </UiKeyboardAvoiding>
    </SafeAreaView>
  );
};

export default LoginScreen;
