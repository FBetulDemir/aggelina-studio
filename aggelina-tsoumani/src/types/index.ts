export interface Artwork {
  id: string;
  title: string;
  medium: string;
  year: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  price: number;
  isUpcoming: boolean;
}
