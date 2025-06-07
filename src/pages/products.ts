export class ProductsPage {
  render(): string {
    return `
      <main class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Our Products</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Product Card 1 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Smart Watch" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Watch Pro</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Advanced fitness tracking and notifications on your wrist.</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-primary-600">$199.99</span>
                <button class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <!-- Product Card 2 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e" alt="Wireless Headphones" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Wireless Headphones</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Premium sound quality with active noise cancellation.</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-primary-600">$149.99</span>
                <button class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <!-- Product Card 3 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12" alt="Smart Speaker" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Speaker</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Voice-controlled speaker with premium audio quality.</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-primary-600">$129.99</span>
                <button class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <!-- Product Card 4 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad" alt="Fitness Tracker" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fitness Tracker</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Track your workouts and monitor your health metrics.</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-primary-600">$89.99</span>
                <button class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <!-- Product Card 5 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0" alt="Wireless Earbuds" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Wireless Earbuds</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">True wireless earbuds with crystal clear sound.</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-primary-600">$79.99</span>
                <button class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <!-- Product Card 6 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb" alt="Smart Home Hub" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Home Hub</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Control your smart home devices from one central hub.</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-primary-600">$159.99</span>
                <button class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    `;
  }
}