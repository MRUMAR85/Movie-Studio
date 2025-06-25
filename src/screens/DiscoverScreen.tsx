import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import PlaceholderImage from '../components/PlaceholderImage';
import MovieApiService, { Movie, Genre } from '../utils/MovieApiService';

const DiscoverScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle search
  useEffect(() => {
    if (debouncedQuery) {
      handleSearch();
    } else if (selectedGenreId) {
      fetchMoviesByGenre(selectedGenreId);
    } else {
      fetchPopularMovies();
    }
  }, [debouncedQuery, selectedGenreId]);
  
  // Initial fetch of genres and popular movies
  useEffect(() => {
    fetchGenres();
    fetchPopularMovies();
  }, []);
  
  const fetchGenres = async () => {
    try {
      const genresData = await MovieApiService.getGenres();
      // Add "All" option at the beginning
      setGenres([{ id: 0, name: 'All' }, ...genresData]);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };
  
  const fetchPopularMovies = async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      const popularMovies = await MovieApiService.getPopularMovies();
      setMovies(popularMovies);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchMoviesByGenre = async (genreId: number) => {
    if (genreId === 0) {
      fetchPopularMovies();
      return;
    }
    
    try {
      setIsLoading(true);
      setHasError(false);
      const genreMovies = await MovieApiService.getMoviesByGenre(genreId);
      setMovies(genreMovies);
    } catch (error) {
      console.error(`Error fetching movies for genre ${genreId}:`, error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = async () => {
    if (!debouncedQuery.trim()) return;
    
    try {
      setIsSearching(true);
      setIsLoading(true);
      setHasError(false);
      const searchResults = await MovieApiService.searchMovies(debouncedQuery);
      setMovies(searchResults);
    } catch (error) {
      console.error('Error searching movies:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGenreSelect = (genreId: number) => {
    setSelectedGenreId(genreId);
    setSearchQuery('');
    setIsSearching(false);
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <PlaceholderImage
            width={20}
            height={20}
            text="🔍"
            backgroundColor="transparent"
            color="#8E8E93"
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies, shows..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => {
                setSearchQuery('');
                setIsSearching(false);
              }}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      
      {/* Genre Selection */}
      {!isSearching && (
        <View style={styles.genreContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.genreScroll}
          >
            {genres.map(genre => (
              <TouchableOpacity
                key={genre.id}
                style={[
                  styles.genreButton,
                  selectedGenreId === genre.id && styles.selectedGenre
                ]}
                onPress={() => handleGenreSelect(genre.id)}
              >
                <Text 
                  style={[
                    styles.genreText,
                    selectedGenreId === genre.id && styles.selectedGenreText
                  ]}
                >
                  {genre.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      {/* Movies Grid */}
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ff3b30" />
        </View>
      ) : hasError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load movies</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {
              if (debouncedQuery) {
                handleSearch();
              } else if (selectedGenreId) {
                fetchMoviesByGenre(selectedGenreId);
              } else {
                fetchPopularMovies();
              }
            }}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : movies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {isSearching ? 'No results found for your search' : 'No movies available for this category'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.moviesGrid}
          columnWrapperStyle={styles.movieRow}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.movieCard}
              onPress={() => navigation.navigate('Detail', { id: item.id.toString() })}
            >
              <PlaceholderImage
                width={'100%' as any}
                height={220}
                text={item.title}
                backgroundColor="#282833"
                style={{ borderRadius: 16, width: '100%', marginBottom: 10 }}
              />
              <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
              
              <View style={styles.movieMeta}>
                <Text style={styles.movieYear}>
                  {item.release_date ? item.release_date.split('-')[0] : 'N/A'}
                </Text>
                <View style={styles.ratingContainer}>
                  <PlaceholderImage
                    width={14}
                    height={14}
                    text="★"
                    backgroundColor="transparent"
                    color="#FFCC00"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.ratingText}>{item.vote_average.toFixed(1)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282833',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: '#8E8E93',
    fontSize: 16,
  },
  genreContainer: {
    marginBottom: 24,
  },
  genreScroll: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  genreButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#282833',
    marginRight: 12,
  },
  selectedGenre: {
    backgroundColor: '#ff3b30',
  },
  genreText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedGenreText: {
    fontWeight: '700',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
  },
  moviesGrid: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  movieRow: {
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  movieCard: {
    width: '48%',
  },
  movieTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  movieMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieYear: {
    color: '#8E8E93',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default DiscoverScreen; 