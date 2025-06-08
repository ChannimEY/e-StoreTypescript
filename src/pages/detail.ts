import { Product } from '../types/product';
import { ApiService } from '../services/fetchApi';
import { LoadingSpinner } from '../components/loading';
import { ErrorMessage } from '../components/errorHandle';
import { GoToTop } from '../components/goToTop';
import { ProductCard } from '../components/card';

export class ProductDetailPage {
  private product: Product | null = null;
  private loading = true;
  private error: string | null = null;
  private productId: number;
  private relatedProducts: Product[] = [];

  constructor(productId: number) {
    this.productId = productId;
  }

  async init(): Promise<void> {
    await this.loadProduct();
  }

  private async loadProduct(): Promise<void> {
    try {
      this.loading = true;
      this.error = null;
      this.product = await ApiService.fetchProduct(this.productId);
      // Fetch related products in the same category
      if (this.product) {
        const all = await ApiService.fetchProducts(`?category=${encodeURIComponent(this.product.category)}`);
        this.relatedProducts = all.filter(p => p.id !== this.productId).slice(0, 4);
      }
      this.loading = false;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'An unexpected error occurred';
      this.loading = false;
    }
  }

  async render(productId: number): Promise<string> {
    this.productId = productId;
    await this.loadProduct();

    return `
      <main class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div class="container mx-auto px-4 py-12">
          ${this.loading ? LoadingSpinner.render() : ''}
          ${this.error ? ErrorMessage.render(this.error, () => this.loadProduct()) : ''}
          ${!this.loading && !this.error && this.product ? this.renderProduct() : ''}
        </div>
      </main>
      ${GoToTop.render()}
    `;
  }

  private renderProduct(): string {
    if (!this.product) return '';

    return `
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <!-- Product Image -->
          <div class="relative group bg-white/70 dark:bg-gray-900/70 rounded-3xl shadow-2xl p-8 flex items-center justify-center min-h-[400px]">
            <img
              src="${this.product.image}"
              alt="${this.product.title}"
              class="w-full max-h-[400px] object-contain rounded-2xl drop-shadow-xl transition-transform duration-500 group-hover:scale-105 bg-white dark:bg-gray-800"
            />
            <div class="absolute top-6 left-6">
              <span class="inline-block px-4 py-2 text-xs font-semibold bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full shadow">${this.product.category}</span>
            </div>
            <div class="absolute top-6 right-6">
              <span class="inline-block px-4 py-2 text-xs font-semibold bg-red-100 text-red-600 rounded-full shadow">New</span>
            </div>
          </div>

          <!-- Product Info -->
          <div class="relative z-10">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">${this.product.title}</h1>
            <div class="flex items-center gap-4 mb-6">
              <div class="flex items-center">
                ${this.renderStars(this.product.rating.rate)}
                <span class="ml-2 text-lg font-medium text-gray-900 dark:text-white">${this.product.rating.rate.toFixed(1)}</span>
              </div>
              <span class="text-gray-600 dark:text-gray-400">(${this.product.rating.count} reviews)</span>
            </div>
            <div class="flex items-center gap-6 mb-8">
              <span class="text-4xl font-bold text-primary-600 dark:text-primary-400 drop-shadow">$${this.product.price.toFixed(2)}</span>
              <span class="inline-block px-4 py-2 text-xs font-semibold bg-green-100 text-green-700 rounded-full shadow">In Stock</span>
            </div>
            <div class="prose dark:prose-invert max-w-none mb-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">${this.product.description}</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 mb-8">
              <button class="flex-1 py-4 px-8 bg-primary-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-primary-700 transition-all flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                </svg>
                Add to Cart
              </button>
              <button class="flex-1 py-4 px-8 bg-white dark:bg-gray-800 border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 rounded-full font-semibold text-lg shadow-lg hover:bg-primary-50 dark:hover:bg-primary-900 transition-all flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                Add to Wishlist
              </button>
            </div>
            <div class="bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span class="text-gray-700 dark:text-gray-300">Free Shipping</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span class="text-gray-700 dark:text-gray-300">30-Day Returns</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span class="text-gray-700 dark:text-gray-300">Quality Guaranteed</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span class="text-gray-700 dark:text-gray-300">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Related Products Section -->
        ${this.relatedProducts.length > 0 ? `
        <div class="mt-16">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Products</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            ${this.relatedProducts.map(product => ProductCard.render(product)).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    `;
  }

  private renderStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars += '<svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }

    // Half star
    if (hasHalfStar) {
      stars += '<svg class="w-5 h-5 text-yellow-400" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars += '<svg class="w-5 h-5 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }

    return stars;
  }
}
