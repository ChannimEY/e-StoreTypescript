export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface ApiError {
  message: string;
  status: number;
}