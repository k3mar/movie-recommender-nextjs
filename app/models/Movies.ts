export interface UserRequest {
  request_id: string;
  prompt: string;
}

export interface RecommendationResponse {
  request_id: string;
  response_id: string;
  recommendation_count: number;
  overall_reason: string;
  recommendations: Movie[];
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface VideoItem {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Videos {
  results: VideoItem[];
}

export interface Images {
  backdrops: Record<string, any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  logos: Record<string, any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  posters: Record<string, any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface TMDBMovie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[] | null;
  production_countries: ProductionCountry[] | null;
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos | null;
  images: Images | null;
}

export interface Movie {
  title: string;
  year: number;
  lead_actors: string[];
  tmdb_metadata: TMDBMovie | null;
}
