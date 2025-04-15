import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '16@s',
    paddingVertical: '24@vs',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  heading: {
    fontSize: '30@ms',
    fontWeight: 'bold',
    marginBottom: '16@vs',
    textAlign: 'center',
  },
  button: {
    marginTop: '16@vs',
    paddingVertical: '4@vs',
  },
});

export default styles;
