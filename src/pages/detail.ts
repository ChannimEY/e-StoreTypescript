import { Product } from '../types/product';
import { ApiService } from '../services/fetchApi';
import { LoadingSpinner } from '../components/loading';
import { ErrorMessage } from '../components/errorHandle';

export class ProductDetailPage {
  private product: Product | null = null;
  private loading = true;
  private error: string | null = null;
  private productId: number;

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
      <main class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div class="container mx-auto px-4 py-8">
          ${this.loading ? LoadingSpinner.render() : ''}
          ${this.error ? ErrorMessage.render(this.error, () => this.loadProduct()) : ''}
          ${!this.loading && !this.error && this.product ? this.renderProduct() : ''}
        </div>
      </main>
    `;
  }

  private renderProduct(): string {
    if (!this.product) return '';

    const discount = this.product.discount || 0;
    const originalPrice = this.product.price / (1 - discount / 100);

    return `
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <li><a href="/" class="hover:text-primary dark:hover:text-primary">Home</a></li>
          <li><svg class="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></li>
          <li><a href="/products" class="hover:text-primary dark:hover:text-primary">Products</a></li>
          <li><svg class="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></li>
          <li class="text-gray-900 dark:text-white font-medium">${this.product.category}</li>
        </ol>
      </nav>

      <!-- Product Details -->
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Product Image -->
          <div class="space-y-4">
            <div class="aspect-square bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <img
                src="${this.product.image}"
                alt="${this.product.title}"
                class="w-full h-full object-contain"
              />
            </div>
          </div>

          <!-- Product Info -->
          <div class="space-y-6">
            <!-- Category Badge -->
            <div>
              <span class="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                ${this.product.category}
              </span>
            </div>

            <!-- Title -->
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              ${this.product.title}
            </h1>

            <!-- Rating -->
            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                ${this.renderStars(this.product.rating.rate)}
                <span class="ml-2 text-lg font-medium text-gray-900 dark:text-white">
                  ${this.product.rating.rate.toFixed(1)}
                </span>
              </div>
              <span class="text-gray-600 dark:text-gray-400">
                (${this.product.rating.count} reviews)
              </span>
            </div>

            <!-- Price -->
            <div class="flex items-center space-x-4">
              <span class="text-4xl font-bold text-primary">
                $${this.product.price.toFixed(2)}
              </span>
              ${discount > 0 ? `
                <span class="text-lg text-gray-500 dark:text-gray-400 line-through">
                  $${originalPrice.toFixed(2)}
                </span>
                <span class="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded text-sm font-medium">
                  Save ${discount}%
                </span>
              ` : ''}
            </div>

            <!-- Description -->
            <div class="prose dark:prose-invert max-w-none">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                ${this.product.description}
              </p>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6">
              <button class="btn-primary flex-1 text-lg py-4">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                </svg>
                Add to Cart
              </button>
              <button class="btn-secondary flex-1 text-lg py-4">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                Add to Wishlist
              </button>
            </div>

            <!-- Product Features -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
              <h3 class="font-semibold text-gray-900 dark:text-white">Product Features</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">Free Shipping</span>
                </div>
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">30-Day Returns</span>
                </div>
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">Quality Guaranteed</span>
                </div>
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Back to Products -->
        <div class="mt-12 text-center">
          <a href="/products" class="btn-secondary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Products
          </a>
        </div>
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
