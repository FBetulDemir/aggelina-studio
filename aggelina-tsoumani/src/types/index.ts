export interface Artwork {
  id: number;
  title: string;
  medium: string;
  year: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  price: number;
  isUpcoming: boolean;
}
