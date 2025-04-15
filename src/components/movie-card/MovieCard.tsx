import React from 'react';
import { Card, Text } from 'react-native-paper';
import { Movie } from '../../api/movieApi';
import { IMAGE_BASE_URL } from '../../utils/constants';
import styles from './styles';

interface MovieCardProps {
  item: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ item }) => {
  const imageUrl = item.poster_path
    ? IMAGE_BASE_URL + item.poster_path
    : undefined;

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Cover source={{ uri: imageUrl }} style={styles.image} />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleSmall" numberOfLines={1} style={styles.titleText}>
          {item.title}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default React.memo(MovieCard);
