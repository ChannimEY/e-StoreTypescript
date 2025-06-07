import { HomePage } from '../pages/home';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/detail';
import { About } from '../pages/about';
import { Contact } from '../pages/contact';

export class Router {
  private app: HTMLElement;

  constructor() {
    const appElement = document.getElementById('app');
    if (!appElement) {
      throw new Error('App element not found');
    }
    this.app = appElement;
  }

  private routes: { [key: string]: () => void } = {
    '/': () => this.renderPage(() => new HomePage().render()),
    '/products': () => this.renderPage(() => new ProductsPage().render()),
    '/about': () => this.renderPage(() => new About().render()),
    '/contact': () => this.renderPage(() => new Contact().render()),
  };

  init(): void {
    this.handleRouteChange();
    window.addEventListener('popstate', () => this.handleRouteChange());
  }

  navigate(path: string): void {
    window.history.pushState({}, '', path);
    this.handleRouteChange();
  }

  handleRouteChange(): void {
    const path = window.location.pathname;

    // Handle product detail routes
    const productMatch = path.match(/^\/product\/(\d+)$/);
    if (productMatch) {
      const productId = parseInt(productMatch[1], 10);
      this.renderPage(() => new ProductDetailPage().render(productId));
      return;
    }

    // Handle other routes
    const route = this.routes[path];
    if (route) {
      route();
    } else {
      // Default to home page for unknown routes
      this.routes['/']();
    }
  }

  private renderPage(pageRenderer: () => string): void {
    // Add transition class
    this.app.classList.add('page-transition');

    // Render the page after a short delay
    setTimeout(() => {
      this.app.innerHTML = pageRenderer();
      window.scrollTo(0, 0);

      // Remove transition class after render
      setTimeout(() => {
        this.app.classList.remove('page-transition');
      }, 300);
    }, 100);
  }
}