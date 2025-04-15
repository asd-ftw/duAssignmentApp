import {isRTL} from '../../utils/layout';
import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  input: {
    marginTop: '4@vs',
    textAlign: isRTL ? 'right' : 'left',
  },
});

export default styles;
