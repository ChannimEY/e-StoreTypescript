import { Product } from '../types/product';
import { ApiService } from '../services/fetchApi';
import { ProductCard } from '../components/card';
import { LoadingSpinner } from '../components/loading';
import { ErrorMessage } from '../components/errorHandle';

export class ProductsPage {
  private products: Product[] = [];
  private filteredProducts: Product[] = [];
  private categories: string[] = [];
  private currentCategory = 'all';
  private currentSort = 'default';
  private searchQuery = '';
  private loading = true;
  private error: string | null = null;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    await this.loadData();
    this.render();
    this.addEventListeners();
  }

  private async loadData(): Promise<void> {
    try {
      this.loading = true;
      this.error = null;

      const [productsData, categoriesData] = await Promise.all([
        ApiService.fetchProducts(),
        ApiService.fetchCategories()
      ]);

      this.products = productsData;
      this.filteredProducts = [...this.products];
      this.categories = categoriesData;
      this.loading = false;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'An unexpected error occurred';
      this.loading = false;
    }
  }

  private render(): void {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div class="container mx-auto px-4 py-8">
          <div class="mb-8 text-center">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              All Products
            </h1>
          </div>

          ${this.loading ? this.renderLoading() : ''}
          ${this.error ? this.renderError() : ''}
          ${!this.loading && !this.error ? this.renderContent() : ''}
        </div>
      </div>
    `;

    this.addEventListeners();
  }

  private renderLoading(): string {
    return `
      <div class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${Array(8).fill(0).map(() => ProductCard.renderSkeleton()).join('')}
        </div>
      </div>
    `;
  }

  private renderError(): string {
    return ErrorMessage.render(this.error!, () => {
      this.loadData().then(() => this.render());
    });
  }

  private renderContent(): string {
    return `
      <!-- Filters and Search -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div class="flex flex-col sm:flex-row gap-4 flex-1">
            <!-- Search -->
            <div class="relative flex-1 max-w-md">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                id="search-input"
                type="text"
                placeholder="Search for products..."
                value="${this.searchQuery}"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <!-- Category Filter -->
            <select
              id="category-filter"
              class="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              ${this.categories.map(category => `
                <option value="${category}" ${this.currentCategory === category ? 'selected' : ''}>
                  ${category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              `).join('')}
            </select>
          </div>

          <div class="flex items-center gap-4">
            <!-- Sort -->
            <select
              id="sort-filter"
              class="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="default">Default</option>
              <option value="price-low" ${this.currentSort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price-high" ${this.currentSort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
              <option value="rating" ${this.currentSort === 'rating' ? 'selected' : ''}>Highest Rated</option>
              <option value="name" ${this.currentSort === 'name' ? 'selected' : ''}>Name A-Z</option>
            </select>

            <!-- Results Count -->
            <span class="text-gray-600 dark:text-gray-300 whitespace-nowrap">
              ${this.filteredProducts.length} products
            </span>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        ${this.filteredProducts.length > 0
          ? this.filteredProducts.map(product => ProductCard.render(product)).join('')
          : this.renderNoResults()
        }
      </div>
    `;
  }

  private renderNoResults(): string {
    return `
      <div class="col-span-full text-center py-12">
        <div class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">Try adjusting your search or filter criteria</p>
        <button id="clear-filters" class="btn-primary">Clear Filters</button>
      </div>
    `;
  }

  private addEventListeners(): void {
    // Search input
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = (e.target as HTMLInputElement).value;
        this.applyFilters();
      });
    }

    // Category filter
    const categoryFilter = document.getElementById('category-filter') as HTMLSelectElement;
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.currentCategory = (e.target as HTMLSelectElement).value;
        this.applyFilters();
      });
    }

    // Sort filter
    const sortFilter = document.getElementById('sort-filter') as HTMLSelectElement;
    if (sortFilter) {
      sortFilter.addEventListener('change', (e) => {
        this.currentSort = (e.target as HTMLSelectElement).value;
        this.applyFilters();
      });
    }

    // Clear filters
    const clearFilters = document.getElementById('clear-filters');
    if (clearFilters) {
      clearFilters.addEventListener('click', () => {
        this.clearFilters();
      });
    }

    // Error retry
    if (this.error) {
      ErrorMessage.addRetryListener(() => {
        this.loadData().then(() => this.render());
      });
    }
  }

  private applyFilters(): void {
    let filtered = [...this.products];

    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(product => product.category === this.currentCategory);
    }

    // Apply sorting
    switch (this.currentSort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    this.filteredProducts = filtered;
    this.updateProductsGrid();
  }

  private updateProductsGrid(): void {
    const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.xl\\:grid-cols-4');
    if (grid) {
      grid.innerHTML = this.filteredProducts.length > 0
        ? this.filteredProducts.map(product => ProductCard.render(product)).join('')
        : this.renderNoResults();

      // Re-add event listeners for new content
      this.addEventListeners();
    }

    // Update results count
    const resultsCount = document.querySelector('.text-gray-600.dark\\:text-gray-300.whitespace-nowrap');
    if (resultsCount) {
      resultsCount.textContent = `${this.filteredProducts.length} products`;
    }
  }

  private clearFilters(): void {
    this.searchQuery = '';
    this.currentCategory = 'all';
    this.currentSort = 'default';
    this.filteredProducts = [...this.products];
    this.render();
  }

  static render(): void {
    new ProductsPage();
  }
}
