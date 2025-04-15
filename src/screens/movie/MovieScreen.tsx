import React, {useCallback, useState} from 'react';
import {Alert, StatusBar, View} from 'react-native';
import {ContentStyle, FlashList, ListRenderItem} from '@shopify/flash-list';
import {useAppDispatch} from '../../redux/redux.hook'; // Assuming useAppSelector is not needed directly here now
import {
  ActivityIndicator,
  Appbar,
  Card,
  Text,
  useTheme,
} from 'react-native-paper';
import {logout} from '../../redux/slices/auth/authSlice';
import {persistor} from '../../redux/store';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {useTranslation} from 'react-i18next';
import {useGetPopularMoviesQuery, Movie, movieApi} from '../../api/movieApi'; // Import hook and type
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {IMAGE_BASE_URL} from '../../utils/constants';
import Header from '../../components/header/Header';

const MovieScreen = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const [page, setPage] = useState(1);

  const {data, isLoading, isFetching, error} = useGetPopularMoviesQuery({page});

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 1;

  const loadMoreMovies = useCallback(() => {
    if (!isFetching && page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  }, [isFetching, page, totalPages]);

  const renderItem: ListRenderItem<Movie> = useCallback(
    ({item}) => (
      <Card style={styles.card} mode="elevated">
        <Card.Cover
          source={{uri: IMAGE_BASE_URL + item.poster_path}}
          style={styles.image}
        />
        <Card.Content style={styles.cardContent}>
          <Text variant="titleSmall" numberOfLines={2} style={styles.titleText}>
            {item.title}
          </Text>
        </Card.Content>
      </Card>
    ),
    [],
  );

  const ListFooterComponent = () => {
    if (isFetching && page > 1) {
      return (
        <ActivityIndicator
          animating={true}
          size="large"
          style={styles.footerLoader}
        />
      );
    }
    return null;
  };

  if (error) {
    console.error('Error fetching movies:', error);
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.centered}>
          <Text variant="headlineSmall">{t('fetchFailed')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Header />
      {isLoading && page === 1 && (
        <View style={styles.centered}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      )}
      {!(isLoading && page === 1) && (
        <FlashList
          data={movies}
          renderItem={renderItem}
          estimatedItemSize={280}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list as ContentStyle}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.7}
          ListFooterComponent={ListFooterComponent}
        />
      )}
    </SafeAreaView>
  );
};

export default MovieScreen;
