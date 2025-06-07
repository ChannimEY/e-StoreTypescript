import { Product } from '../types/product';

export class ProductCard {
  static render(product: Product): string {
    return `
      <div class="card p-6 h-full flex flex-col">
        <div class="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
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
            <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">
              $${product.price.toFixed(2)}
            </span>
            <button
              data-route="/product/${product.id}"
              class="btn-primary text-sm py-2 px-4"
            >
              View Details
            </button>
          </div>
        </div>
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
          <div class="skeleton h-9 w-24"></div>
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