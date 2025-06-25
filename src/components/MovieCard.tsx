import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageStyle,
  TextStyle,
  Dimensions,
  StyleProp,
  ViewStyle
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlaceholderImage from './PlaceholderImage';
import Theme from '../utils/Theme';

type DetailScreenParams = {
  Detail: { id: string };
};

interface MovieCardProps {
  id: string;
  title: string;
  posterUrl?: string;
  rating?: number;
  year?: string;
  genre?: string;
  type?: 'vertical' | 'horizontal' | 'featured';
  style?: StyleProp<ViewStyle>;
}

const { width } = Dimensions.get('window');

const MovieCard: React.FC<MovieCardProps> = ({
  id = '0',
  title = 'Untitled Movie',
  posterUrl,
  rating = 0,
  year = '',
  genre = '',
  type = 'vertical',
  style
}) => {
  const navigation = useNavigation<any>();
  
  // Ensure id is a string for navigation
  const safeId = id ? id.toString() : '0';
  
  const getCardDimensions = () => {
    switch(type) {
      case 'featured':
        return {
          width: width - 32,
          height: 220,
          borderRadius: Theme.borderRadius.lg,
        };
      case 'horizontal':
        return {
          width: width * 0.7,
          height: 160,
          borderRadius: Theme.borderRadius.base,
        };
      case 'vertical':
      default:
        return {
          width: width * 0.4,
          height: 220,
          borderRadius: Theme.borderRadius.base,
        };
    }
  };
  
  const renderRating = () => {
    return (
      <View style={styles.ratingContainer}>
        <PlaceholderImage
          width={14}
          height={14}
          text="★"
          backgroundColor="transparent"
          color={Theme.colors.ui.warning}
        />
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };
  
  const renderCardContent = () => {
    if (type === 'horizontal') {
      return (
        <View style={styles.horizontalContent}>
          <View style={styles.posterWrapper}>
            <PlaceholderImage
              width={90}
              height={130}
              text={title && typeof title === 'string' ? title.substring(0, 1) : "?"}
              backgroundColor={Theme.colors.background.tertiary}
            />
          </View>
          <View style={styles.horizontalInfo}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            {!!year && <Text style={styles.subInfo}>{year}</Text>}
            {!!genre && <Text style={styles.subInfo}>{genre}</Text>}
            {rating > 0 && renderRating()}
          </View>
        </View>
      );
    }
    
    return (
      <>
        <View style={[styles.gradientOverlay, getCardDimensions()]} />
        <View style={styles.cardContent}>
          {type === 'featured' && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>Featured</Text>
            </View>
          )}
          <View style={styles.cardFooter}>
            <Text style={styles.title} numberOfLines={type === 'featured' ? 2 : 1}>
              {title}
            </Text>
            <View style={styles.footerInfo}>
              {!!year && <Text style={styles.subInfo}>{year}</Text>}
              {!!genre && (
                <>
                  <View style={styles.dot} />
                  <Text style={styles.subInfo}>{genre}</Text>
                </>
              )}
              {rating > 0 && renderRating()}
            </View>
          </View>
        </View>
      </>
    );
  };
  
  // Handle navigation safely
  const handleNavigation = () => {
    try {
      // @ts-ignore
      navigation.navigate('Detail', { id: safeId });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };
  
  return (
    <TouchableOpacity
      style={[styles.container, getCardDimensions(), style]}
      onPress={handleNavigation}
      activeOpacity={0.9}
    >
      <PlaceholderImage
        width={getCardDimensions().width}
        height={getCardDimensions().height}
        text={title && typeof title === 'string' ? title.substring(0, 1) : "?"}
        backgroundColor={Theme.colors.background.tertiary}
        style={styles.poster}
      />
      {renderCardContent()}
    </TouchableOpacity>
  );
};

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    margin: 8,
    shadowColor: Theme.shadows.medium.shadowColor,
    shadowOffset: Theme.shadows.medium.shadowOffset,
    shadowOpacity: Theme.shadows.medium.shadowOpacity,
    shadowRadius: Theme.shadows.medium.shadowRadius,
    elevation: Theme.shadows.medium.elevation,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  cardContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    justifyContent: 'space-between',
  },
  horizontalContent: {
    flexDirection: 'row',
    padding: 12,
  },
  posterWrapper: {
    borderRadius: Theme.borderRadius.sm,
    overflow: 'hidden',
  },
  horizontalInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  cardFooter: {
    padding: 8,
  },
  title: {
    color: Theme.colors.text.primary,
    fontSize: Theme.typography.fontSize.base,
    fontWeight: '600',
    marginBottom: 4,
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subInfo: {
    color: Theme.colors.text.tertiary,
    fontSize: Theme.typography.fontSize.sm,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Theme.colors.text.tertiary,
    marginHorizontal: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  ratingText: {
    color: Theme.colors.text.tertiary,
    fontSize: Theme.typography.fontSize.sm,
    marginLeft: 4,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  featuredBadgeText: {
    color: Theme.colors.text.primary,
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: '700',
  }
});

export default MovieCard; 