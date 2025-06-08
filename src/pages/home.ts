import { ApiService } from '../services/fetchApi';
import { Product } from '../types/product';

export class HomePage {
  private currentSlide = 0;
  private slides = [

    {
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070',
      title: 'Summer Collection 2024',
      description: 'Discover the latest trends in fashion',
      buttonText: 'Shop Now',
      buttonLink: '/products'
    },
    {
      image: 'https://www.shutterstock.com/image-vector/electronics-promotional-shopping-sale-computer-260nw-1190458762.jpg',
      title: 'New Arrivals',
      description: 'Check out our newest products',
      buttonText: 'Explore',
      buttonLink: '/products'
    },
    {
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2070',
      title: 'Special Offers',
      description: 'Limited time deals and discounts',
      buttonText: 'View Deals',
      buttonLink: '/products'
    }
  ];

  // Public method for router: returns HTML string
  public render(): string {
    return this.getHtml();
  }

  // Public method for router: called after HTML is inserted
  public mount(): void {
    this.startSlider();
    this.addEventListeners();
    this.loadFeaturedProducts();
  }

  // Returns the homepage HTML as a string
  private getHtml(): string {
    return `
      <!-- Hero Section with Slider -->
      <section class="relative h-[600px] overflow-hidden">
        ${this.renderSlider()}
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          ${this.slides.map((_, index) => `
            <button
              class="w-3 h-3 rounded-full ${index === this.currentSlide ? 'bg-white' : 'bg-white/50'}"
              data-slide="${index}"
            ></button>
          `).join('')}
        </div>
      </section>

 

      <!-- Featured Categories Section -->
      <section class="py-16 bg-gray-50 dark:bg-gray-900">
                <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Shop by Category</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="relative group overflow-hidden rounded-xl">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999" alt="Electronics" class="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110">
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 class="text-2xl font-bold text-white">Electronics</h3>
              </div>
            </div>
            <div class="relative group overflow-hidden rounded-xl">
              <img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964" alt="Clothing" class="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110">
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 class="text-2xl font-bold text-white">Clothing</h3>
              </div>
              </div>
            <div class="relative group overflow-hidden rounded-xl">
              <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1974" alt="Accessories" class="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110">
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 class="text-2xl font-bold text-white">Accessories</h3>
              </div>
            </div>
              </div>
            </div>
          </section>

      <!-- Newsletter Section -->
      <section class="py-16 bg-primary-50 dark:bg-gray-800">
            <div class="container mx-auto px-4">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Subscribe to Our Newsletter</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-8">Stay updated with our latest products and exclusive offers</p>
            <form class="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                class="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white flex-1 max-w-md"
              >
              <button
                type="submit"
                class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
              </div>
      </section>

      <!-- Customer Says Section -->
      <section class="py-16 bg-white dark:bg-gray-900">
        <div class="container mx-auto px-4">
          <div class="flex items-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mr-4">Customer Says</h2>
            <hr class="flex-1 border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${[
              {
                image: 'https://randomuser.me/api/portraits/men/32.jpg',
                name: 'Denis Zakerburg',
                title: 'Marketing Management Remmi',
                text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration .'
              },
              {
                image: 'https://randomuser.me/api/portraits/women/44.jpg',
                name: 'Lisa Monroe',
                title: 'Creative Director',
                text: 'Great service and fast delivery. I will definitely shop here again!'
              },
              {
                image: 'https://randomuser.me/api/portraits/men/65.jpg',
                name: 'John Smith',
                title: 'Entrepreneur',
                text: 'The quality of the products exceeded my expectations. Highly recommended.'
              }
            ].map(t => `
              <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 shadow-sm flex flex-col items-start">
                <img src="${t.image}" alt="${t.name}" class="w-16 h-16 rounded-full mb-4 object-cover" />
                <div class="mb-2">
                  <span class="text-xl font-bold text-blue-400">${t.name}</span>
                  <div class="text-gray-400 text-base">${t.title}</div>
                </div>
                <p class="text-gray-800 dark:text-gray-100 mt-4 text-lg">
                  ${t.text}
                </p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
      <!-- Feature Highlights Section -->
<section class="py-8">
  <div class="container mx-auto px-4">
    <div class="bg-gray-50 rounded-2xl flex flex-col md:flex-row items-center justify-between py-8 px-4 md:px-12 gap-8 shadow">
      <!-- Free Shipping -->
      <div class="flex items-center gap-4 flex-1 justify-center">
        <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 48 48">
          <rect x="6" y="14" width="36" height="20" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <path d="M42 34v-8l-6-6H6" stroke="currentColor" stroke-width="2" fill="none"/>
          <circle cx="14" cy="36" r="2" fill="currentColor"/>
          <circle cx="38" cy="36" r="2" fill="currentColor"/>
        </svg>
        <div>
          <div class="font-semibold text-gray-900">Free Shipping</div>
          <div class="text-gray-400">On All Order</div>
        </div>
      </div>
      <!-- Online Support -->
      <div class="flex items-center gap-4 flex-1 justify-center">
        <svg class="w-12 h-12  text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 48 48">
          <path d="M24 4a20 20 0 1020 20A20 20 0 0024 4zm0 36a16 16 0 1116-16 16 16 0 01-16 16z"/>
          <path d="M32 32l-8-8V16" stroke="currentColor" stroke-width="2" fill="none"/>
          <text x="24" y="28" text-anchor="middle" font-size="10" fill="currentColor" font-family="Arial">24/7</text>
        </svg>
        <div>
          <div class="font-semibold text-gray-900">Online Support</div>
          <div class="text-gray-400">Technical 24/7</div>
        </div>
      </div>
      <!-- Big Saving -->
      <div class="flex items-center gap-4 flex-1 justify-center">
        <svg class="w-12 h-12  text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 48 48">
          <rect x="10" y="10" width="28" height="28" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
          <path d="M14 24h20M24 14v20" stroke="currentColor" stroke-width="2"/>
        </svg>
        <div>
          <div class="font-semibold text-gray-900">Big Saving</div>
          <div class="text-gray-400">Weeken Sales</div>
        </div>
      </div>
    </div>
  </div>
</section>
    `;
  }

  private renderSlider(): string {
    return `
      <div class="relative h-full">
        ${this.slides.map((slide, index) => `
          <div
            class="absolute inset-0 transition-opacity duration-500 ${index === this.currentSlide ? 'opacity-100' : 'opacity-0'}"
          >
            <img
              src="${slide.image}"
              alt="${slide.title}"
              class="w-full h-full object-cover"
            >
            <div class="absolute inset-0 bg-black/30 flex items-center">
              <div class="container mx-auto px-4">
                <div class="max-w-2xl">
                  <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">${slide.title}</h1>
                  <p class="text-xl text-white mb-8">${slide.description}</p>
                  <a
                    href="${slide.buttonLink}"
                    class="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    ${slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private async loadFeaturedProducts(): Promise<void> {
    try {
      const products = await ApiService.fetchProducts();
      const featuredProducts = products.slice(0, 4); // Get first 4 products

      const productsContainer = document.querySelector('.grid');
      if (productsContainer) {
        productsContainer.innerHTML = featuredProducts.map(product => `
          <div class="card p-6 h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-300 relative group">
            <div class="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
              <img
                src="${product.image}"
                alt="${product.title}"
                class="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div class="flex-1 flex flex-col">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 flex-1">
                ${product.title}
              </h3>
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
        `).join('');
      }
    } catch (error) {
      console.error('Error loading featured products:', error);
    }
  }

  private startSlider(): void {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.updateSlider();
    }, 5000); // Change slide every 5 seconds
  }

  private updateSlider(): void {
    const slides = document.querySelectorAll('.absolute.inset-0');
    const dots = document.querySelectorAll('[data-slide]');

    slides.forEach((slide, index) => {
      if (index === this.currentSlide) {
        slide.classList.remove('opacity-0');
        slide.classList.add('opacity-100');
      } else {
        slide.classList.remove('opacity-100');
        slide.classList.add('opacity-0');
      }
    });

    dots.forEach((dot, index) => {
      if (index === this.currentSlide) {
        dot.classList.remove('bg-white/50');
        dot.classList.add('bg-white');
      } else {
        dot.classList.remove('bg-white');
        dot.classList.add('bg-white/50');
      }
    });
  }

  private addEventListeners(): void {
    // Add click handlers for slider dots
    const dots = document.querySelectorAll('[data-slide]');
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide') || '0');
        this.currentSlide = slideIndex;
        this.updateSlider();
      });
    });

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
}
