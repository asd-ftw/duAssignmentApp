import React, { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { isIos } from '../../utils/commonUtils';

interface Props {
  offset?: number;
}

const DEFAULT_OFFSET = 0;

const UiKeyboardAvoiding: React.FC<PropsWithChildren<Props>> = ({
  children,
  offset = DEFAULT_OFFSET,
}) => {
  return isIos() ? (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior="padding"
      keyboardVerticalOffset={offset}>
      {children}
    </KeyboardAvoidingView>
  ) : (
    <>{children}</>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default UiKeyboardAvoiding;
