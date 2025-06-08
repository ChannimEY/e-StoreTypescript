import { Product } from '../types/product';
import { ApiService } from '../services/fetchApi';
import { ProductCard } from '../components/card';
import { LoadingSpinner } from '../components/loading';
import { ErrorMessage } from '../components/errorHandle';
import { GoToTop } from '../components/goToTop';

export class ProductsPage {
  private products: Product[] = [];
  private filteredProducts: Product[] = [];
  private categories: string[] = [];
  private currentCategory = 'all';
  private currentSort = 'default';
  private searchQuery = '';
  private loading = true;
  private error: string | null = null;
  private currentPrice = 1000;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    await this.loadData();
    this.render();
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
      <!-- Page Header with Breadcrumb -->
      <div class="bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 mb-8">
        <div class="container mx-auto flex flex-col justify-center items-center gap-2">
          <nav class="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <a href="/" class="hover:text-primary-500">Home</a>
            <span class="mx-2">&gt;</span>
            <span>Products</span>
          </nav>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Products</h1>
        </div>
      </div>
      <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div class="container mx-auto px-4 py-12">
          <div class="flex flex-col md:flex-row gap-12">
            <!-- Sidebar -->
            <aside class="w-full md:w-1/4 mb-8 md:mb-0">
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
                <div class="mb-6">
                  <div class="relative">
                    <input id="search-input" type="text" placeholder="Search Here" value="${this.searchQuery}" class="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                    <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div class="mb-8">
                  <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">Product Categories</h3>
                  <ul class="space-y-2" id="category-list">
                    <li>
                      <a href="#" data-category="all" class="${this.currentCategory === 'all' ? 'font-bold text-primary-500' : 'text-gray-700 dark:text-gray-300'} hover:text-primary-500 dark:hover:text-primary-400 transition-colors">All</a>
                    </li>
                    ${this.categories.map(category => `
                      <li>
                        <a href="#" data-category="${category}" class="${this.currentCategory === category ? 'font-bold text-primary-500' : 'text-gray-700 dark:text-gray-300'} hover:text-primary-500 dark:hover:text-primary-400 transition-colors">${category.charAt(0).toUpperCase() + category.slice(1)}</a>
                      </li>
                    `).join('')}
                  </ul>
                </div>
                <div class="mb-8">
                  <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">Choose Price</h3>
                  <div class="flex items-center gap-4">
                    <span class="text-gray-700 dark:text-gray-300" id="min-price">$1</span>
                    <input id="price-range" type="range" min="1" max="1000" value="${this.currentPrice}" class="flex-1 accent-primary-500" />
                    <span class="text-gray-700 dark:text-gray-300" id="current-price">$${this.currentPrice}</span>
                  </div>
                </div>
                <button id="filter-btn" class="w-full py-3 mt-4 bg-black text-white rounded-full font-semibold hover:bg-primary-600 transition">Filter</button>
              </div>
            </aside>

            <!-- Main Content -->
            <main class="flex-1">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <div>
                  <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Shop</h1>
                  <div class="text-gray-600 dark:text-gray-300">Showing 1-${this.filteredProducts.length} of ${this.products.length} results</div>
                </div>
                <div>
                  <select id="sort-filter" class="px-6 py-3 rounded-full bg-black text-white font-semibold focus:ring-2 focus:ring-primary-500">
                    <option value="popularity" ${this.currentSort === 'popularity' ? 'selected' : ''}>Sort by popularity</option>
                    <option value="price-low" ${this.currentSort === 'price-low' ? 'selected' : ''}>Sort by price: low to high</option>
                    <option value="price-high" ${this.currentSort === 'price-high' ? 'selected' : ''}>Sort by price: high to low</option>
                    <option value="rating" ${this.currentSort === 'rating' ? 'selected' : ''}>Sort by rating</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                ${this.filteredProducts.length > 0
                  ? this.filteredProducts.map(product => ProductCard.render(product)).join('')
                  : this.renderNoResults()
                }
              </div>
            </main>
          </div>
        </div>
      </div>
      ${GoToTop.render()}
    `;

    this.addEventListeners();
    GoToTop.init();
  }

  private renderLoading(): string {
    return `
      <div class="mb-8 animate-pulse">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

  private renderNoResults(): string {
    return `
      <div class="col-span-full text-center py-16">
        <div class="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-16 h-16 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">No products found</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          We couldn't find any products matching your criteria. Try adjusting your search or filter settings.
        </p>
        <button
          id="clear-filters"
          class="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-xl hover:from-primary-600 hover:to-primary-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Clear Filters
        </button>
      </div>
    `;
  }

  private addEventListeners(): void {
    // Search
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = searchInput.value;
        this.applyFilters();
      });
    }
    // Category
    const categoryList = document.getElementById('category-list');
    if (categoryList) {
      categoryList.querySelectorAll('a[data-category]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const category = (e.target as HTMLElement).getAttribute('data-category') || 'all';
          this.currentCategory = category;
          this.applyFilters();
        });
      });
    }
    // Price
    const priceRange = document.getElementById('price-range') as HTMLInputElement;
    const currentPriceLabel = document.getElementById('current-price');
    if (priceRange && currentPriceLabel) {
      priceRange.addEventListener('input', () => {
        this.currentPrice = parseInt(priceRange.value, 10);
        currentPriceLabel.textContent = `$${this.currentPrice}`;
        this.applyFilters();
      });
    }
    // Sort
    const sortFilter = document.getElementById('sort-filter') as HTMLSelectElement;
    if (sortFilter) {
      sortFilter.addEventListener('change', () => {
        this.currentSort = sortFilter.value;
        this.applyFilters();
      });
    }
    // Filter button (optional, can be used to trigger applyFilters)
    const filterBtn = document.getElementById('filter-btn');
    if (filterBtn) {
      filterBtn.addEventListener('click', () => {
        this.applyFilters();
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
    // Search
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    // Category
    if (this.currentCategory && this.currentCategory !== 'all') {
      filtered = filtered.filter(product => product.category === this.currentCategory);
    }
    // Price
    if (this.currentPrice) {
      filtered = filtered.filter(product => product.price <= this.currentPrice);
    }
    // Sort
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
      // Popularity can be by rating count or default order
      case 'popularity':
      default:
        filtered.sort((a, b) => b.rating.count - a.rating.count);
        break;
    }
    this.filteredProducts = filtered;
    this.render();
  }

  static render(): void {
    new ProductsPage();
  }
}
