import {TextInputProps as PaperTextInputProps} from 'react-native-paper';
import {FormikProps} from 'formik';

interface FormValues {
  email: string;
  password: string;
}

type CustomTextFieldProps = Omit<
  PaperTextInputProps,
  | 'value'
  | 'onChangeText'
  | 'onBlur'
  | 'error'
  | 'label'
  | 'secureTextEntry'
  | 'keyboardType'
>;

export interface TextFieldProps extends CustomTextFieldProps {
  formik: FormikProps<FormValues>;
  name: keyof FormValues;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: PaperTextInputProps['keyboardType'];
}
