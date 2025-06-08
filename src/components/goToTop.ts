export class GoToTop {
  static render(): string {
    return `
      <button
        id="go-to-top"
        class="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary-600 hover:bg-secondary-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 opacity-0 invisible"
        aria-label="Go to top"
      >
        <svg
          class="w-6 h-6 transform -rotate-45"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    `;
  }

  static init(): void {
    const button = document.getElementById('go-to-top');
    if (!button) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        button.classList.remove('opacity-0', 'invisible');
        button.classList.add('opacity-100', 'visible');
      } else {
        button.classList.add('opacity-0', 'invisible');
        button.classList.remove('opacity-100', 'visible');
      }
    });

    // Scroll to top when clicked
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}