// FlightData
export type FlightData = {
    id: number;
    airline: string;
    arrival_time: string;
    price: number;
    to: string;
    from: string;
    departure_time: string;
  };
  
  // CarData
  export type CarData = {
    id: number;
    seats: number;
    transmission: string;
    fuel_type: string;
    model: string;
    daily_rate: number;
  };
  
  // PersonalInfoData
  export type PersonalInfoData = {
    user: {
      name: string;
      email: string;
      phone: number;
      email_verified_at: string;
    };
  };
  
  // TourData
  export type TourData = {
    id: number;
    price: number;
  };
  
  // HotelData
  export type HotelData = {
    id: number;
    name: string;
    location: string;
    image: string;
    average_rating: number;
  };
  
  export type FavoriteItem = {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    price: string;
    rating: number;
    reviews: number;
    duration: string;
  };
  
  export type FavoriteData = {
      id: number,
      title : string,
      location : string,
      description : string,
      price : number,
      image : string,
      rating  :number,
      highlights : string,
      min_age : number
  };
  