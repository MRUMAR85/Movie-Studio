import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import PlaceholderImage from '../components/PlaceholderImage';
import MovieApiService, { MovieDetails } from '../utils/MovieApiService';

// Default format for duration
const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Format genre names from array
const formatGenres = (genres: {id: number, name: string}[]): string => {
  return genres.map(genre => genre.name).join(', ');
};

const DetailScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const movieId = route.params?.id;
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) {
        setHasError(true);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setHasError(false);
        const details = await MovieApiService.getMovieDetails(parseInt(movieId));
        if (details) {
          setMovieDetails(details);
        } else {
          setHasError(true);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleRetry = () => {
    if (movieId) {
      setIsLoading(true);
      setHasError(false);
      MovieApiService.getMovieDetails(parseInt(movieId))
        .then(details => {
          if (details) {
            setMovieDetails(details);
          } else {
            setHasError(true);
          }
        })
        .catch(error => {
          console.error('Error retrying movie details fetch:', error);
          setHasError(true);
        })
        .finally(() => setIsLoading(false));
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#ff3b30" />
      </View>
    );
  }

  if (hasError || !movieDetails) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>Failed to load movie details</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.backToHomeButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.backToHomeText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const director = movieDetails.credits?.crew?.find(person => person.job === 'Director');
  const cast = movieDetails.credits?.cast ? movieDetails.credits.cast.slice(0, 8) : [];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header with back button and bookmark */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <PlaceholderImage
            width={24}
            height={24}
            text="←"
            backgroundColor="transparent"
            color="white"
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.bookmarkButton}
          onPress={() => setIsBookmarked(!isBookmarked)}
        >
          <PlaceholderImage
            width={24}
            height={24}
            text={isBookmarked ? "★" : "☆"}
            backgroundColor="transparent"
            color={isBookmarked ? "#FFCC00" : "white"}
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Movie Poster/Banner */}
        <View style={styles.posterContainer}>
          <PlaceholderImage
            width={'100%' as any}
            height={280}
            text={movieDetails.title}
            backgroundColor="#8B4513"
            style={{ width: '100%' }}
          />
          <View style={styles.gradientOverlay} />
        </View>
        
        {/* Movie Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movieDetails.title}</Text>
          
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>
              {movieDetails.release_date ? new Date(movieDetails.release_date).getFullYear() : 'N/A'}
            </Text>
            <View style={styles.dot} />
            <Text style={styles.metaText}>
              {movieDetails.runtime ? formatRuntime(movieDetails.runtime) : 'N/A'}
            </Text>
            <View style={styles.dot} />
            <Text style={styles.metaText}>
              {movieDetails.genres?.length ? formatGenres(movieDetails.genres) : 'N/A'}
            </Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <PlaceholderImage
              width={16}
              height={16}
              text="★"
              backgroundColor="transparent"
              color="#FFCC00"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.ratingText}>{movieDetails.vote_average.toFixed(1)}</Text>
            <Text style={styles.ratingTotal}>/10 IMDb</Text>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.playButton}>
            <PlaceholderImage
              width={20}
              height={20}
              text="▶"
              backgroundColor="transparent"
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.playText}>Play</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.downloadButton}>
            <PlaceholderImage
              width={20}
              height={20}
              text="↓"
              backgroundColor="transparent"
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.downloadText}>Download</Text>
          </TouchableOpacity>
        </View>
        
        {/* Description */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Story Line</Text>
          <Text style={styles.description}>{movieDetails.overview || 'No description available.'}</Text>
        </View>
        
        {/* Cast */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cast & Crew</Text>
          {director && <Text style={styles.directorText}>Director: {director.name}</Text>}
          
          {cast.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.castList}>
              {cast.map(person => (
                <View key={person.id} style={styles.castItem}>
                  <PlaceholderImage
                    width={80}
                    height={80}
                    text={person.name.charAt(0)}
                    backgroundColor="#4682B4"
                    style={{ borderRadius: 40, marginBottom: 8 }}
                  />
                  <Text style={styles.castName}>{person.name}</Text>
                  <Text style={styles.castRole}>{person.character}</Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noDataText}>No cast information available</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  backToHomeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backToHomeText: {
    color: '#CCCCCC',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(40, 40, 51, 0.7)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(40, 40, 51, 0.7)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterContainer: {
    position: 'relative',
    height: 280,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(15, 15, 26, 0.9)',
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaText: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#666',
    marginHorizontal: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingTotal: {
    color: '#999',
    fontSize: 14,
    marginLeft: 2,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    height: 50,
    flex: 2,
    marginRight: 10,
  },
  playText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282833',
    borderRadius: 8,
    height: 50,
    flex: 1,
  },
  downloadText: {
    color: 'white',
    fontSize: 16,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    color: '#CCCCCC',
    lineHeight: 22,
  },
  directorText: {
    color: '#CCCCCC',
    marginBottom: 16,
  },
  castList: {
    marginTop: 16,
  },
  castItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 90,
  },
  castName: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  castRole: {
    color: '#CCCCCC',
    fontSize: 12,
    textAlign: 'center',
  },
  relatedList: {
    marginTop: 16,
  },
  relatedItem: {
    marginRight: 16,
    width: 120,
  },
  relatedTitle: {
    color: 'white',
    fontSize: 14,
  },
  lastSection: {
    marginBottom: 40,
  },
  noDataText: {
    color: '#CCCCCC',
    fontStyle: 'italic',
    marginTop: 10,
  }
});

export default DetailScreen;
