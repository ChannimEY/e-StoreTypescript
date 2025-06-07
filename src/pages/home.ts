import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { ApiService } from '../services/fetchApi';
import { Product } from '../types/product';

export class HomePage {
  private currentSlide = 0;
  private slides = [
    {
      title: "Summer Collection",
      description: "Discover our latest summer styles with up to 40% off",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      buttonText: "Shop Now",
      buttonLink: "/products"
    },
    {
      title: "New Arrivals",
      description: "Check out our newest products with exclusive deals",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      buttonText: "View New Arrivals",
      buttonLink: "/products?new=true"
    },
    {
      title: "Special Offers",
      description: "Limited time offers on selected items",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      buttonText: "Shop Deals",
      buttonLink: "/products?sale=true"
    }
  ];

  private async initSlider() {
    const sliderContainer = document.getElementById('hero-slider');
    if (!sliderContainer) return;

    // Auto slide every 5 seconds
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.updateSlider();
    }, 5000);

    // Add click handlers for slider controls
    const prevButton = document.getElementById('slider-prev');
    const nextButton = document.getElementById('slider-next');

    prevButton?.addEventListener('click', () => {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.updateSlider();
    });

    nextButton?.addEventListener('click', () => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.updateSlider();
    });

    // Add click handlers for dots
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.currentSlide = index;
        this.updateSlider();
      });
    });
  }

  private updateSlider() {
    const sliderContainer = document.getElementById('hero-slider');
    if (!sliderContainer) return;

    const slide = this.slides[this.currentSlide];
    sliderContainer.style.backgroundImage = `url(${slide.image})`;

    const title = document.getElementById('slider-title');
    const description = document.getElementById('slider-description');
    const button = document.getElementById('slider-button');

    if (title) title.textContent = slide.title;
    if (description) description.textContent = slide.description;
    if (button) {
      button.textContent = slide.buttonText;
      button.setAttribute('href', slide.buttonLink);
    }

    // Update dots
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('bg-white', index === this.currentSlide);
      dot.classList.toggle('bg-white/50', index !== this.currentSlide);
    });
  }

  private renderProductCard(product: Product): string {
    return `
      <div class="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
          <img src="${product.image}" alt="${product.title}"
               class="h-full w-full object-cover object-center group-hover:opacity-75">
        </div>
        <div class="p-4">
          <h3 class="text-sm text-gray-700 dark:text-gray-300">${product.category}</h3>
          <p class="mt-1 text-lg font-medium text-gray-900 dark:text-white line-clamp-2">${product.title}</p>
          <div class="mt-2 flex items-center justify-between">
            <p class="text-lg font-bold text-primary">$${product.price.toFixed(2)}</p>
            <div class="flex items-center">
              <div class="flex items-center">
                ${this.renderStars(product.rating.rate)}
              </div>
              <span class="ml-2 text-sm text-gray-500">(${product.rating.count})</span>
            </div>
          </div>
        </div>
        <a href="/products/${product.id}" class="absolute inset-0"></a>
      </div>
    `;
  }

  private renderStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return `
      ${Array(fullStars).fill('<svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>').join('')}
      ${hasHalfStar ? '<svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>' : ''}
      ${Array(emptyStars).fill('<svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>').join('')}
    `;
  }

  async render(): Promise<string> {
    try {
      // Fetch products for different sections
      const allProducts = await ApiService.fetchProducts();
      const newArrivals = allProducts.slice(0, 4);
      const trendingProducts = allProducts.sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 4);

      return `
        <main class="min-h-screen">
          <!-- Hero Slider Section -->
          <section class="relative h-[600px] overflow-hidden">
            <div id="hero-slider" class="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
                 style="background-image: url(${this.slides[0].image})">
              <div class="absolute inset-0 bg-black/40"></div>
              <div class="relative h-full flex items-center">
                <div class="container mx-auto px-4">
                  <div class="max-w-2xl text-white">
                    <h1 id="slider-title" class="text-4xl md:text-6xl font-bold mb-4 slide-up">
                      ${this.slides[0].title}
                    </h1>
                    <p id="slider-description" class="text-lg md:text-xl mb-8 slide-up" style="animation-delay: 0.1s">
                      ${this.slides[0].description}
                    </p>
                    <a id="slider-button" href="${this.slides[0].buttonLink}"
                       class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary rounded-lg overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 slide-up"
                       style="animation-delay: 0.2s">
                      <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary/80"></span>
                      <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white opacity-20 group-hover:rotate-90 ease"></span>
                      <span class="relative flex items-center">
                        ${this.slides[0].buttonText}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Slider Controls -->
            <button id="slider-prev" class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button id="slider-next" class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            <!-- Slider Dots -->
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
              ${this.slides.map((_, index) => `
                <button class="slider-dot w-3 h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-white' : 'bg-white/50'}">
                </button>
              `).join('')}
            </div>
          </section>

          <!-- New Arrivals Section -->
          <section class="py-20 bg-white dark:bg-gray-900">
            <div class="container mx-auto px-4">
              <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  New Arrivals
                </h2>
                <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Check out our latest products that just arrived
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                ${newArrivals.map(product => this.renderProductCard(product)).join('')}
              </div>

              <div class="text-center mt-12">
                <a href="/products" class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary rounded-lg overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5">
                  <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary/80"></span>
                  <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white opacity-20 group-hover:rotate-90 ease"></span>
                  <span class="relative flex items-center">
                    View All Products
                  </span>
                </a>
              </div>
            </div>
          </section>

          <!-- Trending Products Section -->
          <section class="py-20 bg-gray-50 dark:bg-gray-800">
            <div class="container mx-auto px-4">
              <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Trending Products
                </h2>
                <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Our most popular products based on customer ratings
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                ${trendingProducts.map(product => this.renderProductCard(product)).join('')}
              </div>
            </div>
          </section>

          <!-- Features Section -->
          <section class="py-20 bg-white dark:bg-gray-900">
            <div class="container mx-auto px-4">
              <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Choose e-Store?
                </h2>
                <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  We provide the best shopping experience with quality products, competitive prices, and excellent service.
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center card p-8 fade-in hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <div class="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Fast Shipping</h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    Get your orders delivered quickly with our reliable shipping partners worldwide.
                  </p>
                </div>

                <div class="text-center card p-8 fade-in hover:shadow-lg hover:shadow-primary/10 transition-all duration-300" style="animation-delay: 0.1s">
                  <div class="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quality Guaranteed</h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    All products are carefully selected and tested to ensure the highest quality standards.
                  </p>
                </div>

                <div class="text-center card p-8 fade-in hover:shadow-lg hover:shadow-primary/10 transition-all duration-300" style="animation-delay: 0.2s">
                  <div class="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Easy Returns</h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    Not satisfied? No problem. Easy returns within 30 days for a full refund.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- CTA Section -->
          <section class="py-20 bg-primary/5 dark:bg-gray-800">
            <div class="container mx-auto px-4 text-center">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to Start Shopping?
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Browse our extensive collection of products and find exactly what you're looking for.
              </p>
              <a href="/products" class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary rounded-lg overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5">
                <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary/80"></span>
                <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white opacity-20 group-hover:rotate-90 ease"></span>
                <span class="relative flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  Browse Products
                </span>
              </a>
            </div>
          </section>
        </main>
      `;
    } catch (error) {
      console.error('Error rendering homepage:', error);
      return `
        <main class="min-h-screen flex items-center justify-center">
          <div class="text-center">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong</h1>
            <p class="text-gray-600 dark:text-gray-300">Please try again later</p>
          </div>
        </main>
      `;
    }
  }

  async init() {
    await this.initSlider();
  }
}
