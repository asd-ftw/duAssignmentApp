import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: '8@s',
    paddingTop: '8@vs',
  },
  footerLoader: {
    marginVertical: '20@vs',
  },
});

export default styles;
