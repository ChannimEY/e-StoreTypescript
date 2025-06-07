import { Product } from '../types/product';

export class ApiService {
  private static BASE_URL = 'https://fakestoreapi.in/api';

  static async fetchProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async fetchProduct(id: number): Promise<Product> {
    try {
      const response = await fetch(`${this.BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product ${id}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  static async fetchCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/products/category`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  static async fetchProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/products/category?type=${category}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products for category ${category}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  }
}