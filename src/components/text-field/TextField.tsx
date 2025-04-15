import React from 'react';
import { useTranslation } from 'react-i18next';
import { HelperText, TextInput } from 'react-native-paper';
import styles from './styles';
import { TextFieldProps } from './types';
import { TextInput as RNInput } from 'react-native';

const TextField = React.forwardRef<RNInput, TextFieldProps>(
  (
    { formik, name, label, secureTextEntry = false, keyboardType, ...rest },
    ref,
  ) => {
    const { t } = useTranslation();
    const error = formik.touched[name] && formik.errors[name];

    return (
      <>
        <TextInput
          ref={ref}
          label={t(label)}
          value={formik.values[name]}
          onChangeText={formik.handleChange(name)}
          onBlur={formik.handleBlur(name)}
          mode="outlined"
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={styles.input}
          error={Boolean(error)}
          {...rest}
        />
        <HelperText type="error" visible={Boolean(error)}>
          {error ? t(error) : ''}
        </HelperText>
      </>
    );
  },
);

export default TextField;
