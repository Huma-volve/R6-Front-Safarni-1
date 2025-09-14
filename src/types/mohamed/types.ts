// Tour and Travel Types
export interface Tour {
    id: number;
    category_id: number;
    title: string;
    location: string;
    description: string;
    price: string;
    image: string;
    views?: number;
    rating?: number;
    is_recommended: number;
    duration: number;
    max_group_size: number;
    min_age: number;
    difficulty_level: string;
    highlights: string[];
    guide: string;
    transportation: string;
    included_services: string[];
    excluded_services: string[];
    what_to_bring: string[];
    cancellation_policy: string;
    created_at: string;
    updated_at: string;
    is_favorite?: boolean | null;
  }
  
  export interface TourCardProps {
    tour: Tour;
    onSelect?: (tour: Tour) => void;
    onAddToCompare?: (tour: Tour) => void;
    onAddToFavorites?: (tour: Tour) => void;
    showActions?: boolean;
  }