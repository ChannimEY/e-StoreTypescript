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

  private routes: { [key: string]: () => any } = {
    '/': () => new HomePage(),
    '/products': () => new ProductsPage(),
    '/about': () => new About(),
    '/contact': () => new Contact(),
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
      const pageInstance = new ProductDetailPage(productId);
      this.renderPage(() => pageInstance.render(productId), pageInstance);
      return;
    }

    // Handle other routes
    const getPage = this.routes[path];
    if (getPage) {
      const pageInstance = getPage();
      this.renderPage(() => pageInstance.render(), pageInstance);
    } else {
      // Default to home page for unknown routes
      const pageInstance = this.routes['/']();
      this.renderPage(() => pageInstance.render(), pageInstance);
    }
  }

  private renderPage(pageRenderer: () => Promise<string> | string, pageInstance?: any): void {
    this.app.classList.add('page-transition');
    setTimeout(async () => {
      this.app.innerHTML = await pageRenderer();
      window.scrollTo(0, 0);
      if (pageInstance && typeof pageInstance.mount === 'function') {
        pageInstance.mount();
      }
      setTimeout(() => {
        this.app.classList.remove('page-transition');
      }, 300);
    }, 100);
  }
}