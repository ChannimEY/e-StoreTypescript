export class Footer {
  static render(): string {
    return `
      <footer class="bg-gray-900 dark:bg-gray-950 text-white">
        <div class="container mx-auto px-4 py-12">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div class="flex items-center space-x-2 mb-4">
                <div class="w-8 h-8  rounded-lg flex items-center justify-center">
                  <img src="/src/assets/taplogo.png" alt="logo" class="w-full h-full object-cover">
                </div>
                <h3 class="text-xl font-bold">e-Store</h3>
              </div>
              <p class="text-gray-400 mb-4 max-w-md">
                Your one-stop shop for the hottest styles and unbeatable prices. Explore top-rated products, enjoy quick delivery, and experience outstanding customer support every step of the way.
              </p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.417 0-.755-.338-.755-.755V14.2l-2.9-1.2c-.6-.25-.61-.6.13-.89l11.37-4.39c.5-.19.94.11.78.89z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 class="font-semibold mb-4">Quick Links</h4>
              <ul class="space-y-2 text-gray-400">
                <li><a href="/" data-route="/" class="hover:text-white transition-colors">Home</a></li>
                <li><a href="/products" data-route="/products" class="hover:text-white transition-colors">All Products</a></li>
                <li><a href="/about" data-route="/about" class="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" data-route="/contact" class="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold mb-4">Customer Service</h4>
              <ul class="space-y-2 text-gray-400">
                <li><a href="/contact" class="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" class="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold mb-4">Newsletter</h4>
              <p class="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
              <form class="space-y-4">
                <div class="flex flex-col space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    class="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-400"
                  >
                  <button
                    type="submit"
                    class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
                <p class="text-sm text-gray-500">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </p>
              </form>
            </div>
          </div>

          <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 e-Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}