import { GoToTop } from '../components/goToTop';

export class Contact {
  private handleSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', Object.fromEntries(formData));
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4';
    successMessage.innerHTML = `
      <strong class="font-bold">Success!</strong>
      <span class="block sm:inline"> Thank you for your message. We'll get back to you soon.</span>
    `;
    form.parentElement?.insertBefore(successMessage, form);
    form.reset();
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }

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
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
        </div>
      </div>
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Contact Us</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Get in Touch</h2>
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Address</h3>
                    <p class="text-gray-600 dark:text-gray-400">123 Shopping Street, E-Commerce City, 12345</p>
                  </div>
                </div>
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Email</h3>
                    <p class="text-gray-600 dark:text-gray-400">support@estore.com</p>
                    <p class="text-gray-600 dark:text-gray-400">sales@estore.com</p>
                  </div>
                </div>
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Phone</h3>
                    <p class="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                    <p class="text-gray-600 dark:text-gray-400">+1 (555) 987-6543</p>
                  </div>
                </div>
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Business Hours</h3>
                    <p class="text-gray-600 dark:text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p class="text-gray-600 dark:text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
                    <p class="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Send us a Message</h2>
              <form id="contact-form" class="space-y-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input type="text" id="name" name="name" required
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white">
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input type="email" id="email" name="email" required
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white">
                </div>
                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                  <input type="text" id="subject" name="subject" required
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white">
                </div>
                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea id="message" name="message" rows="4" required
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"></textarea>
                </div>
                <button type="submit"
                  class="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
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
