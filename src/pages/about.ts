import { GoToTop } from '../components/goToTop';

export class About {
  render(): string {
    return `
      <main class="container mx-auto px-4 py-8">
            <!-- Page Header with Breadcrumb -->
      <div class="bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 mb-8">
        <div class="container mx-auto flex flex-col justify-center items-center gap-2">
          <nav class="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <a href="/" class="hover:text-primary-500">Home</a>
            <span class="mx-2">&gt;</span>
            <span>Products</span>
          </nav>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">About Us</h1>
        </div>
      </div>
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">About e-Store</h1>

          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Story</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Welcome to e-Store, your one-stop destination for all your shopping needs. Founded with a vision to provide
              quality products and exceptional service, we've grown from a small startup to a trusted online marketplace.
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              Our journey began with a simple idea: to make shopping easier, more convenient, and more enjoyable for everyone.
              Today, we're proud to serve customers worldwide with a vast selection of products and a commitment to excellence.
            </p>
          </section>

          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Products</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Electronics</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Latest gadgets, smartphones, and accessories from top brands.
                </p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Fashion</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Trendy clothing, shoes, and accessories for all seasons.
                </p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Home & Living</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Everything you need to make your house a home.
                </p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Beauty & Health</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Premium beauty products and health essentials.
                </p>
              </div>
            </div>
          </section>

          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Why Choose Us?</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Quality Products</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  We carefully select each product to ensure the highest quality.
                </p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Fast Delivery</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Quick and reliable shipping to your doorstep.
                </p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">24/7 Support</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Our customer service team is always here to help.
                </p>
              </div>
            </div>
          </section>

          <div class="text-center">
            <a href="/products" class="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              Shop Now
            </a>
          </div>
        </div>
      </main>
      ${GoToTop.render()}
    `;
  }

  mount(): void {
    GoToTop.init();
  }
}
