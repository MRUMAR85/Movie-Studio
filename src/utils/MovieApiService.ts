import { TMDB_API_BASE_URL, TMDB_API_KEY } from './Config';

// Types
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
  genre_ids: number[];
  genres?: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  tagline: string;
  budget: number;
  revenue: number;
  homepage: string;
  production_companies: Company[];
  videos: {
    results: Video[];
  };
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}

interface Company {
  id: number;
  logo_path: string | null;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
}

export interface CrewMember {
  id: number;
  name: string;
  profile_path: string | null;
  job: string;
  department: string;
}

// Sample mock data for offline development
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: null,
    backdrop_path: null,
    vote_average: 9.3,
    release_date: "1994-09-23",
    overview: "Two imprisoned men bond over several years, finding redemption through acts of decency.",
    genre_ids: [18, 80]
  },
  {
    id: 2,
    title: "The Godfather",
    poster_path: null,
    backdrop_path: null,
    vote_average: 9.2,
    release_date: "1972-03-14",
    overview: "The aging patriarch of an organized crime dynasty transfers control to his son.",
    genre_ids: [18, 80]
  },
  {
    id: 3,
    title: "Inception",
    poster_path: null,
    backdrop_path: null,
    vote_average: 8.8,
    release_date: "2010-07-16",
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.",
    genre_ids: [28, 878]
  }
];

// Sample movie details
const mockMovieDetails: MovieDetails = {
  id: 1,
  title: "The Shawshank Redemption",
  poster_path: null,
  backdrop_path: null,
  vote_average: 9.3,
  release_date: "1994-09-23",
  overview: "Two imprisoned men bond over several years, finding redemption through acts of decency.",
  genre_ids: [18, 80],
  runtime: 142,
  genres: [
    { id: 18, name: "Drama" },
    { id: 80, name: "Crime" }
  ],
  tagline: "Fear can hold you prisoner. Hope can set you free.",
  budget: 25000000,
  revenue: 28341469,
  homepage: "",
  production_companies: [
    { id: 1, name: "Castle Rock Entertainment", logo_path: null }
  ],
  videos: {
    results: [
      {
        id: "1",
        key: "PLl99DlL6b4",
        name: "Trailer",
        site: "YouTube",
        type: "Trailer"
      }
    ]
  },
  credits: {
    cast: [
      {
        id: 1,
        name: "Tim Robbins",
        profile_path: null,
        character: "Andy Dufresne"
      },
      {
        id: 2,
        name: "Morgan Freeman",
        profile_path: null,
        character: "Ellis Boyd 'Red' Redding"
      }
    ],
    crew: [
      {
        id: 1,
        name: "Frank Darabont",
        profile_path: null,
        job: "Director",
        department: "Directing"
      }
    ]
  }
};

// Mock genres
const mockGenres: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

// API Service
class MovieApiService {
  // Flag to determine if we should use mocks
  private useMocks: boolean = true; // Always use mocks since the API is returning 401 errors

  constructor() {
    // Log mock data usage
    console.log('Using mock movie data for all API calls');
  }

  // Get popular movies
  async getPopularMovies(page = 1): Promise<Movie[]> {
    try {
      if (this.useMocks) return mockMovies;
      
      const response = await fetch(
        `${TMDB_API_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return mockMovies; // Fallback to mock data
    }
  }

  // Get trending movies
  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<Movie[]> {
    try {
      if (this.useMocks) return mockMovies;
      
      const response = await fetch(
        `${TMDB_API_BASE_URL}/trending/movie/${timeWindow}?api_key=${TMDB_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      return mockMovies; // Fallback to mock data
    }
  }

  // Get movie details by ID
  async getMovieDetails(movieId: number): Promise<MovieDetails | null> {
    try {
      if (this.useMocks) return { ...mockMovieDetails, id: movieId };
      
      const response = await fetch(
        `${TMDB_API_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      // Ensure required properties exist to avoid potential errors
      return {
        ...data,
        videos: data.videos || { results: [] },
        credits: data.credits || { cast: [], crew: [] }
      };
    } catch (error) {
      console.error(`Error fetching movie details for movie ID ${movieId}:`, error);
      return { ...mockMovieDetails, id: movieId }; // Return mock with requested ID
    }
  }

  // Search movies
  async searchMovies(query: string, page = 1): Promise<Movie[]> {
    try {
      if (this.useMocks) return mockMovies;
      
      const response = await fetch(
        `${TMDB_API_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error searching movies:', error);
      return mockMovies; // Fallback to mock data
    }
  }

  // Get movies by genre
  async getMoviesByGenre(genreId: number, page = 1): Promise<Movie[]> {
    try {
      if (this.useMocks) return mockMovies;
      
      const response = await fetch(
        `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error(`Error fetching movies for genre ID ${genreId}:`, error);
      return mockMovies; // Fallback to mock data
    }
  }

  // Get all available genres
  async getGenres(): Promise<Genre[]> {
    try {
      if (this.useMocks) return mockGenres;
      
      const response = await fetch(
        `${TMDB_API_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.genres || [];
    } catch (error) {
      console.error('Error fetching genres:', error);
      return mockGenres; // Fallback to mock data
    }
  }

  // Get newest releases
  async getNewReleases(page = 1): Promise<Movie[]> {
    try {
      if (this.useMocks) return mockMovies;
      
      const date = new Date();
      const currentDate = date.toISOString().split('T')[0];
      date.setMonth(date.getMonth() - 2);
      const twoMonthsAgo = date.toISOString().split('T')[0];

      const response = await fetch(
        `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&sort_by=release_date.desc&primary_release_date.gte=${twoMonthsAgo}&primary_release_date.lte=${currentDate}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching new releases:', error);
      return mockMovies; // Fallback to mock data
    }
  }
}

export default new MovieApiService(); 