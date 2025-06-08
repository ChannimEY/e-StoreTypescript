import { Product } from '../types/product';

export class ProductCard {
  static render(product: Product): string {
    return `
      <div
        data-route="/product/${product.id}"
        class="card p-6 h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-300 relative group"
      >
        <div class="aspect-square mb-4 overflow-hidden rounded-lg bg-white dark:bg-gray-700">
          <img
            src="${product.image}"
            alt="${product.title}"
            class="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        <div class="flex-1 flex flex-col">
          <div class="mb-2">
            <span class="inline-block px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full">
              ${product.category}
            </span>
          </div>

          <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 flex-1">
            ${product.title}
          </h3>

          <div class="flex items-center mb-3">
            <div class="flex items-center">
              ${this.renderStars(product.rating.rate)}
              <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                (${product.rating.count})
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold text-red-600 dark:text-primary-400">
              $${product.price.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          class="add-to-cart-btn absolute -bottom-[-30px] right-4 w-10 h-10 rounded-full bg-orange-500 shadow-md flex items-center justify-center text-white bg-orange-600 transition-colors duration-300 "
          data-product-id="${product.id}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </div>
    `;
  }

  static renderSkeleton(): string {
    return `
      <div class="card p-6">
        <div class="aspect-square mb-4 skeleton"></div>
        <div class="skeleton h-4 w-20 mb-2"></div>
        <div class="skeleton h-5 w-full mb-2"></div>
        <div class="skeleton h-5 w-3/4 mb-3"></div>
        <div class="flex items-center justify-between">
          <div class="skeleton h-6 w-16"></div>
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