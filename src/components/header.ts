export class Header {
  static render(): string {
    return `
      <!-- Top Bar -->
      <div class="w-full">
        <div class="w-full bg-gradient-to-r from-blue-800 via-purple-700 to-red-600 py-2 flex items-center justify-center px-4">
          <span class="text-white text-sm font-medium">30% discount on all products special for June!</span>
          <div class="flex items-center gap-4">
            <div class="flex items-center space-x-2 text-white text-lg">
              <a href="#" class="hover:text-gray-200 transition-colors"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="hover:text-gray-200 transition-colors"><i class="fab fa-instagram"></i></a>
              <a href="#" class="hover:text-gray-200 transition-colors"><i class="fab fa-twitter"></i></a>
              <a href="#" class="hover:text-gray-200 transition-colors"><i class="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>
      </div>

      <!-- Navbar -->
      <header class="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <nav class="container mx-auto px-3 py-4">
          <div class="flex items-center justify-between">
            <!-- Logo and Brand -->
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center">
                <img src="/src/assets/taplogo.png" alt="logo" class="w-full h-full object-cover">
              </div>
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">e-Store</h1>
            </div>

            <!-- Navigation Links -->
            <div class="hidden md:flex items-center space-x-8">
              <a href="/" data-route="/" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium nav-link">Home</a>
              <a href="/products" data-route="/products" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium nav-link">Products</a>
              <a href="/about" data-route="/about" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium nav-link">About</a>
              <a href="/contact" data-route="/contact" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium nav-link">Contact</a>
            </div>

            <!-- Right Side Actions -->
            <div class="flex items-center space-x-4">
              <!-- Search Bar -->
              <div class="hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  class="w-64 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-primary-500">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              <!-- Theme Toggle -->
              <button id="theme-toggle" class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              </button>



              <!-- Cart -->
              <div class="relative">
                <button class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
                </button>
              </div>

              <!-- Profile -->
              <div class="relative group">
                <button class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <!-- Profile Dropdown -->
                <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <a href="/login" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Login</a>
                  <a href="/register" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Register</a>
                </div>
              </div>

              <!-- Mobile Menu Button -->
              <div class="md:hidden">
                <button id="mobile-menu-toggle" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile Menu -->
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
            window.dispatchEvent(new PopStateEvent('popstate'));

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