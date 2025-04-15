import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // backgroundColor: 'green'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: '8@s',
    paddingTop: '8@vs',
    // backgroundColor:'red',
  },
  card: {
    flex: 1,
    margin: '8@ms',
    maxWidth: '46%',
    backgroundColor: 'blue',
  },
  image: {
    height: '200@vs',
    resizeMode: 'cover',
    width: '100%',
  },
  cardContent: {
    paddingTop: '8@vs',
    paddingBottom: '12@vs',
    minHeight: '60@vs',
    width: '100%',
  },
  titleText: {
    lineHeight: '18@vs',
  },
  footerLoader: {
    marginVertical: '20@vs',
  },
});

export default styles;
