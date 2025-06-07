export class Header {
  static render(): string {
    return `
      <header class="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <nav class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <img src="/src/assets/taplogo.png" alt="logo" class="w-full h-full object-cover">
              </div>
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">e-Store</h1>
            </div>

            <div class="hidden md:flex items-center space-x-8">
              <a href="/" data-route="/" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium nav-link">Home</a>
              <a href="/products" data-route="/products" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium nav-link">Products</a>
              <a href="/about" data-route="/about" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium nav-link">About</a>
              <a href="/contact" data-route="/contact" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium nav-link">Contact</a>
            </div>

            <div class="flex items-center space-x-4">
              <button id="theme-toggle" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              </button>

              <div class="md:hidden">
                <button id="mobile-menu-toggle" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div class="flex flex-col space-y-3">
              <a href="/" data-route="/" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium nav-link">Home</a>
              <a href="/products" data-route="/products" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium nav-link">Products</a>
              <a href="/about" data-route="/about" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium nav-link">About</a>
              <a href="/contact" data-route="/contact" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium nav-link">Contact</a>
            </div>
          </div>
        </nav>
      </header>
    `;
  }

  static addEventListeners(): void {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }

    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetRoute = link.getAttribute('data-route');
        if (targetRoute) {
          // Add smooth transition class to the main content
          const mainContent = document.querySelector('main');
          if (mainContent) {
            mainContent.classList.add('page-transition');
          }

          // Navigate after a short delay to allow for transition
          setTimeout(() => {
            window.history.pushState({}, '', targetRoute);
            const router = new Router();
            router.handleRouteChange();

            // Remove transition class after navigation
            setTimeout(() => {
              if (mainContent) {
                mainContent.classList.remove('page-transition');
              }
            }, 300);
          }, 100);
        }
      });
    });
  }
}