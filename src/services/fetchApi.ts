import { Product } from '../types/product';

export class ApiService {
  private static BASE_URL = 'https://fakestoreapi.in';

  static async fetchProducts(params: string = ''): Promise<Product[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/products${params}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
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
        throw new Error(`Failed to fetch product ${id}: ${response.statusText}`);
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
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  static async fetchProductsByCategory(category: string, sort?: string): Promise<Product[]> {
    try {
      let url = `${this.BASE_URL}/products/category?type=${encodeURIComponent(category)}`;
      if (sort) {
        url += `&sort=${encodeURIComponent(sort)}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch products for category ${category}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  }

  // You can add POST, PUT, PATCH, DELETE methods here as needed
}