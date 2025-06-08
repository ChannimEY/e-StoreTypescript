import { ApiService } from '../services/fetchApi';
import { Product } from '../types/product';
import { GoToTop } from '../components/goToTop';
import { ProductCard } from '../components/card';

export class HomePage {
  private currentSlide = 0;
  private slides = [
    {
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2070&auto=format&fit=crop&quality=100',
      title: 'Summer Collection 2024',
      description: 'Discover the latest trends in fashion',
      buttonText: 'Shop Now',
      buttonLink: '/products',

    },
    {
      image: 'https://img.freepik.com/free-vector/electronics-store-facebook-cover-template_23-2151168350.jpg?semt=ais_items_boosted&w=740',
      title: 'New Arrivals',
      description: 'Check out our newest products',
      buttonText: 'Explore',
      buttonLink: '/products',

    },
    {
      image: 'https://img.freepik.com/free-vector/realistic-cyber-monday-twitter-header_23-2149816807.jpg',
      title: 'Special Offers',
      description: 'Limited time deals and discounts',
      buttonText: 'View Deals',
      buttonLink: '/products',

    },
    {
      image: 'https://img.freepik.com/free-psd/black-friday-super-sale-facebook-cover-banner-template_120329-5172.jpg?semt=ais_items_boosted&w=740',
      title: 'Special Offers',
      description: 'Limited time deals and discounts',
      buttonText: 'View Deals',
      buttonLink: '/products',

    },
  ];

  private bestsellerProducts = [
    {
      id: 1,
      title: 'Smartwatch Pro',
      price: 199,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      title: 'Ultra Laptop',
      price: 899,
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      title: 'VR Headset',
      price: 299,
      image: 'https://images.unsplash.com/photo-1519121782439-2f3c2c8e8a19?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      title: 'Wireless Earbuds',
      price: 129,
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80'
    }
  ];

  public render(): string {
    return this.getHtml();
  }

  public mount(): void {
    this.startSlider();
    this.addEventListeners();
    this.loadFeaturedProducts();
    this.loadBestsellerProducts();
    GoToTop.init();
    this.animateOnScroll();
  }

  private animateOnScroll(): void {
    const animatedEls = document.querySelectorAll('.animate-on-scroll');
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    animatedEls.forEach(el => observer.observe(el));
  }

  private getHtml(): string {
    return `
      <!-- Hero Section with Modern Slider -->
      <section class="relative h-[80vh] overflow-hidden bg-gray-900 animate-on-scroll">
        <!-- Loading Indicator -->
        <div id="loading" class="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-0">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
        </div>

        <!-- Main Slider -->
        <div class="relative h-full">
          ${this.slides.map((slide, index) => `
            <div
              class="absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                index === this.currentSlide
                  ? 'translate-x-0 opacity-100 scale-100'
                  : index < this.currentSlide
                    ? '-translate-x-full opacity-0 scale-95'
                    : 'translate-x-full opacity-0 scale-95'
              }"
              data-slide="${index}"
            >
              <!-- Background Image with Enhanced Zoom Effect -->
              <div class="absolute inset-0 transform transition-transform duration-[3000ms] ease-out" data-parallax>
                <img
                  src="${slide.image}"
                  alt="${slide.title}"
                  class="w-full h-full object-cover object-center scale-110 transition-transform duration-[3000ms] ease-out hover:scale-125"
                  loading="eager"
                >
              </div>

              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

