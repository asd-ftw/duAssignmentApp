import {useTranslation} from 'react-i18next';
import {HelperText, TextInput} from 'react-native-paper';
import styles from './styles';
import {TextFieldProps} from './types';

const TextField: React.FC<TextFieldProps> = ({
  formik,
  name,
  label,
  secureTextEntry = false,
  keyboardType,
  ...rest
}) => {
  const {t} = useTranslation();
  return (
    <>
      <TextInput
        label={t(label)}
        value={formik.values[name]}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        mode="outlined"
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.input}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        {...rest}
      />
      <HelperText
        type="error"
        visible={formik.touched[name] && Boolean(formik.errors[name])}>
        {t(formik.errors[name] || '')}
      </HelperText>
    </>
  );
};

export default TextField;
