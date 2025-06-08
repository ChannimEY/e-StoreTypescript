import { Product } from '../types/product';

export class ProductCard {
  static render(product: Product): string {
    return `
      <div
        data-route="/product/${product.id}"
        class="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        <!-- Product Image Container -->
        <div class="aspect-square overflow-hidden bg-white dark:bg-gray-700 relative">
          <img
            src="${product.image}"
            alt="${product.title}"
            class="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <!-- Category Badge -->
          <div class="absolute top-4 left-4">
            <span class="inline-block px-3 py-1.5 text-xs font-medium bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-primary-600 dark:text-primary-400 rounded-full shadow-sm">
              ${product.category}
            </span>
          </div>
        </div>

        <!-- Product Info -->
        <div class="p-6">
          <!-- Title -->
          <h3 class="font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
            ${product.title}
          </h3>

          <!-- Rating -->
          <div class="flex items-center mb-4">
            <div class="flex items-center">
              ${this.renderStars(product.rating.rate)}
              <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                (${product.rating.count})
              </span>
            </div>
          </div>

          <!-- Price and Add to Cart -->
          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">
              $${product.price.toFixed(2)}
            </span>
            <button
              class="add-to-cart-btn w-10 h-10 rounded-full bg-orange-500 hover:bg-primary-500 text-white shadow-md flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              data-product-id="${product.id}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    `;
  }

  static renderSkeleton(): string {
    return `
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div class="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div class="p-6 space-y-4">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
          <div class="flex items-center justify-between">
            <div class="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div class="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    `;
  }

  private static renderStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars += '<svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }

    // Half star
    if (hasHalfStar) {
      stars += '<svg class="w-4 h-4 text-yellow-400" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars += '<svg class="w-4 h-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }

    return stars;
  }
}