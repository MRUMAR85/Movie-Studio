import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PlaceholderImage from '../components/PlaceholderImage';
import MovieCard from '../components/MovieCard';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Theme from '../utils/Theme';
import MovieApiService, { Movie } from '../utils/MovieApiService';

// Interface for our categorized movie lists
interface MovieCategory {
  id: string;
  title: string;
  movies: Movie[];
  isLoading: boolean;
  hasError: boolean;
}

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredContent, setFeaturedContent] = useState<Movie | null>(null);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [categories, setCategories] = useState<MovieCategory[]>([
    {
      id: 'trending',
      title: 'Trending Now',
      movies: [],
      isLoading: true,
      hasError: false
    },
    {
      id: 'popular',
      title: 'Popular Movies',
      movies: [],
      isLoading: true,
      hasError: false
    },
    {
      id: 'new',
      title: 'New Releases',
      movies: [],
      isLoading: true,
      hasError: false
    }
  ]);

  useEffect(() => {
    // Fetch featured content (using trending as featured)
    const fetchFeaturedContent = async () => {
      try {
        const trending = await MovieApiService.getTrendingMovies('day');
        if (trending && trending.length > 0) {
          setFeaturedContent(trending[0]);
        }
      } catch (error) {
        console.error('Error fetching featured content:', error);
      } finally {
        setFeaturedLoading(false);
      }
    };

    // Fetch trending movies
    const fetchTrendingMovies = async () => {
      try {
        const trending = await MovieApiService.getTrendingMovies();
        updateCategoryMovies('trending', trending);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        updateCategoryError('trending');
      }
    };

    // Fetch popular movies
    const fetchPopularMovies = async () => {
      try {
        const popular = await MovieApiService.getPopularMovies();
        updateCategoryMovies('popular', popular);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        updateCategoryError('popular');
      }
    };

    // Fetch new releases
    const fetchNewReleases = async () => {
      try {
        const newReleases = await MovieApiService.getNewReleases();
        updateCategoryMovies('new', newReleases);
      } catch (error) {
        console.error('Error fetching new releases:', error);
        updateCategoryError('new');
      }
    };

    fetchFeaturedContent();
    fetchTrendingMovies();
    fetchPopularMovies();
    fetchNewReleases();
  }, []);

  // Helper to update movies for a category
  const updateCategoryMovies = (categoryId: string, movies: Movie[]) => {
    setCategories(prevCategories => 
      prevCategories.map(category => 
        category.id === categoryId 
          ? { ...category, movies, isLoading: false, hasError: false }
          : category
      )
    );
  };

  // Helper to update error state for a category
  const updateCategoryError = (categoryId: string) => {
    setCategories(prevCategories => 
      prevCategories.map(category => 
        category.id === categoryId 
          ? { ...category, isLoading: false, hasError: true }
          : category
      )
    );
  };

  // Handle search submission
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // @ts-ignore - This is a valid navigation despite the TypeScript error
      navigation.navigate('DiscoverTab');
    }
  };

  // Render movie category section
  const renderCategorySection = (category: MovieCategory) => {
    return (
      <View key={category.id} style={styles.categorySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{category.title}</Text>
          <TouchableOpacity onPress={() => {
            // @ts-ignore - This is a valid navigation despite the TypeScript error
            navigation.navigate('DiscoverTab');
          }}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {category.isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color="#ff3b30" />
          </View>
        ) : category.hasError ? (
          <View style={styles.errorView}>
            <Text style={styles.errorMessage}>Failed to load movies</Text>
            <Button 
              title="Retry"
              onPress={() => {
                // Mark as loading again
                setCategories(prev => 
                  prev.map(c => c.id === category.id ? {...c, isLoading: true, hasError: false} : c)
                );
                
                // Re-fetch data based on category
                if (category.id === 'trending') {
                  MovieApiService.getTrendingMovies()
                    .then(movies => updateCategoryMovies(category.id, movies))
                    .catch(() => updateCategoryError(category.id));
                } else if (category.id === 'popular') {
                  MovieApiService.getPopularMovies()
                    .then(movies => updateCategoryMovies(category.id, movies))
                    .catch(() => updateCategoryError(category.id));
                } else if (category.id === 'new') {
                  MovieApiService.getNewReleases()
                    .then(movies => updateCategoryMovies(category.id, movies))
                    .catch(() => updateCategoryError(category.id));
                }
              }}
              size="small"
            />
          </View>
        ) : (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.movieList}
          >
            {Array.isArray(category.movies) && category.movies.slice(0, 10).map(movie => (
              <MovieCard
                key={movie.id.toString()}
                id={movie.id.toString()}
                title={movie.title}
                posterUrl={movie.poster_path || undefined}
                rating={movie.vote_average}
                year={movie.release_date ? movie.release_date.split('-')[0] : ''}
                style={styles.movieCard}
                type="vertical"
              />
            ))}
          </ScrollView>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <PlaceholderImage
            width={44}
            height={44}
            text="M"
            backgroundColor={Theme.colors.primary}
            style={{ borderRadius: Theme.borderRadius.base }}
          />
          <Text style={styles.logo}>MovieHub</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <PlaceholderImage
            width={44}
            height={44}
            text="🔔"
            backgroundColor={Theme.colors.background.tertiary}
            style={{ borderRadius: 22 }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Welcome Text */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Hello, Smith!</Text>
          <Text style={styles.subtitleText}>Let's stream your favorite movie</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <PlaceholderImage
              width={20}
              height={20}
              text="🔍"
              backgroundColor="transparent"
              color={Theme.colors.text.tertiary}
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search movies, shows..."
              placeholderTextColor={Theme.colors.text.tertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Featured Content Banner */}
        {featuredLoading ? (
          <View style={styles.featuredLoading}>
            <ActivityIndicator size="large" color="#ff3b30" />
          </View>
        ) : featuredContent ? (
          <MovieCard
            id={featuredContent?.id?.toString() || '0'}
            title={featuredContent?.title || 'Featured Movie'}
            year={featuredContent?.release_date ? featuredContent.release_date.split('-')[0] : ''}
            rating={featuredContent?.vote_average || 0}
            type="featured"
          />
        ) : (
          <View style={styles.noFeaturedContent}>
            <Text style={styles.noContentText}>No featured content available</Text>
          </View>
        )}

        {/* Categories */}
        {categories.map(renderCategorySection)}
        
        {/* Subscription Banner */}
        <View style={styles.subscriptionBanner}>
          <Text style={styles.bannerTitle}>Upgrade your experience</Text>
          <Text style={styles.bannerDescription}>
            Get unlimited access to all content, ad-free viewing, and exclusive releases
          </Text>
          <Button 
            title="Explore Premium Plans" 
            onPress={() => navigation.navigate('Subscription')}
            variant="primary"
            size="medium"
            fullWidth={true}
            style={styles.upgradeButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.primary,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.base,
    paddingVertical: Theme.spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    color: Theme.colors.text.primary,
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: '700',
    marginLeft: Theme.spacing.md,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  welcomeSection: {
    paddingHorizontal: Theme.spacing.base,
    marginBottom: Theme.spacing.xl,
  },
  welcomeText: {
    color: Theme.colors.text.primary,
    fontSize: Theme.typography.fontSize['2xl'],
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitleText: {
    color: Theme.colors.text.tertiary,
    fontSize: Theme.typography.fontSize.base,
  },
  searchContainer: {
    paddingHorizontal: Theme.spacing.base,
    marginBottom: Theme.spacing.xl,
  },
  searchBar: {
    backgroundColor: Theme.colors.background.tertiary,
    borderRadius: Theme.borderRadius.base,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.base,
  },
  searchInput: {
    flex: 1,
    color: Theme.colors.text.primary,
    fontSize: Theme.typography.fontSize.base,
  },
  categorySection: {
    marginBottom: Theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.base,
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    color: Theme.colors.text.primary,
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: '600',
  },
  seeAllText: {
    color: Theme.colors.primary,
    fontSize: Theme.typography.fontSize.md,
  },
  movieList: {
    paddingLeft: Theme.spacing.base,
  },
  movieCard: {
    marginRight: 12,
  },
  loadingIndicator: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorView: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.base,
  },
  errorMessage: {
    color: Theme.colors.text.tertiary,
    marginBottom: Theme.spacing.md,
  },
  subscriptionBanner: {
    margin: Theme.spacing.base,
    padding: Theme.spacing.xl,
    backgroundColor: Theme.colors.background.tertiary,
    borderRadius: Theme.borderRadius.lg,
    marginTop: Theme.spacing.md,
  },
  bannerTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: '700',
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.sm,
  },
  bannerDescription: {
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.text.tertiary,
    marginBottom: Theme.spacing.lg,
  },
  upgradeButton: {
    marginTop: Theme.spacing.md,
  },
  featuredLoading: {
    height: 220,
    backgroundColor: Theme.colors.background.tertiary,
    borderRadius: Theme.borderRadius.lg,
    marginHorizontal: Theme.spacing.base,
    marginBottom: Theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFeaturedContent: {
    height: 220,
    backgroundColor: Theme.colors.background.tertiary,
    borderRadius: Theme.borderRadius.lg,
    marginHorizontal: Theme.spacing.base,
    marginBottom: Theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContentText: {
    color: Theme.colors.text.tertiary,
    fontSize: Theme.typography.fontSize.lg,
  },
});

export default HomeScreen; 