              <!-- Content Container -->
              <div class="absolute inset-0 flex items-center">
                <div class="container mx-auto px-4">
                  <div class="max-w-2xl transform transition-all duration-1000 ease-out ${
                    index === this.currentSlide
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }">
                    <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight tracking-tight">
                      ${slide.title}
                    </h1>
                    <p class="text-xl md:text-2xl text-white mb-8 drop-shadow-md max-w-xl font-medium">
                      ${slide.description}
                    </p>
                    <a
                      href="${slide.buttonLink}"
                      class="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group font-semibold"
                    >
                      <span class="mr-2">${slide.buttonText}</span>
                      <svg class="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Modern Controls -->
        <div class="absolute bottom-0 left-0 right-0 z-10">
          <div class="container mx-auto px-4">
            <div class="flex items-center justify-between py-6">
              <!-- Navigation Dots -->
              <div class="flex space-x-3">
                ${this.slides.map((_, index) => `
                  <button
                    class="group relative w-3 h-3 focus:outline-none"
                    data-slide="${index}"
                  >
                    <span class="absolute inset-0 rounded-full bg-white/50 transition-all duration-300 group-hover:bg-white/75"></span>
                    <span class="absolute inset-0 rounded-full bg-white transform scale-0 transition-transform duration-300 ${
                      index === this.currentSlide ? 'scale-100' : ''
                    }"></span>
                  </button>
                `).join('')}
              </div>

              <!-- Arrow Controls -->
              <div class="flex space-x-4">
                <button
                  class="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
                  id="prev-slide"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  class="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
                  id="next-slide"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Categories Section -->
      <section class="py-20 bg-white dark:bg-gray-800 animate-on-scroll">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our wide range of products across different categories
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="relative group overflow-hidden rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105 animate-on-scroll">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999" alt="Electronics"
                class="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div class="text-white transform transition-transform duration-300 group-hover:translate-y-2">
                  <h3 class="text-2xl font-bold mb-2">Electronics</h3>
                  <p class="text-white/80 mb-4">Latest gadgets and devices</p>
                  <a href="/products?category=electronics" class="inline-flex items-center text-white hover:text-primary-400 transition-colors">
                    Shop Now
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="relative group overflow-hidden rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105 animate-on-scroll">
              <img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964" alt="Clothing"
                class="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div class="text-white transform transition-transform duration-300 group-hover:translate-y-2">
                  <h3 class="text-2xl font-bold mb-2">Clothing</h3>
                  <p class="text-white/80 mb-4">Trendy fashion collection</p>
                  <a href="/products?category=clothing" class="inline-flex items-center text-white hover:text-primary-400 transition-colors">
                    Shop Now
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="relative group overflow-hidden rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105 animate-on-scroll">
              <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1974" alt="Accessories"
                class="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div class="text-white transform transition-transform duration-300 group-hover:translate-y-2">
                  <h3 class="text-2xl font-bold mb-2">Accessories</h3>
                  <p class="text-white/80 mb-4">Complete your style</p>
                  <a href="/products?category=accessories" class="inline-flex items-center text-white hover:text-primary-400 transition-colors">
                    Shop Now
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Products Section -->
      <section class="py-20 bg-gray-50 dark:bg-gray-900 animate-on-scroll">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between mb-12">
            <div>
              <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Products</h2>
              <p class="text-lg text-gray-600 dark:text-gray-400">Handpicked products for you</p>
            </div>
            <a href="/products" class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline">
              View All
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8" id="featured-products">
            <!-- Products will be loaded here -->
          </div>
        </div>
      </section>

      <!-- Special Offers Section -->
      <section class="py-20 bg-gradient-to-r from-primary-600 to-primary-400 animate-on-scroll">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="text-white">
              <h2 class="text-4xl md:text-5xl font-bold mb-6">Special Offers</h2>
              <p class="text-xl mb-8 text-white/90">Get up to 50% off on selected items. Limited time offer!</p>
              <div class="flex flex-wrap gap-4">
                <a href="/products" class="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Shop Now
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="/offers" class="inline-flex items-center px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300">
                  View All Offers
                </a>
              </div>
            </div>
            <div class="relative">
              <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2070" alt="Special Offers"
                class="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div class="absolute -top-4 -right-4 bg-white text-primary-600 px-6 py-3 rounded-full font-bold text-xl shadow-lg">
                -50%
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Choose Us Section -->
      <section class="py-20 bg-white dark:bg-gray-800 animate-on-scroll">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide the best shopping experience with our premium services
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-all duration-300">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Quality Products</h3>
              <p class="text-gray-600 dark:text-gray-400">We carefully select each product to ensure the highest quality.</p>
            </div>
            <div class="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-all duration-300">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Fast Delivery</h3>
              <p class="text-gray-600 dark:text-gray-400">Quick and reliable shipping to your doorstep.</p>
            </div>
            <div class="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-all duration-300">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">24/7 Support</h3>
              <p class="text-gray-600 dark:text-gray-400">Our customer service team is always here to help.</p>
            </div>
            <div class="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-all duration-300">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Secure Payment</h3>
              <p class="text-gray-600 dark:text-gray-400">Safe and secure payment methods.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="py-20 bg-gray-50 dark:bg-gray-900 animate-on-scroll">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">What Our Customers Say</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div class="flex items-center mb-4">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" class="w-12 h-12 rounded-full mr-4">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">John Smith</h4>
                  <div class="flex text-yellow-400">
                    ${this.renderStars(5)}
                  </div>
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-400">"Great service and fast delivery. The products are exactly as described. Will definitely shop here again!"</p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div class="flex items-center mb-4">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer" class="w-12 h-12 rounded-full mr-4">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Sarah Johnson</h4>
                  <div class="flex text-yellow-400">
                    ${this.renderStars(5)}
                  </div>
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-400">"The quality of the products exceeded my expectations. Customer service was excellent!"</p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div class="flex items-center mb-4">
                <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Customer" class="w-12 h-12 rounded-full mr-4">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Michael Brown</h4>
                  <div class="flex text-yellow-400">
                    ${this.renderStars(5)}
                  </div>
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-400">"Fast shipping and great prices. The website is easy to navigate and the checkout process is smooth."</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Recent News Section -->
      <section class="py-20 bg-white dark:bg-gray-800 animate-on-scroll">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Recent News</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">There are many variations passages</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden flex flex-col animate-on-scroll transition-transform duration-500 hover:scale-105">
              <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80" alt="Smartwatch" class="w-full h-64 object-cover object-center mb-6">
              <div class="px-8 pb-8 flex-1 flex flex-col">
                <div class="text-gray-500 text-sm mb-2">October 5, 2019 &bull; by Paul</div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">How Well Are You Funnelling</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4 flex-1">When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper s ...</p>
              </div>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden flex flex-col animate-on-scroll transition-transform duration-500 hover:scale-105">
              <img src="https://media.theeverygirl.com/wp-content/uploads/2024/07/the-everygirl-feature-amazon-summer-accessories-2025.jpg" alt="Laptop" class="w-full h-64 object-cover object-center mb-6">
              <div class="px-8 pb-8 flex-1 flex flex-col">
                <div class="text-gray-500 text-sm mb-2">October 5, 2019 &bull; by Paul</div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">How to Automate Visual</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4 flex-1">When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper ...</p>
              </div>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden flex flex-col animate-on-scroll transition-transform duration-500 hover:scale-105">
              <img src="https://www.fashiongonerogue.com/wp-content/uploads/2024/06/Different-Accessories.jpg" alt="VR Headset" class="w-full h-64 object-cover object-center mb-6">
              <div class="px-8 pb-8 flex-1 flex flex-col">
                <div class="text-gray-500 text-sm mb-2">October 5, 2019 &bull; by Paul</div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Regression Testing in WordPress</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4 flex-1">There are many variations passages of Lorem Ipsum available, but the majority have suffered alterat ...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      ${GoToTop.render()}
    `;
  }

  private renderStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars += '<svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }

    // Half star
    if (hasHalfStar) {
      stars += '<svg class="w-4 h-4" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars += '<svg class="w-4 h-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }

    return stars;
  }

  private startSlider(): void {
    // Add parallax effect
    const handleParallax = (e: MouseEvent) => {
      const slides = document.querySelectorAll('[data-parallax]');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      slides.forEach((slide) => {
        const speed = 0.1;
        const x = (mouseX - 0.5) * speed * 100;
        const y = (mouseY - 0.5) * speed * 100;
        (slide as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    // Add zoom effect on hover
    const handleZoom = (e: MouseEvent) => {
      const slides = document.querySelectorAll('[data-parallax]');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      slides.forEach((slide) => {
        const speed = 0.05;
        const scale = 1 + (mouseX + mouseY) * speed;
        (slide as HTMLElement).style.transform = `scale(${scale})`;
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleParallax);
    document.addEventListener('mousemove', handleZoom);

    // Auto-advance slides
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.updateSlider();
    }, 5000);
  }

  private updateSlider(): void {
    const slides = document.querySelectorAll('[data-slide]');
    slides.forEach((slide, index) => {
      if (index === this.currentSlide) {
        slide.classList.remove('-translate-x-full', 'translate-x-full', 'opacity-0', 'scale-95');
        slide.classList.add('translate-x-0', 'opacity-100', 'scale-100');
      } else if (index < this.currentSlide) {
        slide.classList.remove('translate-x-0', 'opacity-100', 'scale-100');
        slide.classList.add('-translate-x-full', 'opacity-0', 'scale-95');
      } else {
        slide.classList.remove('translate-x-0', 'opacity-100', 'scale-100');
        slide.classList.add('translate-x-full', 'opacity-0', 'scale-95');
      }
    });

    // Update dots
    const dots = document.querySelectorAll('[data-slide]');
    dots.forEach((dot, index) => {
      const dotSpan = dot.querySelector('span:last-child');
      if (index === this.currentSlide) {
        dotSpan?.classList.add('scale-100');
        dotSpan?.classList.remove('scale-0');
      } else {
        dotSpan?.classList.remove('scale-100');
        dotSpan?.classList.add('scale-0');
      }
    });
  }

  private async loadFeaturedProducts(): Promise<void> {
    try {
      const products = await ApiService.fetchProducts();
      const featuredProducts = products.slice(0, 4);
      const productsContainer = document.getElementById('featured-products');
      if (productsContainer) {
        productsContainer.innerHTML = featuredProducts.map((product: Product) => ProductCard.render(product)).join('');
      }
    } catch (error) {
      console.error('Error loading featured products:', error);
    }
  }

  private addEventListeners(): void {
    // Add form submission handler for newsletter
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
        if (emailInput) {
          // Handle newsletter subscription
          console.log('Newsletter subscription:', emailInput.value);
          emailInput.value = '';
          alert('Thank you for subscribing!');
        }
      });
    }
  }

  private async loadBestsellerProducts(): Promise<void> {
    const container = document.getElementById('bestseller-products');
    if (!container) return;
    try {
      // Adjust the endpoint as needed for your API
      const products: Product[] = await ApiService.fetchProducts('?bestseller=true');
      container.innerHTML = products.slice(0, 4).map((product: Product) => `
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col">
          <img src="${product.image}" alt="${product.title}" class="w-full h-56 object-cover object-center">
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">${product.title}</h3>
            <div class="text-primary-600 dark:text-primary-400 font-semibold text-xl mb-4">$${product.price}</div>
            <a href="/products/${product.id}" class="mt-auto inline-block px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition">View</a>
          </div>
        </div>
      `).join('');
    } catch (error) {
      container.innerHTML = '<div class="col-span-4 text-center text-gray-500">Failed to load bestsellers.</div>';
    }
  }
}
