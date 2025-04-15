import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {ContentStyle, FlashList, ListRenderItem} from '@shopify/flash-list';
import {
  ActivityIndicator,
  Card,
  Text,
  useTheme,
} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useGetPopularMoviesQuery, Movie, movieApi} from '../../api/movieApi';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {IMAGE_BASE_URL} from '../../utils/constants';
import Header from '../../components/header/Header';
import MovieCard from '../../components/movie-card/MovieCard';

const MovieScreen = () => {
  const {t} = useTranslation();
  const [page, setPage] = useState(1);

  const {data, isLoading, isFetching, error} = useGetPopularMoviesQuery({page});

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 1;

  const loadMoreMovies = useCallback(() => {
    if (!isFetching && page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  }, [isFetching, page, totalPages]);

  // const renderItem: ListRenderItem<Movie> = useCallback(
  //   ({item}) => (
  //     <Card style={styles.card} mode="elevated">
  //       <Card.Cover
  //         source={{uri: IMAGE_BASE_URL + item.poster_path}}
  //         style={styles.image}
  //       />
  //       <Card.Content style={styles.cardContent}>
  //         <Text variant="titleSmall" numberOfLines={2} style={styles.titleText}>
  //           {item.title}
  //         </Text>
  //       </Card.Content>
  //     </Card>
  //   ),
  //   [],
  // );

  const renderItem: ListRenderItem<Movie> = useCallback(
    ({item}) => (
      <MovieCard item={item} />
    ),
    [],
  );

  const ListFooterComponent = useCallback(() => {
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
  }, [isFetching, page]);

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
          estimatedItemSize={250}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list as ContentStyle}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.7}
          ListFooterComponent={ListFooterComponent}
          
        />
      )}
      {!(isLoading && page === 1) && movies.length === 0 && !error && (
         <View style={styles.centered}>
           <Text>{t('noMoviesFound')}</Text>
         </View>
      )}
    </SafeAreaView>
  );
};

export default MovieScreen;
