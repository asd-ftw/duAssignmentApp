import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  card: {
    flex: 1,
    margin: '8@ms',
  },
  image: {
    height: '200@vs',
    resizeMode: 'cover',
    width: '100%',
    backgroundColor: '#e0e0e0',
  },
  cardContent: {
    paddingTop: '8@vs',
    paddingBottom: '12@vs',
    width: '100%',
    paddingHorizontal: '8@s',
  },
  titleText: {
    lineHeight: '18@vs',
    textAlign: 'center',
  },
});

export default styles;
